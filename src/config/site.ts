// src/config/site.ts
import { z } from "zod";

const siteConfigSchema = z.object({
  baseUrl: z.string().url("Base URL must be a valid URL."),
  googleVerificationId: z.string().min(1).optional(),
});

const siteConfig = {
  baseUrl: process.env["NEXT_PUBLIC_BASE_URL"] || "http://localhost:3000",
  googleVerificationId: process.env["GOOGLE_VERIFICATION_ID"],
};

const validatedSiteConfig = siteConfigSchema.safeParse(siteConfig);

if (!validatedSiteConfig.success) {
  console.error(
    "Invalid site configuration:",
    validatedSiteConfig.error.flatten().fieldErrors
  );
  throw new Error(
    "Invalid site configuration. Please check your environment variables."
  );
}

export const SITE_CONFIG = validatedSiteConfig.data;
