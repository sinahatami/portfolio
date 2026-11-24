"use server";

import { headers } from "next/headers";
import type { ContactFormState } from "@/domain/contact";
import { getContactService } from "@/server/container";

async function clientIdentifier(): Promise<string> {
  const forwardedFor = (await headers()).get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "anonymous";
}

/**
 * Server action behind the contact form. Deliberately thin: it adapts the
 * HTTP request to the `ContactService` use case and nothing else (SRP).
 */
export async function sendContactMessage(
  _previous: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  return getContactService().submit(
    {
      email: formData.get("email"),
      message: formData.get("message"),
    },
    await clientIdentifier()
  );
}
