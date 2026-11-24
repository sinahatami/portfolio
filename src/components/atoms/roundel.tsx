import type { ProjectDomain } from "@/domain/portfolio";
import { cn } from "@/lib/utils";

const DOMAIN_STYLE: Record<
  ProjectDomain,
  { letter: string; className: string }
> = {
  web: { letter: "W", className: "bg-domain-web text-white" },
  ml: { letter: "M", className: "bg-domain-ml text-white" },
  data: { letter: "D", className: "bg-domain-data text-signal-foreground" },
  systems: { letter: "S", className: "bg-domain-systems text-white" },
};

interface RoundelProps {
  domain: ProjectDomain;
  /** Accessible name; omit when the area is named in adjacent text. */
  label?: string;
  className?: string;
}

/** A project area drawn as a transit line roundel: a coloured disc with a letter. */
export function Roundel({ domain, label, className }: RoundelProps) {
  const style = DOMAIN_STYLE[domain];
  return (
    <span
      className={cn(
        "font-display inline-grid size-7 shrink-0 place-items-center rounded-full text-sm leading-none font-bold dark:text-[#0a1226]",
        style.className,
        className
      )}
      {...(label
        ? { role: "img", "aria-label": label }
        : { "aria-hidden": true })}
    >
      {style.letter}
    </span>
  );
}
