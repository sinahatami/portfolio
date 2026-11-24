import { type Mocked } from "vitest";
import { createElement } from "react";
import {
  ContactService,
  type ContactServiceDeps,
} from "@/server/contact/contact-service";
import type { EmailSender } from "@/server/email/email-sender";
import type { RateLimiter } from "@/server/rate-limit/rate-limiter";

const validInput = {
  email: "visitor@example.com",
  message: "Hello, I have a role for you.",
};

function setup(overrides: Partial<ContactServiceDeps> = {}) {
  const emailSender: Mocked<EmailSender> = {
    send: vi.fn().mockResolvedValue({ ok: true }),
  };
  const rateLimiter: Mocked<RateLimiter> = {
    consume: vi
      .fn()
      .mockReturnValue({ allowed: true, remaining: 4, resetAt: 0 }),
  };
  const logger = { error: vi.fn(), warn: vi.fn() };
  const service = new ContactService({
    emailSender,
    rateLimiter,
    logger,
    now: () => 0,
    templates: {
      notification: () => createElement("p", null, "notification"),
      confirmation: () => createElement("p", null, "confirmation"),
    },
    addresses: {
      inbox: "me@example.com",
      from: "site@example.com",
      confirmationFrom: "hi@example.com",
    },
    ...overrides,
  });
  return { service, emailSender, rateLimiter, logger };
}

describe("ContactService", () => {
  it("delivers the message and a confirmation", async () => {
    const { service, emailSender } = setup();
    const result = await service.submit(validInput, "1.2.3.4");

    expect(result.status).toBe("success");
    expect(result.message).toContain(validInput.email);
    expect(emailSender.send).toHaveBeenCalledTimes(2);
    expect(emailSender.send.mock.calls[0]?.[0]).toMatchObject({
      to: "me@example.com",
      replyTo: validInput.email,
    });
    expect(emailSender.send.mock.calls[1]?.[0]).toMatchObject({
      to: validInput.email,
    });
  });

  it("rejects when rate limited, before validating or sending", async () => {
    const { service, emailSender, rateLimiter } = setup();
    rateLimiter.consume.mockReturnValue({
      allowed: false,
      remaining: 0,
      resetAt: 5 * 60_000,
    });

    const result = await service.submit(validInput, "1.2.3.4");
    expect(result).toMatchObject({ status: "error" });
    expect(result.message).toMatch(/5 minutes/);
    expect(emailSender.send).not.toHaveBeenCalled();
  });

  it("returns field errors for invalid input", async () => {
    const { service, emailSender } = setup();
    const result = await service.submit(
      { email: "nope", message: "short" },
      "ip"
    );

    expect(result.status).toBe("error");
    expect(result.fieldErrors?.email?.[0]).toBeDefined();
    expect(result.fieldErrors?.message?.[0]).toBeDefined();
    expect(emailSender.send).not.toHaveBeenCalled();
  });

  it("fails when the notification can't be delivered", async () => {
    const { service, emailSender, logger } = setup();
    emailSender.send.mockResolvedValueOnce({
      ok: false,
      error: "provider down",
    });

    const result = await service.submit(validInput, "ip");
    expect(result.status).toBe("error");
    expect(emailSender.send).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalled();
  });

  it("still succeeds when only the confirmation fails", async () => {
    const { service, emailSender, logger } = setup();
    emailSender.send
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ ok: false, error: "bounced" });

    const result = await service.submit(validInput, "ip");
    expect(result.status).toBe("success");
    expect(logger.warn).toHaveBeenCalled();
  });

  it("handles unexpected exceptions", async () => {
    const { service, emailSender } = setup();
    emailSender.send.mockRejectedValue(new Error("boom"));

    const result = await service.submit(validInput, "ip");
    expect(result.status).toBe("error");
  });
});
