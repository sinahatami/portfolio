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
    <footer className="border-border mt-24 border-t md:mt-32" data-print="hide">
      <Container className="flex flex-col gap-5 py-10 text-sm sm:flex-row sm:items-start sm:justify-between">
        <p>
          <span className="block font-bold">{profile.name}</span>
          <span className="text-muted-foreground">
            {profile.role}, {profile.location.label}
          </span>
        </p>
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
      </Container>
    </footer>
  );
}
