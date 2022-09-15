import { Construct } from "constructs";
import { TerraformStack } from "cdktf";
import { buildS3Backend } from "@/lib/backends";
import { buildAWSProvider } from "@/lib/providers";
import { createHostedZoneRecord, getHostedZone } from "@/lib/route53";
import { getHostedZoneCertificate } from "@/lib/acm";
import { buildWebsiteCloudfrontDistribution, buildCloudfrontOAI } from "@/lib/cloudfront";
import { buildS3Bucket, setS3BucketPolicy, setS3BucketBlockPublicAccess } from "@/lib/s3";

export class WebsiteStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    buildS3Backend(this, "s3-website");
    buildAWSProvider(this);

    const administrativeRegionProvider = buildAWSProvider(this, "us-east-1");
    const domainHostedZone = getHostedZone(this);
    const certificate = getHostedZoneCertificate(this, administrativeRegionProvider);

    const websiteBucket = buildS3Bucket(this);
    setS3BucketBlockPublicAccess(this, websiteBucket);
    const websiteOAI = buildCloudfrontOAI(this);
    setS3BucketPolicy(this, websiteOAI, websiteBucket);

    const websiteDistribution = buildWebsiteCloudfrontDistribution(this, certificate, websiteBucket, websiteOAI);
    createHostedZoneRecord(this, domainHostedZone, websiteDistribution);
  }
}