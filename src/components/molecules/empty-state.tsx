import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: ReactNode;
  action?: ReactNode;
  className?: string;
}

/** Stands in for an empty list: the list's opening rule, then what to do. */
export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("border-foreground border-t-2 pt-5 pb-2", className)}>
      <p className="text-foreground text-lg font-semibold">{title}</p>
      <div className="text-muted-foreground mt-1 max-w-prose">
        {description}
      </div>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
