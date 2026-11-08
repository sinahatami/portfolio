// src/config/site.ts
export const SITE_CONFIG = {
  baseUrl: process.env["NEXT_PUBLIC_BASE_URL"] || "http://localhost:3000",
  googleVerificationId: process.env["GOOGLE_VERIFICATION_ID"],
};
