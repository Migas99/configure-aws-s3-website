# configure-aws-s3-website

To be added ...

# Usage

## Using `deploy_website.yml` workflow
This example template will create a static website under the domain `www.my-organization.com`
```
configure-website:
    name: Configure AWS S3 website
    uses: migas99/configure-aws-s3-website/.github/workflows/deploy_website.yml@production
    secrets:
        AWS_ACCESS_KEY_ID: <ACCESS_KEY_ID>
        AWS_SECRET_ACCESS_KEY: <SECRET_ACCESS_KEY>
        AWS_REGION: <AWS_REGION>
        AWS_TERRAFORM_BUCKET: <AWS_TERRAFORM_BUCKET>
    with:
        ENVIRONMENT: production
        SERVICE_NAME: my-organization-website
        SUBDOMAIN: www
        DOMAIN: my-organization.com
```

## Using `deploy_redirect.yml` workflow
This example template will create a rule that will redirect from `my-organization.com` to `www.my-organization.com`
```
configure-website-redirect:
    name: Configure AWS S3 website direct
    uses: migas99/configure-aws-s3-website/.github/workflows/deploy_redirect.yml@production
    secrets:
        AWS_ACCESS_KEY_ID: <ACCESS_KEY_ID>
        AWS_SECRET_ACCESS_KEY: <SECRET_ACCESS_KEY>
        AWS_REGION: <AWS_REGION>
        AWS_TERRAFORM_BUCKET: <AWS_TERRAFORM_BUCKET>
    with:
        ENVIRONMENT: production
        SERVICE_NAME: my-organization-website
        SUBDOMAIN:
        DOMAIN: my-organization.com
        REDIRECT: www.my-organization.com
```

# Implementation in details

To be added ...

# License

MIT License

Copyright (c) 2022 José Miguel Ribeiro Cunha

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
