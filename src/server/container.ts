import path from "node:path";
import { createElement } from "react";
import { serverEnv } from "@/config/env";
import { SITE } from "@/config/site";
import { ContactConfirmation } from "@/emails/contact-confirmation";
import { ContactNotification } from "@/emails/contact-notification";
import { FileSystemBlogRepository } from "./blog/file-system-blog-repository";
import { ContactService } from "./contact/contact-service";
import {
  UnconfiguredEmailSender,
  type EmailSender,
} from "./email/email-sender";
import { ResendEmailSender } from "./email/resend-email-sender";
import { GitHubActivityService } from "./github/github-activity";
import { GitHubRestClient } from "./github/github-client";
import { FixedWindowRateLimiter } from "./rate-limit/rate-limiter";

/**
 * Composition root. The only module that knows which concrete adapters
 * implement each port; everything else depends on interfaces (DIP).
 * Instances are created lazily, so a missing secret never breaks a build.
 */
function lazy<T>(factory: () => T): () => T {
  let instance: T | undefined;
  return () => (instance ??= factory());
}

const getEmailSender = lazy<EmailSender>(() => {
  const apiKey = serverEnv.resendApiKey();
  if (!apiKey) {
    console.warn("RESEND_API_KEY is not set; contact emails are disabled.");
    return new UnconfiguredEmailSender();
  }
  return new ResendEmailSender(apiKey);
});

export const getContactService = lazy(
  () =>
    new ContactService({
      emailSender: getEmailSender(),
      rateLimiter: new FixedWindowRateLimiter({
        windowMs: 60 * 60 * 1000,
        limit: 5,
      }),
      templates: {
        notification: (input) => createElement(ContactNotification, input),
        confirmation: (input) =>
          createElement(ContactConfirmation, { email: input.email }),
      },
      addresses: {
        inbox: serverEnv.adminEmail(),
        from: serverEnv.fromEmail(),
        confirmationFrom: serverEnv.replyToEmail() || serverEnv.fromEmail(),
      },
    })
);

export const getGitHubActivityService = lazy(
  () =>
    new GitHubActivityService(
      new GitHubRestClient({
        username: SITE.githubUsername,
        token: serverEnv.githubToken(),
        revalidateSeconds: 3600,
      })
    )
);

export const getBlogRepository = lazy(
  () =>
    new FileSystemBlogRepository(
      path.join(process.cwd(), "src", "content", "posts")
    )
);
