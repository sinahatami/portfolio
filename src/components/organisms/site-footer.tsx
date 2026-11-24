import { Container, TextLink } from "@/components/atoms";
import { SocialLinks } from "@/components/molecules";
import type { Profile } from "@/domain/portfolio";

interface SiteFooterProps {
  profile: Profile;
  version: string;
  year: number;
}

/**
 * The other end of the cloth: a selvedge edge, then denim, with the name,
 * links, and one line on where the blue comes from.
 */
export function SiteFooter({ profile, version, year }: SiteFooterProps) {
  return (
    <footer className="mt-24 md:mt-32" data-print="hide">
      <div aria-hidden className="selvedge h-2.5" />
      <div className="scheme-denim">
        <Container className="grid gap-8 py-12 text-sm sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
          <div>
            <p className="text-2xl font-extrabold tracking-[-0.03em]">
              {profile.name}
            </p>
            <p className="text-muted-foreground mt-1 text-[0.9375rem]">
              {profile.role}, {profile.location.label}
            </p>
          </div>
          <div className="grid gap-2 sm:justify-items-end">
            <SocialLinks socials={profile.socials} />
            <p className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
              <span>
                © {year} {profile.name}
              </span>
              <span>Version {version}</span>
              <TextLink
                href={profile.sourceCode}
                showExternalIcon={false}
                className="text-muted-foreground"
              >
                Source code
              </TextLink>
            </p>
          </div>
          <p className="text-muted-foreground border-border border-t pt-5 sm:col-span-2">
            <span className="block max-w-[64ch]">
              The blue is bleu de Gênes, the Genoese cloth that gave jeans their
              name. The home page weaves the name like a jacquard loom, whose
              punched cards inspired the first computers.
            </span>
          </p>
        </Container>
      </div>
    </footer>
  );
}
