"use server";

import { z } from "zod";
import { Resend } from "resend";
import { ContactEmail } from "@/components/email-template";
import { contactFormLimiter } from "@/lib/rate-limit";
import { ConfirmationEmail } from "@/components/confirmation-email";

// 1. Initialize Resend with your API Key
const resend = new Resend(process.env["RESEND_API_KEY"]);

const contactSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(2000, { message: "Message must be less than 2000 characters" }),
});

interface FormState {
  success: boolean;
  message: string;
  errors?: {
    email?: string[];
    message?: string[];
  };
}

export async function sendContactEmail(
  _prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const headers = {
    "x-forwarded-for": "",
  };

  const ip = headers["x-forwarded-for"] || "unknown";

  // Check rate limit
  const rateLimit = contactFormLimiter.check(ip);
  if (!rateLimit.allowed) {
    return {
      success: false,
      message: `Too many requests. Please try again in ${Math.ceil((rateLimit.reset - Date.now()) / 60000)} minutes.`,
    };
  }

  // 1. Validate input
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

  const { email, message } = validatedFields.data;

  try {
    // 2. Send Email via Resend
    const data = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "hatamisinaa@gmail.com",
      subject: `New Message from ${email}`,
      replyTo: email,
      react: ContactEmail({ message, senderEmail: email }),
    });

    await resend.emails.send({
      from: "Sina Hatami <contact@sinahatami.com>",
      to: email,
      subject: "I've received your message!",
      react: ConfirmationEmail({ senderEmail: email }),
    });

    if (data.error) {
      console.log(data);
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
    console.error("Contact form error:", error);
    return {
      success: false,
      message: "Something went wrong on the server.",
    };
  }
}
