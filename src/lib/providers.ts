import { Construct } from "constructs";
import { AwsProvider } from "@cdktf/provider-aws";

const AWS_REGION = process.env.AWS_REGION;

export const buildAWSProvider = (scope: Construct, region = AWS_REGION) => {
  return new AwsProvider(scope, `${region}-provider`, {
    region: region,
    alias: region
  });
};
