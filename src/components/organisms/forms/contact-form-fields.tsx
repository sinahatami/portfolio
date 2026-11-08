import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea,
} from "@/components";
import type { UseFormReturn } from "react-hook-form";

export function ContactFormFields({ form }: { form: UseFormReturn<any> }) {
  return (
    <>
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
                {field.value?.length || 0}/2000
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
    </>
  );
}
