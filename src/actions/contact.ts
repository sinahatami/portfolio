"use server";

import { headers } from "next/headers";
import { contactFormLimiter } from "@/lib/rate-limit";
import { contactSchema, type FormState } from "@/lib/validations/contact";
import { emailService } from "@/lib/services/resend.service";
import { EMAIL_CONFIG } from "@/config/email";
import { ContactEmail } from "@/components/emails/templates/email-template";
import { ConfirmationEmail } from "@/components/emails/templates/confirmation-email";

const getIp = async (): Promise<string> =>
  (await headers()).get("x-forwarded-for") || "unknown";

const validateRequest = (formData: FormData) => {
  const validatedFields = contactSchema.safeParse({
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please check your inputs.",
    };
  }

  return { success: true, data: validatedFields.data };
};

const handleRateLimiting = (
  ip: string
): { success: boolean; message?: string } => {
  const rateLimit = contactFormLimiter.check(ip);
  if (!rateLimit.allowed) {
    const minutes = Math.ceil((rateLimit.reset - Date.now()) / 60000);
    return {
      success: false,
      message: `Too many requests. Please try again in ${minutes} minutes.`,
    };
  }
  return { success: true };
};

export async function sendContactEmail(
  _prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  try {
    const ip = await getIp();
    const rateLimitResult = handleRateLimiting(ip);
    if (!rateLimitResult.success) {
      return { success: false, message: rateLimitResult.message! };
    }

    const validationResult = validateRequest(formData);
    if (!validationResult.success) {
      const result: FormState = {
        success: false,
        message: validationResult.message ?? "Please check your inputs.",
      };
      if (validationResult.errors !== undefined) {
        result.errors = validationResult.errors;
      }
      return result;
    }

    const { email, message } = validationResult.data!;

    const [notificationResult, confirmationResult] = await Promise.all([
      emailService.sendEmail({
        from: EMAIL_CONFIG.fromEmail,
        to: EMAIL_CONFIG.adminEmail,
        subject: `New Message from ${email}`,
        replyTo: email,
        react: ContactEmail({ message, senderEmail: email }),
      }),
      emailService.sendEmail({
        from: EMAIL_CONFIG.replyToEmail,
        to: email,
        subject: "I've received your message!",
        react: ConfirmationEmail({ senderEmail: email }),
      }),
    ]);

    if (!notificationResult.success || !confirmationResult.success) {
      console.error("Failed to send one or more emails:", {
        notificationResult,
        confirmationResult,
      });
      return {
        success: false,
        message: "Failed to send email. Please try again.",
      };
    }

    return {
      success: true,
      message: "Message sent successfully!",
    };
  } catch (error) {
    console.error("Contact form unexpected error:", error);
    return {
      success: false,
      message: "Something went wrong on the server.",
    };
  }
}
