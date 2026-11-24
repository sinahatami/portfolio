import { TextLink } from "@/components/atoms";
import { SocialLinks } from "@/components/molecules";
import type { Profile } from "@/domain/portfolio";
import { ContactForm } from "./contact-form";

interface ContactBlockProps {
  profile: Profile;
}

export function ContactBlock({ profile }: ContactBlockProps) {
  return (
    <div className="border-foreground grid gap-12 border-t-2 pt-8 lg:grid-cols-2 lg:gap-20">
      <div>
        <p className="text-[clamp(1.625rem,3.2vw,2.5rem)] leading-tight font-bold tracking-[-0.03em] break-words">
          <TextLink href={`mailto:${profile.email}`}>{profile.email}</TextLink>
        </p>
        <p className="text-muted-foreground mt-5 max-w-[46ch] text-lg">
          Have a role or a project in mind? I&apos;m based in{" "}
          {profile.location.label} (CET), open to roles in Europe and remote,
          and I usually reply within a day.
        </p>
        <SocialLinks socials={profile.socials} className="mt-6 font-medium" />
      </div>
      <ContactForm />
    </div>
  );
}
