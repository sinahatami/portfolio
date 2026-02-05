"use client";

import { useActionState, useEffect } from "react";
import { sendContactEmail } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function ContactForm() {
  // New React 19 Hook for Server Actions
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
    <form
      action={formAction}
      className="bg-card grid max-w-md gap-4 rounded-xl border p-6"
    >
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Your Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
          className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[100px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Hi Sina, I have a project..."
        />
        {state.errors?.message && (
          <p className="text-xs text-red-500">{state.errors.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
