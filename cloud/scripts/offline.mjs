import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { connect } from 'node:net';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { initLocalDb, localDynamoEndpoint } from './init-local-db.mjs';

const cloudDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const webDir = resolve(cloudDir, '../web');
const require = createRequire(import.meta.url);
const requireFromWeb = createRequire(resolve(webDir, 'package.json'));
const serverlessBinary = require('serverless/binary').getBinary().binaryPath;
const viteBinary = resolve(dirname(requireFromWeb.resolve('vite/package.json')), 'bin/vite.js');
const args = new Set(process.argv.slice(2));
const backendOnly = args.has('--backend-only');
const debug = args.has('--debug');
const stageOption = process.argv.indexOf('--stage');
const stage = stageOption < 0 ? 'dev' : process.argv[stageOption + 1];
if (!stage) throw new Error('Missing value for --stage');

const children = [];
let stopping = false;

function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill('SIGTERM');
  process.exitCode = code;
}

process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());

function start(name, command, commandArgs, cwd, env = process.env) {
  const child = spawn(command, commandArgs, { cwd, env, stdio: 'inherit' });
  children.push(child);
  child.on('error', error => {
    if (!stopping) { console.error(`${name}: ${error.message}`); stop(1); }
  });
  child.on('exit', (code, signal) => {
    if (!stopping) {
      console.error(`${name} exited (${signal || code})`);
      stop(code || 1);
    }
  });
  return child;
}

async function waitForPort(port, timeoutMs = 30000) {
  const end = Date.now() + timeoutMs;
  while (!stopping && Date.now() < end) {
    const ready = await new Promise(resolveReady => {
      const socket = connect({ host: '127.0.0.1', port });
      socket.once('connect', () => { socket.destroy(); resolveReady(true); });
      socket.once('error', () => resolveReady(false));
    });
    if (ready) return;
    await new Promise(resolveWait => setTimeout(resolveWait, 100));
  }
  throw new Error(`Timed out waiting for localhost:${port}`);
}

try {
  console.log('Starting Dynalite');
  start('Dynalite', process.execPath, [require.resolve('dynalite/cli.js'),
    '--host', '127.0.0.1', '--port', '4567'], cloudDir);
  await waitForPort(4567);
  await initLocalDb(stage);

  console.log(`Starting Serverless Offline${debug ? ' with inspector on port 9229' : ''}`);
  const backendEnv = {
    ...process.env,
    DD_ENDPOINT: localDynamoEndpoint,
    DD_REGION: 'us-east-1',
    AWS_ACCESS_KEY_ID: 'local',
    AWS_SECRET_ACCESS_KEY: 'local',
    AWS_SESSION_TOKEN: '',
  };
  if (!existsSync(serverlessBinary)) throw new Error('Serverless v4 executable is missing; run npm install at the repository root');
  if (debug) backendEnv.NODE_OPTIONS = `${process.env.NODE_OPTIONS || ''} --inspect=127.0.0.1:9229 --enable-source-maps`.trim();
  start('Serverless Offline', serverlessBinary,
    ['offline', 'start', '--stage', stage, '--useInProcess'], cloudDir, backendEnv);
  await Promise.all([waitForPort(4000), waitForPort(3001)]);

  if (!backendOnly) {
    console.log('Starting Vite at http://127.0.0.1:3000');
    start('Vite', process.execPath, [viteBinary,
      '--host', '127.0.0.1', '--mode', 'offline'], webDir);
    await waitForPort(3000);
  }

  console.log(backendOnly ? 'Offline backend ready' : 'Local chat ready at http://127.0.0.1:3000');
} catch (error) {
  console.error(error);
  stop(1);
}
