import { Button, Container, Icon, LineBadge } from "@/components/atoms";
import { InterchangePortrait } from "@/components/molecules";
import type { Profile, YearMonth } from "@/domain/portfolio";
import type { CareerLane, CareerTimeline } from "@/lib/career";
import { LANE_LABELS } from "@/lib/career";
import { RouteMap } from "./route-map";

const BADGE_ORDER: CareerLane[] = ["industry", "research", "study"];

interface HeroProps {
  profile: Profile;
  timeline: CareerTimeline;
  now: YearMonth;
}

/**
 * The night board: the portrait as the interchange where the career lines
 * meet, the name set like a station sign, and the route map underneath.
 */
export function Hero({ profile, timeline, now }: HeroProps) {
  const lines = BADGE_ORDER.filter((lane) =>
    timeline.lanes.some((line) => line.id === lane)
  );

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="board board-map overflow-hidden"
    >
      <Container className="grid gap-x-16 pt-14 md:pt-20 lg:grid-cols-[minmax(0,1fr)_18.5rem] lg:items-center lg:pt-24">
        <InterchangePortrait
          src={profile.photo.src}
          alt={profile.photo.alt}
          className="mt-8 mb-16 w-36 sm:w-44 lg:order-2 lg:my-0 lg:w-full"
        />

        <div className="lg:order-1">
          <h1
            id="about-title"
            className="type-display text-[3.9rem] leading-[0.88] font-extrabold tracking-[-0.02em] sm:text-8xl lg:text-[8.25rem]"
          >
            {profile.name}
          </h1>
          <p className="mt-4 text-lg sm:text-xl">
            {profile.role},{" "}
            <a
              href={profile.location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:decoration-signal underline decoration-current/35 underline-offset-4 transition-colors"
            >
              {profile.location.label}
            </a>
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-muted-foreground text-sm">
              Change here for
            </span>
            <ul aria-label="Career lines" className="flex flex-wrap gap-1.5">
              {lines.map((lane) => (
                <li key={lane}>
                  <LineBadge tone={lane}>{LANE_LABELS[lane]}</LineBadge>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-10 max-w-[24ch] text-[1.9rem] leading-[1.1] font-semibold tracking-[-0.015em] text-balance sm:text-[2.6rem]">
            {profile.headline}
          </p>
          <p className="text-muted-foreground mt-5 max-w-[60ch]">
            {profile.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5" data-print="hide">
            <Button asChild size="lg" variant="signal">
              <a href="#contact">
                <Icon name="mail" />
                Get in touch
              </a>
            </Button>
            {profile.socials.map((social) => (
              <Button key={social.id} asChild size="lg" variant="secondary">
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  <Icon name={social.id} />
                  {social.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Button>
            ))}
          </div>
        </div>
      </Container>

      <Container className="pt-14 pb-12 md:pt-16 md:pb-16" data-print="hide">
        <RouteMap
          timeline={timeline}
          now={now}
          nextStop={
            profile.availability.open
              ? { lane: "industry", label: profile.availability.label }
              : undefined
          }
        />
      </Container>
    </section>
  );
}
