"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContactEmail } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Loader2, Send, AlertCircle } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { toast } from "./ui/toaster";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, {
    success: false,
    message: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message || "Message Sent!");
        formRef.current?.reset();
      } else {
        // This will now correctly trigger the Red toast
        toast.error(state.message || "Please check your inputs.");
      }
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="grid w-full gap-4">
      {/* ... rest of your form code (Email, Message, Button) remains exactly the same ... */}
      <div className="grid gap-2">
        <label
          htmlFor="email"
          className="flex items-center justify-between text-sm font-medium"
        >
          Your Email
          {state.errors?.email && (
            <span className="text-destructive flex animate-pulse items-center gap-1 text-xs">
              <AlertCircle size={10} /> {state.errors.email[0]}
            </span>
          )}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={cn(
            "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-12 w-full rounded-lg border px-3 py-2 text-sm transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            state.errors?.email
              ? "border-destructive focus-visible:ring-destructive"
              : "hover:border-accent/50"
          )}
          placeholder="recruiter@company.com"
        />
      </div>

      <div className="grid gap-2">
        <label
          htmlFor="message"
          className="flex items-center justify-between text-sm font-medium"
        >
          Message
          {state.errors?.message && (
            <span className="text-destructive flex animate-pulse items-center gap-1 text-xs">
              <AlertCircle size={10} /> {state.errors.message[0]}
            </span>
          )}
        </label>
        <textarea
          id="message"
          name="message"
          required
          className={cn(
            "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[140px] w-full rounded-lg border px-3 py-2 text-sm transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            state.errors?.message
              ? "border-destructive focus-visible:ring-destructive"
              : "hover:border-accent/50"
          )}
          placeholder="Hi Sina, I have a project regarding..."
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="text-accent-foreground bg-accent hover:bg-accent/90 h-11 w-full font-bold transition-all"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send Message <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
