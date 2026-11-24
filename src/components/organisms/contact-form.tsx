"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { sendContactMessage } from "@/actions/contact";
import { Button, Icon, Input, Textarea } from "@/components/atoms";
import { FormField } from "@/components/molecules";
import {
  INITIAL_CONTACT_STATE,
  type ContactField,
  type ContactFormState,
} from "@/domain/contact";
import {
  MESSAGE_MAX_LENGTH,
  contactSchema,
  type ContactInput,
} from "@/lib/validation/contact";
import { cn } from "@/lib/utils";

/** Client-validated form; the server action re-validates with the same schema. */
export function ContactForm() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<ContactFormState>(INITIAL_CONTACT_STATE);

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { email: "", message: "" },
    mode: "onTouched",
  });
  const { errors } = form.formState;
  const messageLength = form.watch("message").length;

  const onSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.set("email", values.email);
      formData.set("message", values.message);

      const response = await sendContactMessage(null, formData);
      setResult(response);

      if (response.status === "success") {
        form.reset();
        return;
      }
      for (const [field, messages] of Object.entries(
        response.fieldErrors ?? {}
      )) {
        if (messages?.[0])
          form.setError(field as ContactField, { message: messages[0] });
      }
    });
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="grid gap-5"
      data-print="hide"
    >
      <FormField
        id="contact-email"
        label="Your email"
        error={errors.email?.message}
      >
        {(control) => (
          <Input
            {...control}
            {...form.register("email")}
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
          />
        )}
      </FormField>

      <FormField
        id="contact-message"
        label="Message"
        error={errors.message?.message}
        hint={
          <span
            className={cn(
              "tabular",
              messageLength > MESSAGE_MAX_LENGTH && "text-destructive"
            )}
          >
            {messageLength} / {MESSAGE_MAX_LENGTH}
          </span>
        }
      >
        {(control) => (
          <Textarea
            {...control}
            {...form.register("message")}
            rows={6}
            placeholder="What are you working on, and how can I help?"
          />
        )}
      </FormField>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" variant="signal" disabled={pending}>
          <Icon
            name={pending ? "loader" : "mail"}
            className={cn(pending && "animate-spin")}
          />
          {pending ? "Sending…" : "Send message"}
        </Button>
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "text-sm",
            result.status === "error" ? "text-destructive" : "text-foreground"
          )}
        >
          {result.status === "success" ? (
            <span className="inline-flex items-center gap-1.5">
              <Icon name="check" className="text-lane-study size-4" />
              {result.message}
            </span>
          ) : (
            result.message
          )}
        </p>
      </div>
    </form>
  );
}
