// __tests__/unit/actions/contact.test.ts
import { contactFormLimiter } from "@/lib/rate-limit";
import { emailService } from "@/lib/services/resend.service";
import { headers } from "next/headers";
import { type sendContactEmail as SendContactEmailType } from "@/actions/contact";

// Mock dependencies
jest.mock("next/headers", () => ({
  headers: jest.fn(),
}));
const mockedHeaders = headers as jest.Mock;

jest.mock("@/lib/rate-limit", () => ({
  contactFormLimiter: {
    check: jest.fn(),
  },
}));
const mockedRateLimiter = contactFormLimiter.check as jest.Mock;

jest.mock("@/lib/services/resend.service", () => ({
  emailService: {
    sendEmail: jest.fn(),
  },
}));
const mockedEmailService = emailService.sendEmail as jest.Mock;

describe("sendContactEmail Server Action", () => {
  let formData: FormData;
  let sendContactEmail: typeof SendContactEmailType;

  beforeAll(async () => {
    // Set up environment variables for the test run before importing the action
    process.env["RESEND_API_KEY"] = "test-key";
    process.env["ADMIN_EMAIL"] = "admin@example.com";
    process.env["FROM_EMAIL"] = "noreply@example.com";
    process.env["REPLY_TO_EMAIL"] = "reply@example.com";

    // Dynamically import the action
    const action = await import("@/actions/contact");
    sendContactEmail = action.sendContactEmail;
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules(); // Reset modules to ensure clean state for env vars

    formData = new FormData();
    formData.append("email", "test@example.com");
    formData.append("message", "This is a valid test message.");

    // Mock headers to return an IP
    const headerMap = new Map();
    headerMap.set("x-forwarded-for", "127.0.0.1");
    mockedHeaders.mockReturnValue(headerMap);
  });

  it("should return success if form is valid and emails are sent", async () => {
    mockedRateLimiter.mockReturnValue({ allowed: true });
    mockedEmailService.mockResolvedValue({ success: true });

    const result = await sendContactEmail(null, formData);

    expect(result.success).toBe(true);
    expect(result.message).toBe("Message sent successfully!");
    expect(mockedEmailService).toHaveBeenCalledTimes(2);
  });

  it("should return a rate limit error if rate limit is exceeded", async () => {
    mockedRateLimiter.mockReturnValue({
      allowed: false,
      reset: Date.now() + 60000,
    });

    const result = await sendContactEmail(null, formData);

    expect(result.success).toBe(false);
    expect(result.message).toContain("Too many requests");
    expect(mockedEmailService).not.toHaveBeenCalled();
  });

  it("should return a validation error for invalid input", async () => {
    mockedRateLimiter.mockReturnValue({ allowed: true });
    formData.set("email", "invalid-email");

    const result = await sendContactEmail(null, formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Please check your inputs.");
    expect(result.errors?.email).toBeDefined();
    expect(mockedEmailService).not.toHaveBeenCalled();
  });

  it("should return an error if one of the emails fails to send", async () => {
    mockedRateLimiter.mockReturnValue({ allowed: true });
    // Simulate one email failing
    mockedEmailService
      .mockResolvedValueOnce({ success: true })
      .mockResolvedValueOnce({ success: false, error: "API Error" });

    const result = await sendContactEmail(null, formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Failed to send email. Please try again.");
  });

  it("should handle unexpected errors gracefully", async () => {
    mockedRateLimiter.mockReturnValue({ allowed: true });
    mockedEmailService.mockRejectedValue(new Error("Unexpected server error"));

    const result = await sendContactEmail(null, formData);

    expect(result.success).toBe(false);
    expect(result.message).toBe("Something went wrong on the server.");
  });
});
