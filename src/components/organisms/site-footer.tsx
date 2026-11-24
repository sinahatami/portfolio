import { Container, TextLink } from "@/components/atoms";
import { SocialLinks } from "@/components/molecules";
import type { Profile } from "@/domain/portfolio";

interface SiteFooterProps {
  profile: Profile;
  version: string;
  year: number;
}

export function SiteFooter({ profile, version, year }: SiteFooterProps) {
  return (
    <footer className="board board-map" data-print="hide">
      {/* The three lines run out along the bottom of the page */}
      <div aria-hidden className="grid gap-[3px] pt-px">
        <span className="bg-lane-research h-1" />
        <span className="bg-lane-industry h-1" />
        <span className="bg-lane-study h-1" />
      </div>
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="type-display text-2xl font-extrabold">{profile.name}</p>
          <p className="text-muted-foreground text-sm">
            {profile.role}, {profile.location.label}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <SocialLinks socials={profile.socials} />
          <p className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <span>
              © {year} {profile.name}
            </span>
            <span className="tabular">Version {version}</span>
            <TextLink
              href={profile.sourceCode}
              tone="quiet"
              className="text-muted-foreground"
            >
              Source code
            </TextLink>
          </p>
        </div>
      </Container>
    </footer>
  );
}
