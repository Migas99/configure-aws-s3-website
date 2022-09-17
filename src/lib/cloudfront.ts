
import { Construct } from "constructs";
import { DataAwsAcmCertificate } from "@cdktf/provider-aws/lib/acm";
import { CloudfrontDistribution, CloudfrontDistributionConfig, CloudfrontDistributionCustomErrorResponse, CloudfrontDistributionDefaultCacheBehavior, CloudfrontDistributionDefaultCacheBehaviorForwardedValues, CloudfrontDistributionDefaultCacheBehaviorForwardedValuesCookies, CloudfrontDistributionOrigin, CloudfrontDistributionOriginCustomOriginConfig, CloudfrontDistributionOriginS3OriginConfig, CloudfrontDistributionRestrictions, CloudfrontDistributionRestrictionsGeoRestriction, CloudfrontDistributionViewerCertificate, CloudfrontOriginAccessIdentity, CloudfrontOriginAccessIdentityConfig } from "@cdktf/provider-aws/lib/cloudfront";
import { S3Bucket, S3BucketWebsiteConfiguration } from "@cdktf/provider-aws/lib/s3";
import { DEFAULTS, IS_PRODUCTION, BUCKET_NAME } from "../config";

export const buildCloudfrontOAI = (scope: Construct) => {
  return new CloudfrontOriginAccessIdentity(scope, `${BUCKET_NAME}-oai`, <CloudfrontOriginAccessIdentityConfig>{
    comment: BUCKET_NAME
  });
};

export const buildWebsiteCloudfrontDistribution = (
  scope: Construct,
  certificate: DataAwsAcmCertificate,
  bucket: S3Bucket,
  oai: CloudfrontOriginAccessIdentity
): CloudfrontDistribution => {
  let defaultTtl = 0;
  let maxTtl = 0;

  if (IS_PRODUCTION) {
    defaultTtl = 2592000;
    maxTtl = 31536000;
  }

  return new CloudfrontDistribution(scope, `website-${BUCKET_NAME}-cloudfront-distribution`,
    <CloudfrontDistributionConfig>{
      comment: DEFAULTS.comment,
      tags: DEFAULTS.tags,
      priceClass: "PriceClass_100",
      enabled: true,
      isIpv6Enabled: true,
      defaultRootObject: "index.html",
      aliases: [BUCKET_NAME],
      customErrorResponse: [
        <CloudfrontDistributionCustomErrorResponse>{
          errorCode: 403,
          responseCode: 200,
          responsePagePath: "/"
        },
        <CloudfrontDistributionCustomErrorResponse>{
          errorCode: 404,
          responseCode: 200,
          responsePagePath: "/"
        }
      ],
      origin: [
        <CloudfrontDistributionOrigin>{
          originId: bucket.id,
          domainName: bucket.bucketRegionalDomainName,
          s3OriginConfig: <CloudfrontDistributionOriginS3OriginConfig>{
            originAccessIdentity: oai.cloudfrontAccessIdentityPath
          }
        }
      ],
      defaultCacheBehavior: <CloudfrontDistributionDefaultCacheBehavior>{
        allowedMethods: ["GET", "HEAD"],
        cachedMethods: ["GET", "HEAD"],
        targetOriginId: bucket.id,
        forwardedValues: <CloudfrontDistributionDefaultCacheBehaviorForwardedValues>{
          queryString: true,
          cookies: <CloudfrontDistributionDefaultCacheBehaviorForwardedValuesCookies>{
            forward: "all"
          }
        },
        viewerProtocolPolicy: "redirect-to-https",
        defaultTtl: defaultTtl,
        maxTtl: maxTtl,
        minTtl: 0
      },
      restrictions: <CloudfrontDistributionRestrictions>{
        geoRestriction: <CloudfrontDistributionRestrictionsGeoRestriction>{
          restrictionType: "none"
        }
      },
      viewerCertificate: <CloudfrontDistributionViewerCertificate>{
        acmCertificateArn: certificate.arn,
        sslSupportMethod: "sni-only"
      }
    });
};

export const buildRedirectCloudfrontDistribution = (
  scope: Construct,
  certificate: DataAwsAcmCertificate,
  bucket: S3Bucket,
  bucketWebsiteConfig: S3BucketWebsiteConfiguration
): CloudfrontDistribution => {
  const maximumTtl = 31536000;
  return new CloudfrontDistribution(scope, `redirect-${BUCKET_NAME}-cloudfront-distribution`,
      <CloudfrontDistributionConfig>{
        comment: DEFAULTS.comment,
        tags: DEFAULTS.tags,
        priceClass: "PriceClass_100",
        enabled: true,
        isIpv6Enabled: true,
        aliases: [BUCKET_NAME],
        origin: [
          <CloudfrontDistributionOrigin>{
            originId: bucket.id,
            domainName: bucketWebsiteConfig.websiteEndpoint,
            customOriginConfig: <CloudfrontDistributionOriginCustomOriginConfig>{
              httpPort: 80,
              httpsPort: 443,
              originProtocolPolicy: "match-viewer",
              originSslProtocols: ["TLSv1", "TLSv1.1", "TLSv1.2"]
            }
          }
        ],
        defaultCacheBehavior: <CloudfrontDistributionDefaultCacheBehavior>{
          allowedMethods: ["GET", "HEAD"],
          cachedMethods: ["GET", "HEAD"],
          targetOriginId: bucket.id,
          forwardedValues: <CloudfrontDistributionDefaultCacheBehaviorForwardedValues>{
            queryString: true,
            cookies: <CloudfrontDistributionDefaultCacheBehaviorForwardedValuesCookies>{
              forward: "all"
            }
          },
          viewerProtocolPolicy: "allow-all",
          defaultTtl: maximumTtl,
          maxTtl: maximumTtl,
          minTtl: maximumTtl,
        },
        restrictions: <CloudfrontDistributionRestrictions>{
          geoRestriction: <CloudfrontDistributionRestrictionsGeoRestriction>{
            restrictionType: "none"
          }
        },
        viewerCertificate: <CloudfrontDistributionViewerCertificate>{
          acmCertificateArn: certificate.arn,
          sslSupportMethod: "sni-only"
        }
      });
};