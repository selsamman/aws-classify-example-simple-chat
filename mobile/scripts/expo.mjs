import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const mobileDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const cloudOutput = resolve(mobileDir, '../cloud/output.json');
const hasEnvFile = existsSync(resolve(mobileDir, '.env.local')) || existsSync(resolve(mobileDir, '.env'));
const cliArgs = process.argv.slice(2);
const localApi = cliArgs.includes('--local-api');
let apiUrl = localApi
  ? 'http://127.0.0.1:4000/api/dispatch'
  : process.env.EXPO_PUBLIC_API_URL?.trim();

if (!apiUrl && !hasEnvFile && existsSync(cloudOutput)) {
  const { WebsiteUrl } = JSON.parse(readFileSync(cloudOutput, 'utf8'));
  if (WebsiteUrl) apiUrl = `https://${WebsiteUrl}/api/dispatch`;
}

if (!apiUrl && !hasEnvFile) {
  console.error('Set EXPO_PUBLIC_API_URL in mobile/.env.local, or deploy the cloud app to create cloud/output.json.');
  process.exit(1);
}

const require = createRequire(import.meta.url);
const expoCli = require.resolve('expo/bin/cli');
const child = spawn(process.execPath, [expoCli, ...cliArgs.filter(arg => arg !== '--local-api')], {
  cwd: mobileDir,
  env: apiUrl ? { ...process.env, EXPO_PUBLIC_API_URL: apiUrl } : process.env,
  stdio: 'inherit',
});
child.on('error', error => { console.error(error); process.exitCode = 1; });
child.on('exit', (code, signal) => { process.exitCode = signal ? 1 : code ?? 1; });
