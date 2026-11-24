import type { LucideProps } from "lucide-react";
import { ICONS, type IconName } from "@/lib/icons";

export type { IconName };

interface IconProps extends Omit<LucideProps, "ref"> {
  name: IconName;
  /** Accessible name. Without it the icon is decorative and hidden. */
  label?: string;
}

export function Icon({ name, label, ...props }: IconProps) {
  const Component = ICONS[name];
  return (
    <Component
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      strokeWidth={1.75}
      {...props}
    />
  );
}
