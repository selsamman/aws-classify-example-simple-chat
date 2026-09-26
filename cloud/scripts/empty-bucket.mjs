import { DeleteObjectsCommand, ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';
import { getStack } from './stack.mjs';

export async function emptyBucket(bucket, client = new S3Client({ region: 'us-east-1' })) {
  while (true) {
    const page = await client.send(new ListObjectsV2Command({ Bucket: bucket }));
    if (!page.Contents?.length) return;
    await client.send(new DeleteObjectsCommand({
      Bucket: bucket,
      Delete: { Objects: page.Contents.map(({ Key }) => ({ Key })) },
    }));
  }
}

if (process.argv[1]?.endsWith('/empty-bucket.mjs')) {
  const stage = process.argv[2];
  const { bucket } = await getStack(stage);
  await emptyBucket(bucket);
  console.log(`Emptied ${bucket}`);
}
