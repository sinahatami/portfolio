"use client";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { sendContactEmail } from "@/actions/contact";
import {
  Button,
  Input,
  Textarea,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";
import { Loader2, Send, CheckCircle2 } from "@/lib/icons";
import { toast } from "@/components/ui/toaster";

const contactSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(2000, { message: "Message must be less than 2000 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "",
      message: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: ContactFormValues) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("message", data.message);

        const result = await sendContactEmail(null, formData);

        if (result.success) {
          toast.success(result.message);
          form.reset();
          setIsSuccess(true);
          setTimeout(() => setIsSuccess(false), 3000);
        } else {
          toast.error(result.message || "Failed to send message.");
          if (result.errors) {
            if (result.errors.email?.[0]) {
              form.setError("email", { message: result.errors.email[0] });
            }
            if (result.errors.message?.[0]) {
              form.setError("message", { message: result.errors.message[0] });
            }
          }
        }
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full gap-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                Your Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="recruiter@company.com"
                  className="h-12"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                Message
                <span className="text-muted-foreground text-xs font-normal">
                  {field.value.length}/2000
                </span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Hi Sina, I want to discuss..."
                  className="min-h-[140px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isPending || !form.formState.isValid}
          className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 w-full font-bold transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : isSuccess ? (
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
    </Form>
  );
}
