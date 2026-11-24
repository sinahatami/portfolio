import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { fieldControlClass } from "./input";

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(fieldControlClass, "min-h-36 resize-y py-2.5", className)}
      {...props}
    />
  );
}
