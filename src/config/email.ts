// src/config/email.ts
import { z } from "zod";

const emailConfigSchema = z.object({
  apiKey: z.string().min(1, "Resend API key is required."),
  adminEmail: z.string().email("Invalid admin email address."),
  fromEmail: z.string().email("Invalid 'from' email address."),
  replyToEmail: z.string().email("Invalid 'replyTo' email address."),
});

const emailConfig = {
  apiKey: process.env["RESEND_API_KEY"],
  adminEmail: process.env["ADMIN_EMAIL"],
  fromEmail: process.env["FROM_EMAIL"],
  replyToEmail: process.env["REPLY_TO_EMAIL"],
};

const validatedEmailConfig = emailConfigSchema.safeParse(emailConfig);

if (!validatedEmailConfig.success) {
  console.error(
    "Invalid email configuration:",
    validatedEmailConfig.error.flatten().fieldErrors
  );
  throw new Error("Invalid email configuration.");
}

export const EMAIL_CONFIG = validatedEmailConfig.data;
