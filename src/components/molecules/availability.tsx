import type { Profile } from "@/domain/portfolio";

interface AvailabilityProps {
  availability: Profile["availability"];
}

export function Availability({ availability }: AvailabilityProps) {
  if (!availability.open) return null;
  return (
    <p className="text-foreground text-sm font-medium">{availability.label}</p>
  );
}
