"use client";

import { useActionState, useEffect } from "react";
import { sendContactEmail } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      toast.success("Message Sent", {
        description: "I'll get back to you soon.",
      });
    } else if (state.message) {
      toast.error("Error", { description: state.message });
    }
  }, [state]);

  return (
    // CHANGED: Removed max-w-md, border, and background.
    // Now it fills the container provided by page.tsx
    <form action={formAction} className="grid w-full gap-4">
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Your Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring hover:border-accent/50 flex h-12 w-full rounded-lg border px-3 py-2 text-sm transition-shadow file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="recruiter@company.com"
        />
        {state.errors?.email && (
          <p className="text-xs text-red-500">{state.errors.email}</p>
        )}
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring hover:border-accent/50 flex min-h-[140px] w-full rounded-lg border px-3 py-2 text-sm transition-shadow focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Hi Sina, I have a project..."
        />
        {state.errors?.message && (
          <p className="text-xs text-red-500">{state.errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="text-accent-foreground bg-accent hover:bg-accent/90 h-11 w-full font-bold"
      >
        {" "}
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
