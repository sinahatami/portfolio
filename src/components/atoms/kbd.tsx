import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Kbd({ className, ...props }: ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "border-border bg-background text-muted-foreground inline-flex h-5 min-w-5 items-center justify-center rounded-sm border px-1 font-sans text-xs",
        className
      )}
      {...props}
    />
  );
}
