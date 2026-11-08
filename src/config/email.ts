// src/config/email.ts
export const EMAIL_CONFIG = {
  apiKey: process.env["RESEND_API_KEY"] ?? "",
  adminEmail: process.env["ADMIN_EMAIL"] ?? "",
  fromEmail: process.env["FROM_EMAIL"] ?? "",
  replyToEmail: process.env["REPLY_TO_EMAIL"] ?? "",
};
