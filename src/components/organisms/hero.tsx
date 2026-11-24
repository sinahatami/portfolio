import Image from "next/image";
import { Button, Container, TextLink } from "@/components/atoms";
import { SocialLinks } from "@/components/molecules";
import type { Profile } from "@/domain/portfolio";
import { annotateHeadline, type ResolvedProofNote } from "@/lib/proof";
import { cn } from "@/lib/utils";
import { WovenName } from "./woven-name";

interface HeroProps {
  profile: Profile;
  notes: ResolvedProofNote[];
}

/**
 * The name woven into a band of indigo twill, then the headline with a
 * numbered marker after each claim beside the photo, and the sources for
 * those claims in a row underneath.
 */
export function Hero({ profile, notes }: HeroProps) {
  const segments = annotateHeadline(profile.headline, profile.proof);

  return (
    <section id="about" aria-labelledby="about-title">
      <WovenName
        id="about-title"
        name={profile.name}
        className="pt-8 pb-16 sm:pt-12 sm:pb-24 md:pt-14 md:pb-32"
      />
      <div aria-hidden className="selvedge h-2.5" />

      <Container>
        {/* Claim beside the photo; on small screens the intro and actions
            run full width underneath, on wide ones they stay in the left
            column while the photo spans its height. The photo is pinned to
            the cloth: it rises into the band above. Placement is explicit
            (`grid-column: 1`, `grid-row: 1 / span 3`): a bare row span would
            reset the photo's start row and let auto-placement move the
            intro into the photo's column. */}
        <div className="grid grid-cols-[minmax(0,1fr)_6.5rem] gap-x-5 sm:grid-cols-[minmax(0,1fr)_11rem] md:grid-rows-[auto_auto_1fr] md:gap-x-16 lg:grid-cols-[minmax(0,1fr)_15rem]">
          <p className="col-start-1 row-start-1 mt-8 max-w-[20ch] text-[clamp(1.75rem,3.4vw,2.875rem)] leading-[1.1] font-medium tracking-[-0.03em] md:mt-12">
            {segments.map((segment) => (
              <span key={segment.text}>
                {segment.text}
                {segment.note ? <NoteMarker number={segment.note} /> : null}
              </span>
            ))}
          </p>
          <p className="text-muted-foreground col-span-2 mt-5 max-w-[48ch] text-lg md:col-[1]">
            {profile.role},{" "}
            <span className="whitespace-nowrap">
              <TextLink
                href={profile.location.mapUrl}
                showExternalIcon={false}
                className="text-muted-foreground"
              >
                {profile.location.label}
              </TextLink>
              .
            </span>{" "}
            {profile.intro}
          </p>
          <div
            className="col-span-2 mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 md:col-[1]"
            data-print="hide"
          >
            <Button asChild size="lg">
              <a href="#contact">Get in touch</a>
            </Button>
            <SocialLinks socials={profile.socials} className="font-medium" />
          </div>

          <div className="bg-muted ring-background relative col-start-2 row-start-1 -mt-10 aspect-[4/5] self-start overflow-hidden rounded-[4px] shadow-[0_1px_2px_rgb(17_26_54/0.25),0_22px_44px_-16px_rgb(17_26_54/0.55)] ring-4 sm:-mt-16 sm:ring-6 md:row-[1/span_3] md:-mt-24">
            <Image
              src={profile.photo.src}
              alt={profile.photo.alt}
              fill
              priority
              sizes="(min-width: 1024px) 240px, (min-width: 640px) 176px, 104px"
              className="object-cover object-[50%_30%]"
            />
          </div>
        </div>

        {notes.length > 0 ? <ProofNotes notes={notes} /> : null}
      </Container>
    </section>
  );
}

function NoteMarker({ number }: { number: number }) {
  return (
    <sup className="top-0 ml-[0.04em] align-[1.05em] text-[0.42em] leading-none font-bold">
      <a
        href={`#note-${number}`}
        aria-label={`Note ${number}`}
        className="text-accent rounded-sm px-[0.12em] hover:underline"
      >
        {number}
      </a>
    </sup>
  );
}

function ProofNotes({ notes }: { notes: ResolvedProofNote[] }) {
  return (
    <div className="mt-12 md:mt-16">
      <ol
        aria-label="Sources"
        className="border-foreground grid gap-x-10 gap-y-6 border-t-2 pt-5 md:grid-cols-3"
      >
        {notes.map((note) => (
          <li
            key={note.number}
            id={`note-${note.number}`}
            className="target:animate-mark -mx-2 grid grid-cols-[1.5rem_minmax(0,1fr)] rounded-sm px-2 py-1 text-[0.96875rem] leading-normal"
          >
            <span aria-hidden className="text-accent tabular font-bold">
              {note.number}
            </span>
            <div>
              <p className={cn("font-semibold", note.quote && "text-balance")}>
                {note.quote ? `“${note.title}”` : note.title}
              </p>
              {note.body ? (
                <p className={cn(note.quote && "text-muted-foreground mt-1")}>
                  {note.body}
                </p>
              ) : null}
              <p className="mt-1.5" data-print="hide">
                <TextLink href={note.link.href}>{note.link.label}</TextLink>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
