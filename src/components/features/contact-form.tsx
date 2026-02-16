"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { sendContactEmail } from "@/actions/contact";
import { Button } from "@/components/ui";
import { Loader2, Send, AlertCircle, CheckCircle2 } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { toast } from "../ui/toaster";

interface FormState {
  success: boolean;
  message: string;
  errors?: {
    email?: string[];
    message?: string[];
  };
}

const initialState: FormState = {
  success: false,
  message: "",
  errors: {},
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    sendContactEmail,
    initialState
  );
  const [localErrors, setLocalErrors] = useState<Record<string, string[]>>({});
  const formRef = useRef<HTMLFormElement>(null);

  const debouncedValidate = useCallback(
    debounce((name: string, value: string) => {
      validateField(name, value);
    }, 300),
    []
  );

  // Debounced validation
  const validateField = useCallback((name: string, value: string) => {
    const errors: string[] = [];

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors.push("Please enter a valid email address");
      }
    }

    if (name === "message") {
      if (value.length < 10) {
        errors.push("Message must be at least 10 characters");
      }
      if (value.length > 500) {
        errors.push("Message must be less than 500 characters");
      }
    }

    if (errors.length > 0) {
      setLocalErrors((prev) => ({ ...prev, [name]: errors }));
    } else {
      setLocalErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, []);

  // Debounced handleChange
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      debouncedValidate(name, value);
    },
    [debouncedValidate]
  );

  // Handle form state changes
  useEffect(() => {
    if (state.message && !isPending) {
      if (state.success) {
        toast.success(state.message);
        formRef.current?.reset();
        setLocalErrors({});
      } else {
        toast.error(state.message);
        if (state.errors) {
          setLocalErrors(state.errors);
        }
      }
    }
  }, [state, isPending]);

  return (
    <form ref={formRef} action={formAction} className="grid w-full gap-6">
      <div className="grid gap-2">
        <label
          htmlFor="email"
          className="flex items-center justify-between text-sm font-medium"
        >
          Your Email
          {localErrors?.["email"] && (
            <span className="text-destructive flex animate-pulse items-center gap-1 text-xs">
              <AlertCircle size={10} /> {localErrors?.["email"][0]}
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
            localErrors?.["email"]
              ? "border-destructive focus-visible:ring-destructive"
              : "hover:border-accent/50 focus:border-accent"
          )}
          placeholder="recruiter@company.com"
          aria-invalid={!!localErrors?.["email"]}
          aria-describedby={localErrors?.["email"] ? "email-error" : undefined}
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
            localErrors?.["message"]
              ? "border-destructive focus-visible:ring-destructive"
              : "hover:border-accent/50 focus:border-accent"
          )}
          placeholder="Hi Sina, I want to discuss..."
          aria-invalid={!!localErrors?.["message"]}
          aria-describedby={
            localErrors?.["message"] ? "message-error" : undefined
          }
        />
        {localErrors?.["message"] && (
          <span
            id="message-error"
            className="text-destructive flex items-center gap-1 text-xs"
          >
            <AlertCircle size={10} /> {localErrors["message"][0]}
          </span>
        )}
      </div>

      <Button
        type="submit"
        disabled={
          isPending || Object.keys(localErrors).some((key) => localErrors[key])
        }
        className="text-accent-foreground bg-accent hover:bg-accent/90 h-12 w-full font-bold transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed"
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

function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
