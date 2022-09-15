import { Construct } from "constructs";
import { S3Backend, S3BackendProps } from "cdktf";

const AWS_REGION = process.env.AWS_REGION;
const AWS_TERRAFORM_BUCKET = process.env.AWS_TERRAFORM_BUCKET;
const ENVIRONMENT = process.env.ENVIRONMENT;
const SERVICE_NAME = process.env.SERVICE_NAME;

export const buildS3Backend = (scope: Construct, fileName: string): S3Backend => {
  return new S3Backend(scope, <S3BackendProps>{
    bucket: AWS_TERRAFORM_BUCKET,
    key: `${ENVIRONMENT}/${SERVICE_NAME}/${fileName}.tf`,
    region: AWS_REGION,
    acl: "bucket-owner-full-control"
  });
};