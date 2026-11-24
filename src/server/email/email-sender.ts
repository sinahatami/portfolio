import type { ReactElement } from "react";

export interface EmailMessage {
  from: string;
  to: string;
  subject: string;
  replyTo?: string;
  react: ReactElement;
}

export type SendResult = { ok: true } | { ok: false; error: string };

/** Port for outgoing email; providers are adapters behind it. */
export interface EmailSender {
  send(message: EmailMessage): Promise<SendResult>;
}

/**
 * Null Object used when no provider is configured (e.g. local development):
 * the app keeps working and reports a clear failure instead of crashing.
 */
export class UnconfiguredEmailSender implements EmailSender {
  async send(): Promise<SendResult> {
    return { ok: false, error: "Email delivery is not configured." };
  }
}
