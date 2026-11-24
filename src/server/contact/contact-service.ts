import type { ReactElement } from "react";
import { z } from "zod";
import type { ContactFormState } from "@/domain/contact";
import { contactSchema, type ContactInput } from "@/lib/validation/contact";
import type { EmailSender } from "../email/email-sender";
import type { RateLimiter } from "../rate-limit/rate-limiter";

export interface ContactTemplates {
  notification(input: ContactInput): ReactElement;
  confirmation(input: ContactInput): ReactElement;
}

export interface ContactServiceDeps {
  emailSender: EmailSender;
  rateLimiter: RateLimiter;
  templates: ContactTemplates;
  addresses: {
    /** Where new messages are delivered. */
    inbox: string;
    /** Sender for the notification to the inbox. */
    from: string;
    /** Sender for the confirmation to the visitor. */
    confirmationFrom: string;
  };
  logger?: Pick<Console, "error" | "warn">;
  now?: () => number;
}

/**
 * Use case: accept a message from the contact form.
 * Order matters: rate-limit first (cheap), then validate, then deliver.
 * Every collaborator is injected, so the service is fully unit-testable.
 */
export class ContactService {
  constructor(private readonly deps: ContactServiceDeps) {}

  async submit(raw: unknown, clientId: string): Promise<ContactFormState> {
    const { rateLimiter, logger = console } = this.deps;
    const now = this.deps.now ?? Date.now;

    const decision = rateLimiter.consume(clientId);
    if (!decision.allowed) {
      const minutes = Math.max(
        1,
        Math.ceil((decision.resetAt - now()) / 60_000)
      );
      return {
        status: "error",
        message: `You've sent several messages already. Try again in ${minutes} ${minutes === 1 ? "minute" : "minutes"}.`,
      };
    }

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      return {
        status: "error",
        message: "Check the highlighted fields and send again.",
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
      };
    }

    try {
      return await this.deliver(parsed.data);
    } catch (error) {
      logger.error("Contact delivery failed unexpectedly", error);
      return this.deliveryFailed();
    }
  }

  private async deliver(input: ContactInput): Promise<ContactFormState> {
    const { emailSender, templates, addresses, logger = console } = this.deps;

    const notification = await emailSender.send({
      from: addresses.from,
      to: addresses.inbox,
      replyTo: input.email,
      subject: `New message from ${input.email}`,
      react: templates.notification(input),
    });

    if (!notification.ok) {
      logger.error(
        "Contact notification was not delivered",
        notification.error
      );
      return this.deliveryFailed();
    }

    // The message reached the inbox; a failed receipt must not make the
    // visitor think it was lost (and send it twice).
    const confirmation = await emailSender.send({
      from: addresses.confirmationFrom,
      to: input.email,
      subject: "Thanks for your message",
      react: templates.confirmation(input),
    });
    if (!confirmation.ok) {
      logger.warn("Contact confirmation was not delivered", confirmation.error);
    }

    return {
      status: "success",
      message: `Message sent. I'll reply to ${input.email}, usually within a day.`,
    };
  }

  private deliveryFailed(): ContactFormState {
    return {
      status: "error",
      message:
        "Your message couldn't be delivered. Try again, or email me directly.",
    };
  }
}
