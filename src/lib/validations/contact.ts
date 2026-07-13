import { z } from "zod";

export const contactSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(2000, { message: "Message must be less than 2000 characters" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export interface FormState {
  success: boolean;
  message: string;
  errors?: {
    email?: string[];
    message?: string[];
  };
}
