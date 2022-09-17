import { Construct } from "constructs";
import { AwsProvider } from "@cdktf/provider-aws";
import { DataAwsAcmCertificate, DataAwsAcmCertificateConfig } from "@cdktf/provider-aws/lib/acm";
import { DOMAIN } from "../config";

export const getHostedZoneCertificate = (scope: Construct, provider: AwsProvider): DataAwsAcmCertificate => {
  return new DataAwsAcmCertificate(scope, `${DOMAIN}-hosted-zone-certificate`, <DataAwsAcmCertificateConfig>{
    domain: DOMAIN,
    types: ["AMAZON_ISSUED"],
    provider: provider
  });
};