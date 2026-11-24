import { LineBadge, TextLink } from "@/components/atoms";
import { OrgMark, PeriodLabel } from "@/components/molecules";
import type { YearMonth } from "@/domain/portfolio";
import { LANE_LABELS, type CareerLane, type RouteStop } from "@/lib/career";
import { cn } from "@/lib/utils";

const RAIL_COLOR: Record<CareerLane, string> = {
  industry: "bg-lane-industry",
  research: "bg-lane-research",
  study: "bg-lane-study",
};

interface RouteStripProps {
  stops: RouteStop[];
  now: YearMonth;
  /** Open station at the top of the route, e.g. "Open to new roles". */
  nextStop?: { title: string; description: string; href: string } | undefined;
}

/**
 * Roles and degrees as a strip map, the vertical diagram printed inside
 * trains: one rail, a station per stop, coloured by career line.
 */
export function RouteStrip({ stops, now, nextStop }: RouteStripProps) {
  return (
    <ol className="grid">
      {nextStop ? (
        <li
          className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 pb-9 sm:grid-cols-[3.25rem_minmax(0,1fr)_auto] sm:gap-x-5"
          data-print="hide"
        >
          <Rail next />
          <div>
            <h3 className="type-display text-[2rem] leading-tight font-extrabold">
              {nextStop.title}
            </h3>
            <p className="font-semibold">{nextStop.description}</p>
          </div>
          <p className="max-sm:col-start-2 max-sm:pt-1 sm:pt-1.5 sm:text-right">
            <TextLink href={nextStop.href}>Get in touch</TextLink>
          </p>
        </li>
      ) : null}

      {stops.map((stop, index) => (
        <li
          key={stop.anchor}
          id={stop.anchor}
          className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 pb-10 sm:grid-cols-[3.25rem_minmax(0,1fr)_auto] sm:gap-x-5"
        >
          <Rail lane={stop.lane} last={index === stops.length - 1} />
          <article className="min-w-0">
            <h3 className="type-display flex flex-wrap items-center gap-x-3 gap-y-1 text-[2rem] leading-tight font-extrabold">
              {stop.url ? (
                <TextLink href={stop.url} tone="quiet" showExternalIcon={false}>
                  {stop.organization}
                </TextLink>
              ) : (
                stop.organization
              )}
              <LineBadge tone={stop.lane}>{LANE_LABELS[stop.lane]}</LineBadge>
            </h3>
            <p className="mt-0.5 font-semibold">{stop.title}</p>
            <p className="mt-2 max-w-[62ch]">{stop.description}</p>
            {stop.note ? (
              <p className="text-muted-foreground mt-1 max-w-[62ch]">
                {stop.note}
              </p>
            ) : null}
            <p className="text-muted-foreground mt-3 max-w-[62ch] text-sm">
              <span className="sr-only">{stop.tagsLabel}: </span>
              {stop.tags.join(", ")}
            </p>
          </article>
          <div className="max-sm:col-start-2 max-sm:pt-2 sm:flex sm:flex-col sm:items-end sm:gap-3 sm:pt-1">
            <OrgMark
              name={stop.organization}
              logo={stop.logo}
              className="h-14 w-24 shadow-[0_6px_16px_-8px_rgb(15_30_61/0.35)] max-sm:hidden"
            />
            <PeriodLabel
              period={stop.period}
              now={now}
              showDuration
              className="tabular sm:text-right"
            />
          </div>
        </li>
      ))}
    </ol>
  );
}

function Rail({
  lane,
  last = false,
  next = false,
}: {
  lane?: CareerLane;
  last?: boolean;
  next?: boolean;
}) {
  return (
    <div aria-hidden className="relative">
      <span
        className={cn(
          "absolute top-3 left-1/2 w-3 -translate-x-1/2",
          last ? "h-5 rounded-b-full" : "-bottom-3",
          next
            ? "bg-[repeating-linear-gradient(to_bottom,var(--color-lane-industry)_0_10px,transparent_10px_18px)]"
            : lane && RAIL_COLOR[lane]
        )}
      />
      {next ? (
        <span className="bg-signal absolute top-1 left-1/2 size-7 -translate-x-1/2 rounded-full opacity-60 motion-safe:animate-ping" />
      ) : null}
      <span
        className={cn(
          "absolute top-1 left-1/2 size-7 -translate-x-1/2 rounded-full border-[5px]",
          next
            ? "border-foreground bg-signal"
            : "border-foreground bg-background"
        )}
      />
    </div>
  );
}
