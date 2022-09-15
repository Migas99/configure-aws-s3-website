export const DEFAULTS = {
  comment: "Managed by Terraform CDK",
  tags: undefined
};

export const AWS_ADMINISTRATIVE_REGION = "us-east-1";
export const AWS_REGION = process.env.AWS_REGION;
export const AWS_TERRAFORM_BUCKET = process.env.AWS_TERRAFORM_BUCKET;
export const ENVIRONMENT = process.env.ENVIRONMENT;
export const SERVICE_NAME = process.env.SERVICE_NAME;
export const TERRAFORM_STATE_FILE_NAME = process.env.TERRAFORM_STATE_FILE_NAME;

export const SUBDOMAIN = process.env.SUBDOMAIN;
export const DOMAIN = process.env.DOMAIN;
export const REDIRECT = process.env.REDIRECT;

export const IS_PRODUCTION = ENVIRONMENT === "production";
export const BUCKET_NAME = SUBDOMAIN || SUBDOMAIN !== "" ? `${SUBDOMAIN}.${DOMAIN}` : DOMAIN;