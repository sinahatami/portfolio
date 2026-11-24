import { TextLink } from "@/components/atoms";
import { SocialLinks } from "@/components/molecules";
import type { Profile } from "@/domain/portfolio";
import { ContactForm } from "./contact-form";

interface ContactBlockProps {
  profile: Profile;
}

export function ContactBlock({ profile }: ContactBlockProps) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="type-display max-w-[16ch] text-4xl leading-[1.05] font-extrabold text-balance md:text-5xl">
          Your team could be the next stop.
        </p>
        <p className="text-muted-foreground mt-6 max-w-prose text-lg">
          Have a role or a project in mind? I&apos;m based in{" "}
          {profile.location.label} (CET), open to roles in Europe and remote,
          and I usually reply within a day.
        </p>
        <p className="type-title mt-6 text-2xl">
          <TextLink href={`mailto:${profile.email}`}>{profile.email}</TextLink>
        </p>
        <div className="mt-4 -ml-2.5">
          <SocialLinks socials={profile.socials} />
        </div>
      </div>
      <div className="bg-surface border-border rounded-lg border p-6 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)] backdrop-blur-sm md:p-8">
        <ContactForm />
      </div>
    </div>
  );
}
