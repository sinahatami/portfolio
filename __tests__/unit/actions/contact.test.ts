import { type Mock } from "vitest";
import { headers } from "next/headers";
import { sendContactMessage } from "@/actions/contact";
import { getContactService } from "@/server/container";

vi.mock("next/headers", () => ({ headers: vi.fn() }));
vi.mock("@/server/container", () => ({ getContactService: vi.fn() }));

describe("sendContactMessage", () => {
  it("passes form fields and the client IP to the contact service", async () => {
    const submit = vi
      .fn()
      .mockResolvedValue({ status: "success", message: "ok" });
    (getContactService as Mock).mockReturnValue({ submit });
    (headers as Mock).mockResolvedValue(
      new Map([["x-forwarded-for", "203.0.113.7, 10.0.0.1"]])
    );

    const formData = new FormData();
    formData.set("email", "a@b.co");
    formData.set("message", "Hello there, world");

    const result = await sendContactMessage(null, formData);

    expect(result.status).toBe("success");
    expect(submit).toHaveBeenCalledWith(
      { email: "a@b.co", message: "Hello there, world" },
      "203.0.113.7"
    );
  });
});
