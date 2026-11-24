import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type LineTone = "industry" | "research" | "study";

const TONE: Record<LineTone, string> = {
  industry: "bg-lane-industry",
  research: "bg-lane-research",
  study: "bg-lane-study",
};

interface LineBadgeProps extends ComponentProps<"span"> {
  tone: LineTone;
}

/** Pill naming a career line, coloured like the line on the map. */
export function LineBadge({ tone, className, ...props }: LineBadgeProps) {
  return (
    <span
      className={cn(
        "font-display text-lane-foreground inline-flex items-center rounded-full px-2.5 py-0.5 text-sm leading-5 font-bold",
        TONE[tone],
        className
      )}
      {...props}
    />
  );
}
