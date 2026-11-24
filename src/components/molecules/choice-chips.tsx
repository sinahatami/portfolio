"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ChoiceOption<T extends string> {
  value: T;
  label: string;
  count?: number;
  /** Decorative mark before the label, e.g. a line roundel. */
  leading?: ReactNode;
}

interface ChoiceChipsProps<T extends string> {
  label: string;
  options: ChoiceOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

/** Single-select toggle group (e.g. project filters). */
export function ChoiceChips<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: ChoiceChipsProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "font-display inline-flex h-10 items-center gap-2 rounded-full border-2 text-base font-semibold transition-colors",
              option.leading ? "pr-3.5 pl-1" : "px-3.5",
              selected
                ? "border-foreground bg-foreground text-background"
                : "border-border text-foreground hover:border-foreground/50"
            )}
          >
            {option.leading}
            {option.label}
            {option.count !== undefined ? (
              <span
                className={cn(
                  "tabular text-xs",
                  "font-sans font-normal",
                  selected ? "text-background/70" : "text-muted-foreground"
                )}
              >
                {option.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
