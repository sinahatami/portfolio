import { StatusDot } from "@/components/atoms";
import type { Profile } from "@/domain/portfolio";

interface AvailabilityProps {
  availability: Profile["availability"];
}

export function Availability({ availability }: AvailabilityProps) {
  if (!availability.open) return null;
  return (
    <p className="text-foreground inline-flex items-center gap-2 text-sm font-medium">
      <StatusDot />
      {availability.label}
    </p>
  );
}
