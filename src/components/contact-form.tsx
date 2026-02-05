"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { sendContactEmail } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Loader2, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { toast } from "./ui/toaster";

interface FormErrors {
  email?: string[];
  message?: string[];
}

interface FormState {
  success: boolean;
  message: string;
  errors?: FormErrors;
}

const initialState: FormState = {
  success: false,
  message: "",
  errors: undefined,
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    sendContactEmail,
    initialState
  );
  const [localErrors, setLocalErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  // Reset local errors when form is submitted
  useEffect(() => {
    if (state.errors) {
      setLocalErrors(state.errors);
    } else {
      setLocalErrors({});
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.message && !isPending) {
      if (state.success) {
        toast.success(state.message || "Message sent successfully!");
        formRef.current?.reset();
        // Reset state after successful submission
        setTimeout(() => {
          // Reset the form state
          if (formRef.current) {
            const event = new Event("reset", { bubbles: true });
            formRef.current.dispatchEvent(event);
          }
        }, 100);
      } else {
        toast.error(state.message || "Please check your inputs.");
      }
    }
  }, [state, isPending]);

  // Client-side validation
  const validateField = (name: string, value: string) => {
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setLocalErrors((prev) => ({
          ...prev,
          email: ["Please enter a valid email address"],
        }));
      } else {
        setLocalErrors((prev) => ({ ...prev, email: undefined }));
      }
    }

    if (name === "message" && value.length < 10) {
      setLocalErrors((prev) => ({
        ...prev,
        message: ["Message must be at least 10 characters"],
      }));
    } else if (name === "message" && value.length >= 10) {
      setLocalErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    validateField(e.target.name, e.target.value);
  };

  return (
    <form ref={formRef} action={formAction} className="grid w-full gap-6">
      <div className="grid gap-2">
        <label
          htmlFor="email"
          className="flex items-center justify-between text-sm font-medium"
        >
          Your Email
          {localErrors?.email && (
            <span className="text-destructive flex animate-pulse items-center gap-1 text-xs">
              <AlertCircle size={10} /> {localErrors.email[0]}
            </span>
          )}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          onChange={handleChange}
          className={cn(
            "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-lg border px-4 py-3 text-sm transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            localErrors?.email
              ? "border-destructive focus-visible:ring-destructive"
              : "hover:border-accent/50 focus:border-accent"
          )}
          placeholder="recruiter@company.com"
          aria-describedby={localErrors?.email ? "email-error" : undefined}
        />
      </div>

      <div className="grid gap-2">
        <label
          htmlFor="message"
          className="flex items-center justify-between text-sm font-medium"
        >
          Message
          <span className="text-muted-foreground text-xs">
            {formRef.current?.querySelector<HTMLTextAreaElement>("#message")
              ?.value.length || 0}
            /500
          </span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={500}
          onChange={handleChange}
          className={cn(
            "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[140px] w-full resize-none rounded-lg border px-4 py-3 text-sm transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            localErrors?.message
              ? "border-destructive focus-visible:ring-destructive"
              : "hover:border-accent/50 focus:border-accent"
          )}
          placeholder="Hi Sina, I want to discuss..."
          aria-describedby={localErrors?.message ? "message-error" : undefined}
        />
        {localErrors?.message && (
          <span
            id="message-error"
            className="text-destructive flex items-center gap-1 text-xs"
          >
            <AlertCircle size={10} /> {localErrors.message[0]}
          </span>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="text-accent-foreground bg-accent hover:bg-accent/90 h-12 w-full font-bold transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : state.success ? (
          <>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Sent Successfully!
          </>
        ) : (
          <>
            Send Message <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-muted-foreground text-center text-xs">
        I typically respond within 24 hours
      </p>
    </form>
  );
}
