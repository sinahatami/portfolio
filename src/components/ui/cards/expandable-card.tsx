"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "@/lib/icons";

interface ExpandableCardProps {
  children: React.ReactNode;
  maxHeight?: string;
  className?: string;
  expandLabel?: string;
  collapseLabel?: string;
}

export const ExpandableCard = ({
  children,
  maxHeight = "160px",
  className,
  expandLabel = "Read More",
  collapseLabel = "Show Less",
}: ExpandableCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          !isExpanded && `max-h-[${maxHeight}]`
        )}
        style={!isExpanded ? { maxHeight } : {}}
      >
        {children}
      </div>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-accent focus-visible:ring-accent mt-3 flex items-center gap-1 rounded-sm px-2 py-1 text-xs font-semibold hover:underline focus-visible:ring-2 focus-visible:outline-none"
        aria-expanded={isExpanded}
      >
        {isExpanded ? (
          <>
            {collapseLabel} <ChevronUp size={12} />
          </>
        ) : (
          <>
            {expandLabel} <ChevronDown size={12} />
          </>
        )}
      </button>
    </div>
  );
};
