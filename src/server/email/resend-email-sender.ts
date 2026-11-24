import { Resend } from "resend";
import type { EmailMessage, EmailSender, SendResult } from "./email-sender";

/** Adapter from Resend's SDK to the `EmailSender` port. */
export class ResendEmailSender implements EmailSender {
  private readonly client: Resend;

  constructor(apiKey: string) {
    this.client = new Resend(apiKey);
  }

  async send(message: EmailMessage): Promise<SendResult> {
    try {
      const { error } = await this.client.emails.send({
        from: message.from,
        to: message.to,
        subject: message.subject,
        react: message.react,
        ...(message.replyTo ? { replyTo: message.replyTo } : {}),
      });
      return error ? { ok: false, error: error.message } : { ok: true };
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
