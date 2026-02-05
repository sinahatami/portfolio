"use server";

import { z } from "zod";
import { Resend } from "resend";
import { ContactEmail } from "@/components/email-template";

// 1. Initialize Resend with your API Key
const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

export async function sendContactEmail(prevState: any, formData: FormData) {
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

    if (data.error) {
      return {
        success: false,
        message: "Failed to send email. Please try again.",
      };
    }

    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    return { success: false, message: "Something went wrong on the server." };
  }
}
