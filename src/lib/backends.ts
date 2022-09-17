import { Construct } from "constructs";
import { S3Backend, S3BackendProps } from "cdktf";
import { AWS_REGION, AWS_TERRAFORM_BUCKET, ENVIRONMENT, SERVICE_NAME } from "../config";

export const buildS3Backend = (scope: Construct, fileName: string): S3Backend => {
  return new S3Backend(scope, <S3BackendProps>{
    bucket: AWS_TERRAFORM_BUCKET,
    key: `${ENVIRONMENT}/${SERVICE_NAME}/${fileName}.tf`,
    region: AWS_REGION,
    acl: "bucket-owner-full-control"
  });
};