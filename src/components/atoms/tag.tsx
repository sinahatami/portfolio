import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/** Non-interactive label for a technology, topic or category. */
export function Tag({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "border-border text-muted-foreground inline-flex items-center rounded-sm border px-2 py-0.5 text-xs leading-5",
        className
      )}
      {...props}
    />
  );
}
