import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const fieldControlClass = cn(
  "border-border bg-surface text-foreground w-full rounded-md border px-3 text-base",
  "placeholder:text-muted-foreground/80 transition-colors",
  "hover:border-foreground/40 focus-visible:border-foreground",
  "aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-60"
);

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input className={cn(fieldControlClass, "h-11", className)} {...props} />
  );
}
