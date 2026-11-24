/**
 * Environment access in one place. Values are read lazily (functions, not
 * constants) so a missing variable never crashes a module at import time;
 * consumers decide how to degrade instead.
 */
export const siteEnv = {
  baseUrl: () => process.env["NEXT_PUBLIC_BASE_URL"] || "http://localhost:3000",
  googleVerificationId: () => process.env["GOOGLE_VERIFICATION_ID"],
  appVersion: () => process.env["NEXT_PUBLIC_APP_VERSION"] || "0.0.0",
  /** Vercel sets VERCEL=1; its analytics scripts exist only there. */
  onVercel: () => process.env["VERCEL"] === "1",
};

export const serverEnv = {
  githubToken: () => process.env["GITHUB_TOKEN"] || undefined,
  resendApiKey: () => process.env["RESEND_API_KEY"] || undefined,
  adminEmail: () => process.env["ADMIN_EMAIL"] || "",
  fromEmail: () => process.env["FROM_EMAIL"] || "",
  replyToEmail: () => process.env["REPLY_TO_EMAIL"] || "",
};
