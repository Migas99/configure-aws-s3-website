import { Construct } from "constructs";
import { DataAwsRoute53Zone, DataAwsRoute53ZoneConfig, Route53Record, Route53RecordConfig } from "@cdktf/provider-aws/lib/route53";
import { CloudfrontDistribution } from "@cdktf/provider-aws/lib/cloudfront";
import { DOMAIN } from "@/config";

export const getHostedZone = (scope: Construct): DataAwsRoute53Zone => {
  return new DataAwsRoute53Zone(scope, `${DOMAIN}-data-hosted-zone`, <DataAwsRoute53ZoneConfig>{
    name: DOMAIN
  });
};

export const createHostedZoneRecord = (
  scope: Construct, 
  hostedZone: DataAwsRoute53Zone,
  cloudfrontDistribution: CloudfrontDistribution
): Route53Record => {
  return new Route53Record(scope, `${DOMAIN}-route53-record`, <Route53RecordConfig>{
    zoneId: hostedZone.id,
    name: DOMAIN,
    type: "A",
    alias: [{
      name: cloudfrontDistribution.domainName,
      zoneId: cloudfrontDistribution.hostedZoneId,
      evaluateTargetHealth: false
    }]
  });
};