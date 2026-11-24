import { cn } from "@/lib/utils";

interface StatusDotProps {
  /** Pulsing ring for "live" states; disabled for reduced-motion users. */
  pulse?: boolean;
  className?: string;
}

/** Signal-yellow station dot with an ink ring, as on a transit map. */
export function StatusDot({ pulse = false, className }: StatusDotProps) {
  return (
    <span
      aria-hidden
      className={cn("relative inline-flex size-2.5 shrink-0", className)}
    >
      {pulse ? (
        <span className="bg-signal absolute inset-0 rounded-full opacity-70 motion-safe:animate-ping" />
      ) : null}
      <span className="bg-signal ring-foreground relative inline-flex size-2.5 rounded-full ring-2" />
    </span>
  );
}
