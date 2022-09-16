import { App } from "cdktf";
import { WebsiteStack } from "@/stacks/website";
import { WebsiteRedirectStack } from "@/stacks/website-redirect";

const app = new App();
new WebsiteStack(app, "website-stack");
new WebsiteRedirectStack(app, "website-redirect-stack");
app.synth();
