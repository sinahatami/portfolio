"use client";

import { cn } from "@/lib/utils";

export interface ChoiceOption<T extends string> {
  value: T;
  label: string;
  count?: number;
}

interface ChoiceChipsProps<T extends string> {
  label: string;
  options: ChoiceOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

/** Single-select toggle group (e.g. project filters), set as a segmented row. */
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
      className={cn("flex flex-wrap gap-1.5", className)}
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
              "inline-flex h-9 items-center gap-2 rounded-md border px-3 text-[0.9375rem] font-medium transition-colors",
              selected
                ? "border-foreground bg-foreground text-background"
                : "border-border text-foreground hover:border-foreground/60"
            )}
          >
            {option.label}
            {option.count !== undefined ? (
              <span
                className={cn(
                  "tabular text-sm font-normal",
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
