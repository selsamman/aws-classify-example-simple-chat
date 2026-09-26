import { CloudFormationClient, DescribeStackResourceCommand, DescribeStacksCommand } from '@aws-sdk/client-cloudformation';

export async function getStack(stage) {
  if (!['dev', 'prod'].includes(stage)) {
    throw new Error('Choose the dev or prod stage explicitly.');
  }

  const client = new CloudFormationClient({ region: 'us-east-1' });
  const stackName = `aws-classify-example-simple-chat-${stage}`;
  const { Stacks } = await client.send(new DescribeStacksCommand({ StackName: stackName }));
  const outputs = Object.fromEntries((Stacks?.[0]?.Outputs ?? []).map(({ OutputKey, OutputValue }) => [OutputKey, OutputValue]));
  const { StackResourceDetail } = await client.send(new DescribeStackResourceCommand({
    StackName: stackName,
    LogicalResourceId: 'S3Bucket',
  }));
  const bucket = StackResourceDetail?.PhysicalResourceId;
  if (!bucket) throw new Error(`S3Bucket was not found in ${stackName}`);

  return { bucket, outputs };
}
