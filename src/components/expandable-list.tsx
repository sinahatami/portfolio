"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableListProps {
  items: React.ReactNode[];
  initialCount?: number;
}

export function ExpandableList({
  items,
  initialCount = 4,
}: ExpandableListProps) {
  const [expanded, setExpanded] = useState(false);

  if (items.length <= initialCount) {
    return <div className="grid grid-cols-1 gap-6 md:gap-8">{items}</div>;
  }

  const visibleItems = expanded ? items : items.slice(0, initialCount);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:gap-8">{visibleItems}</div>

      <div className="flex justify-center pt-4">
        <Button
          variant="outline"
          onClick={() => setExpanded(!expanded)}
          className="min-w-[150px] gap-2"
        >
          {expanded ? (
            <>
              Show Less <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Show More ({items.length - initialCount} hidden){" "}
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
