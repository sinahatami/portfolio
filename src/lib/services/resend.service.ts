// src/lib/services/resend.service.ts
import { Resend } from "resend";
import { EMAIL_CONFIG } from "@/config/email";
import {
  type EmailService,
  type SendEmailOptions,
  type EmailResponse,
} from "./email";

class ResendEmailService implements EmailService {
  private readonly resend: Resend;

  constructor(apiKey: string) {
    this.resend = new Resend(apiKey);
  }

  async sendEmail(options: SendEmailOptions): Promise<EmailResponse> {
    try {
      const { data: _data, error } = await this.resend.emails.send(options);

      if (error) {
        console.error("Resend error:", error);
        return {
          success: false,
          message: "Failed to send email.",
          error: error,
        };
      }

      return {
        success: true,
        message: "Email sent successfully.",
      };
    } catch (error) {
      console.error("Contact form error:", error);
      return {
        success: false,
        message: "Something went wrong on the server.",
        error: error,
      };
    }
  }
}

// Create a singleton instance of the service
export const emailService = new ResendEmailService(EMAIL_CONFIG.apiKey);
