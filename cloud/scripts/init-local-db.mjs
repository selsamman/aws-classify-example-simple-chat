import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CreateTableCommand, DescribeTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';

const execFileAsync = promisify(execFile);
const cloudDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const serverlessBin = resolve(cloudDir, 'node_modules/serverless/run.js');
export const localDynamoEndpoint = 'http://127.0.0.1:4567';

function localClient() {
  return new DynamoDBClient({
    endpoint: localDynamoEndpoint,
    region: 'us-east-1',
    credentials: { accessKeyId: 'local', secretAccessKey: 'local' },
  });
}

async function tableProperties(stage) {
  const { stdout } = await execFileAsync(process.execPath, [
    serverlessBin, 'print', '--stage', stage,
    '--path', 'resources.Resources.AWSClassifySessionTable.Properties',
    '--format', 'json',
  ], { cwd: cloudDir, maxBuffer: 1024 * 1024 });
  return JSON.parse(stdout);
}

export async function initLocalDb(stage = 'dev') {
  const properties = await tableProperties(stage);
  const { TableName, BillingMode, AttributeDefinitions, KeySchema, GlobalSecondaryIndexes } = properties;
  if (!TableName || !KeySchema?.length)
    throw new Error('The resolved aws-classify session table is missing its name or key schema');

  const client = localClient();
  try {
    await client.send(new DescribeTableCommand({ TableName }));
  } catch (error) {
    if (error.name !== 'ResourceNotFoundException') throw error;
    await client.send(new CreateTableCommand({
      TableName, BillingMode, AttributeDefinitions, KeySchema, GlobalSecondaryIndexes,
    }));
  }

  for (let attempt = 0; attempt < 100; attempt++) {
    try {
      const { Table } = await client.send(new DescribeTableCommand({ TableName }));
      if (Table?.TableStatus === 'ACTIVE') {
        const indexes = new Set((Table.GlobalSecondaryIndexes || []).map(index => index.IndexName));
        if ((GlobalSecondaryIndexes || []).some(index => !indexes.has(index.IndexName)))
          throw new Error(`Local table ${TableName} is missing a required index; restart Dynalite`);
        console.log(`Local session table ready: ${TableName}`);
        return TableName;
      }
    } catch (error) {
      if (error.name !== 'ResourceNotFoundException') throw error;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  throw new Error(`Timed out waiting for local session table ${TableName}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  initLocalDb(process.argv[2] || 'dev').catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}
