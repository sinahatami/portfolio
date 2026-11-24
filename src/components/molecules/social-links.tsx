import { TextLink } from "@/components/atoms";
import type { SocialProfile } from "@/domain/portfolio";
import { cn } from "@/lib/utils";

interface SocialLinksProps {
  socials: SocialProfile[];
  className?: string;
}

/** Profiles as plain named links; the name says more than an icon. */
export function SocialLinks({ socials, className }: SocialLinksProps) {
  return (
    <ul
      className={cn("flex flex-wrap items-center gap-x-5 gap-y-1", className)}
    >
      {socials.map((social) => (
        <li key={social.id}>
          <TextLink href={social.url} showExternalIcon={false}>
            {social.label}
          </TextLink>
        </li>
      ))}
    </ul>
  );
}
