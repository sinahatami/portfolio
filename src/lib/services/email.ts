import { type ReactElement } from "react";

export interface EmailService {
  sendEmail(options: SendEmailOptions): Promise<EmailResponse>;
}

export interface SendEmailOptions {
  from: string;
  to: string;
  subject: string;
  replyTo?: string;
  react: ReactElement;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  error?: unknown;
}
