"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/atoms";
import { toParagraphs } from "@/lib/text";
import { cn } from "@/lib/utils";

interface ExpandableTextProps {
  text: string;
  expandLabel: string;
  collapseLabel: string;
  className?: string;
}

/** Disclosure for long text: a button that reveals the full paragraphs. */
export function ExpandableText({
  text,
  expandLabel,
  collapseLabel,
  className,
}: ExpandableTextProps) {
  const [open, setOpen] = useState(false);
  const regionId = useId();

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={regionId}
        onClick={() => setOpen((value) => !value)}
        className="text-link inline-flex items-center gap-1 text-sm font-medium hover:underline"
      >
        {open ? collapseLabel : expandLabel}
        <Icon
          name="chevron-down"
          className={cn("size-4 transition-transform", open && "rotate-180")}
        />
      </button>
      <div
        id={regionId}
        hidden={!open}
        className="text-muted-foreground mt-3 space-y-3 text-sm leading-6"
      >
        {toParagraphs(text).map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
