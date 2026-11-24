import { TextLink } from "@/components/atoms";
import { PeriodLabel } from "@/components/molecules";
import type { YearMonth } from "@/domain/portfolio";
import { careerAxis, periodBar, type RouteStop } from "@/lib/career";

interface CareerTableProps {
  stops: RouteStop[];
  now: YearMonth;
}

/**
 * Roles and degrees as rows, newest first. Each row carries a bar on one
 * time axis shared by every row, so overlaps and gaps read at a glance.
 */
export function CareerTable({ stops, now }: CareerTableProps) {
  const axis = careerAxis(
    stops.map((stop) => stop.period),
    now
  );
  const lastYear = axis.end / 12 - 1;

  return (
    <div>
      <ol className="border-foreground border-t-2">
        {stops.map((stop) => {
          const bar = periodBar(stop.period, axis, now);
          return (
            <li
              key={stop.anchor}
              id={stop.anchor}
              className="border-border grid gap-x-8 gap-y-3 border-b py-6 md:grid-cols-[10rem_minmax(0,1fr)_minmax(0,1.55fr)] md:py-7"
            >
              <div className="text-[0.9375rem]">
                <PeriodLabel
                  period={stop.period}
                  now={now}
                  showDuration
                  className="font-semibold"
                />
                <div
                  aria-hidden
                  className="bg-muted relative mt-3 h-1 w-40 max-w-full rounded-full"
                >
                  <span
                    className="bg-foreground absolute inset-y-0 rounded-full"
                    style={{
                      left: `${bar.offset}%`,
                      width: `max(${bar.span}%, 4px)`,
                    }}
                  />
                </div>
              </div>

              <div>
                <h3 className="type-title text-[1.375rem] leading-tight">
                  {stop.url ? (
                    <TextLink
                      href={stop.url}
                      tone="quiet"
                      showExternalIcon={false}
                    >
                      {stop.organization}
                    </TextLink>
                  ) : (
                    stop.organization
                  )}
                </h3>
                <p className="text-muted-foreground mt-1">{stop.title}</p>
              </div>

              <div className="max-w-[62ch]">
                <p>{stop.description}</p>
                {stop.note ? (
                  <p className="text-muted-foreground mt-1">{stop.note}</p>
                ) : null}
                <p className="text-muted-foreground mt-3 text-sm">
                  <span className="sr-only">{stop.tagsLabel}: </span>
                  {stop.tags.join(", ")}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="text-muted-foreground tabular mt-3 text-sm" aria-hidden>
        Bars run from {axis.firstYear} to {lastYear}
      </p>
    </div>
  );
}
