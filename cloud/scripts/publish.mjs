import { CreateInvalidationCommand, CloudFrontClient } from '@aws-sdk/client-cloudfront';
import { DeleteObjectsCommand, ListObjectsV2Command, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import mime from 'mime-types';
import { getStack } from './stack.mjs';

const stage = process.argv[2];
const { bucket, outputs } = await getStack(stage);
if (!outputs.WebsiteUrl || !outputs.CloudFrontId) {
  throw new Error('The deployed stack has no WebsiteUrl or CloudFrontId output.');
}

const cloudDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(cloudDir, '../web/dist');
const files = readdirSync(distDir, { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => join(entry.parentPath, entry.name));
if (!files.some((file) => relative(distDir, file) === 'index.html')) {
  throw new Error(`No index.html in ${distDir}; build the web app first.`);
}

const s3 = new S3Client({ region: 'us-east-1' });
const existingKeys = [];
let token;
do {
  const page = await s3.send(new ListObjectsV2Command({ Bucket: bucket, ContinuationToken: token }));
  existingKeys.push(...(page.Contents ?? []).map(({ Key }) => Key));
  token = page.NextContinuationToken;
} while (token);

const newKeys = new Set();
for (const file of files) {
  const key = relative(distDir, file).split('\\').join('/');
  newKeys.add(key);
  await s3.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: readFileSync(file),
    ContentType: mime.lookup(file) || 'application/octet-stream',
    CacheControl: key.startsWith('assets/') ? 'public, max-age=31536000, immutable' : 'no-cache',
  }));
}

const staleKeys = existingKeys.filter((key) => !newKeys.has(key));
for (let start = 0; start < staleKeys.length; start += 1000) {
  await s3.send(new DeleteObjectsCommand({
    Bucket: bucket,
    Delete: { Objects: staleKeys.slice(start, start + 1000).map((Key) => ({ Key })) },
  }));
}

const cloudfront = new CloudFrontClient({ region: 'us-east-1' });
await cloudfront.send(new CreateInvalidationCommand({
  DistributionId: outputs.CloudFrontId,
  InvalidationBatch: {
    CallerReference: `${stage}-${Date.now()}`,
    Paths: { Quantity: 1, Items: ['/*'] },
  },
}));
writeFileSync(join(cloudDir, 'output.json'), JSON.stringify(outputs, null, 2) + '\n');
console.log(`Published ${files.length} files to https://${outputs.WebsiteUrl}`);
