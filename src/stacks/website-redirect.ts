import { Construct } from "constructs";
import { TerraformStack } from "cdktf";
import { buildS3Backend } from "@/lib/backends";
import { buildAWSProvider } from "@/lib/providers";
import { createHostedZoneRecord, getHostedZone } from "@/lib/route53";
import { getHostedZoneCertificate } from "@/lib/acm";
import { buildRedirectCloudfrontDistribution } from "@/lib/cloudfront";
import { buildS3Bucket, setS3BucketBlockPublicAccess, setS3BucketWebsiteConfig } from "@/lib/s3";

export class WebsiteRedirectStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    buildS3Backend(this, "s3-website-redirect");
    buildAWSProvider(this);

    const administrativeRegionProvider = buildAWSProvider(this, "us-east-1");
    const domainHostedZone = getHostedZone(this);
    const certificate = getHostedZoneCertificate(this, administrativeRegionProvider);

    const redirectBucket = buildS3Bucket(this);
    setS3BucketBlockPublicAccess(this, redirectBucket);
    const redirectBucketWebsiteConfig = setS3BucketWebsiteConfig(this, redirectBucket);

    const redirectDistribution = buildRedirectCloudfrontDistribution(this, certificate, redirectBucket, redirectBucketWebsiteConfig);
    createHostedZoneRecord(this, domainHostedZone, redirectDistribution);
  }
}