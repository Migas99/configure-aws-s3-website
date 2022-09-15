export const DEFAULTS = {
  comment: "Managed by Terraform CDK",
  tags: undefined
};

export const SUBDOMAIN = process.env.SUBDOMAIN;
export const DOMAIN = process.env.DOMAIN;
export const REDIRECT = process.env.REDIRECT;
export const BUCKET_NAME = process.env.SUBDOMAN !== "" ? `${SUBDOMAIN}.${DOMAIN}` : DOMAIN;