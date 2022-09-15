import { Construct } from "constructs";
import { CloudfrontOriginAccessIdentity } from "@cdktf/provider-aws/lib/cloudfront";
import { DataAwsS3Bucket, S3Bucket, S3BucketConfig, S3BucketPolicy, S3BucketPolicyConfig, S3BucketPublicAccessBlock, S3BucketPublicAccessBlockConfig, S3BucketWebsiteConfiguration, S3BucketWebsiteConfigurationConfig, S3BucketWebsiteConfigurationRedirectAllRequestsTo } from "@cdktf/provider-aws/lib/s3";
import { DEFAULTS, REDIRECT, BUCKET_NAME } from "@/config";

export const buildS3Bucket = (scope: Construct): S3Bucket => {
  return new S3Bucket(scope, `${BUCKET_NAME}-bucket`, <S3BucketConfig>{
    bucket: BUCKET_NAME,
    tags: DEFAULTS.tags
  });
};

export const setS3BucketBlockPublicAccess = (
  scope: Construct,
  bucket: S3Bucket | DataAwsS3Bucket
): S3BucketPublicAccessBlock => {
  return new S3BucketPublicAccessBlock(scope, `${BUCKET_NAME}-block-public-access`, 
    <S3BucketPublicAccessBlockConfig>{
      bucket: bucket.id,
      blockPublicAcls: true,
      blockPublicPolicy: true,
      ignorePublicAcls: true,
      restrictPublicBuckets: true
    }
  );
};

export const setS3BucketPolicy = (
  scope: Construct,
  cloudfrontOAI: CloudfrontOriginAccessIdentity,
  bucket: S3Bucket | DataAwsS3Bucket
): S3BucketPolicy => {
  return new S3BucketPolicy(scope, `${BUCKET_NAME}-set-bucket-policy`, <S3BucketPolicyConfig>{
    bucket: bucket.id,
    policy: JSON.stringify({
      Version: "2012-10-17",
      Id: `${BUCKET_NAME}-bucket-policy`,
      Statement: [
        {
          Sid: "CloudfrontGetObject",
          Effect: "Allow",
          Principal: { "AWS": cloudfrontOAI.iamArn },
          Action: ["s3:GetObject"],
          Resource: [`${bucket.arn}/*`, `${bucket.arn}`],
        },
      ],
    }),
  });
};

export const setS3BucketWebsiteConfig = (
  scope: Construct, 
  bucket: S3Bucket | DataAwsS3Bucket
): S3BucketWebsiteConfiguration => {
  return new S3BucketWebsiteConfiguration(scope, `${BUCKET_NAME}-bucket-website-config`, <S3BucketWebsiteConfigurationConfig>{
    bucket: bucket.id,
    redirectAllRequestsTo: <S3BucketWebsiteConfigurationRedirectAllRequestsTo>{
      hostName: REDIRECT,
      protocol: "https"
    }
  });
};