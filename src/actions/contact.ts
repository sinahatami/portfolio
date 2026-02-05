"use server";

import { z } from "zod";

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

  // 2. Return errors if validation fails
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please check your inputs.",
    };
  }

  // 3. Simulate sending email (In a real app, you'd use Resend/SendGrid here)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 4. Return success
  return {
    success: true,
    message: "Message sent successfully!",
  };
}
