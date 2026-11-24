import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "border-border rounded-lg border border-dashed px-6 py-10",
        className
      )}
    >
      <p className="text-foreground font-semibold">{title}</p>
      <div className="text-muted-foreground mt-1 max-w-prose text-sm">
        {description}
      </div>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
