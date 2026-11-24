import { Button, Icon } from "@/components/atoms";
import type { SocialProfile } from "@/domain/portfolio";

interface SocialLinksProps {
  socials: SocialProfile[];
}

export function SocialLinks({ socials }: SocialLinksProps) {
  return (
    <ul className="flex items-center gap-1">
      {socials.map((social) => (
        <li key={social.id}>
          <Button variant="ghost" size="icon" asChild>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.label} (opens in a new tab)`}
              title={social.label}
            >
              <Icon name={social.id} />
            </a>
          </Button>
        </li>
      ))}
    </ul>
  );
}
