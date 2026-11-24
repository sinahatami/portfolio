import { z } from "zod";

const MESSAGE_MIN_LENGTH = 10;
export const MESSAGE_MAX_LENGTH = 2000;

/** Shared by the client form and the server action, so rules never drift. */
export const contactSchema = z.object({
  email: z.email({ error: "Enter an email address like name@company.com." }),
  message: z
    .string()
    .trim()
    .min(MESSAGE_MIN_LENGTH, {
      error: `Write at least ${MESSAGE_MIN_LENGTH} characters.`,
    })
    .max(MESSAGE_MAX_LENGTH, {
      error: `Keep it under ${MESSAGE_MAX_LENGTH} characters.`,
    }),
});

export type ContactInput = z.infer<typeof contactSchema>;
