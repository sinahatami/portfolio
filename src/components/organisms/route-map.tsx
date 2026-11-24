"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { TextLink } from "@/components/atoms";
import { OrgMark } from "@/components/molecules";
import type { YearMonth } from "@/domain/portfolio";
import {
  latestEntry,
  type CareerLane,
  type CareerTimeline,
  type PlacedCareerEntry,
} from "@/lib/career";
import { formatDuration, formatPeriod, periodMonths } from "@/lib/dates";
import { cn } from "@/lib/utils";

const LINE_COLOR: Record<CareerLane, string> = {
  industry: "var(--color-lane-industry)",
  research: "var(--color-lane-research)",
  study: "var(--color-lane-study)",
};

const BORDER_COLOR: Record<CareerLane, string> = {
  industry: "border-lane-industry",
  research: "border-lane-research",
  study: "border-lane-study",
};

/* Map geometry in SVG user units; the SVG scales to its container. */
const W = 1120;
const LEFT = 96;
const RIGHT = 150;
const FIRST_LINE_Y = 170;
const LINE_GAP = 55;
const LINE_WIDTH = 12;
const NEXT_STOP_X = W - 70;

interface RouteMapProps {
  timeline: CareerTimeline;
  now: YearMonth;
  /** Draws an open "next stop" at the end of this line, e.g. when job hunting. */
  nextStop?: { lane: CareerLane; label: string } | undefined;
}

/**
 * The career as a transit map. Lines are industry, research and study; each
 * role or degree is a station; interchanges mark switches between lines.
 * Stations are buttons: hover, focus or press one to read it below the map.
 */
export function RouteMap({ timeline, now, nextStop }: RouteMapProps) {
  const [selectedId, setSelectedId] = useState(
    () => latestEntry(timeline)?.id ?? null
  );
  const scrollerRef = useRef<HTMLDivElement>(null);

  // On narrow screens the map scrolls sideways; start at the present.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (scroller) scroller.scrollLeft = scroller.scrollWidth;
  }, []);

  const x = (offset: number) => LEFT + (offset / 100) * (W - LEFT - RIGHT);
  const lineY = new Map(
    timeline.lanes.map((lane, index) => [
      lane.id,
      FIRST_LINE_Y + index * LINE_GAP,
    ])
  );
  const y = (lane: CareerLane) => lineY.get(lane) ?? FIRST_LINE_Y;
  const bottom = FIRST_LINE_Y + (timeline.lanes.length - 1) * LINE_GAP;
  const height = bottom + 70;
  const top = FIRST_LINE_Y - 30;

  const entries = timeline.lanes.flatMap((lane) => lane.entries);
  const selected = entries.find((entry) => entry.id === selectedId);
  const openLine = nextStop
    ? timeline.lanes.find((lane) => lane.id === nextStop.lane)
    : undefined;

  return (
    <div>
      <div
        ref={scrollerRef}
        className="-mx-5 overflow-x-auto overflow-y-hidden px-5 sm:mx-0 sm:px-0"
      >
        <svg
          viewBox={`0 0 ${W} ${height}`}
          role="group"
          aria-label={`Career route map, ${timeline.ticks[0]?.year ?? ""} to ${now.slice(0, 4)}`}
          className="font-display block h-auto w-full min-w-[880px]"
        >
          <defs>
            <filter
              id="route-glow"
              x="-10%"
              y="-200%"
              width="120%"
              height="500%"
            >
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>

          {/* Year grid */}
          <g aria-hidden>
            {timeline.ticks.map((tick, index) => (
              <g key={tick.year}>
                <line
                  x1={x(tick.offset)}
                  x2={x(tick.offset)}
                  y1={top}
                  y2={bottom + 40}
                  stroke="var(--color-border)"
                  strokeOpacity={0.6}
                />
                {index < timeline.ticks.length - 1 ? (
                  <text
                    x={x(tick.offset) + 6}
                    y={bottom + 56}
                    fontSize={14}
                    className="fill-muted-foreground font-sans"
                  >
                    {tick.year}
                  </text>
                ) : null}
              </g>
            ))}
            {timeline.lanes.map((lane) => (
              <text
                key={lane.id}
                x={0}
                y={y(lane.id) + 5}
                fontSize={15}
                fontWeight={700}
                fill={LINE_COLOR[lane.id]}
              >
                {lane.label}
              </text>
            ))}
          </g>

          <g className="motion-safe:animate-reveal">
            {/* Gaps on a line, and the open end towards the next stop */}
            <g aria-hidden>
              {timeline.lanes.flatMap((lane) =>
                lane.gaps.map((gap) => (
                  <DashedLine
                    key={`${lane.id}-${gap.from}`}
                    x1={x(gap.from)}
                    x2={x(gap.to)}
                    y={y(lane.id)}
                    color={LINE_COLOR[lane.id]}
                  />
                ))
              )}
              {openLine ? (
                <DashedLine
                  x1={x(openLine.end)}
                  x2={NEXT_STOP_X}
                  y={y(openLine.id)}
                  color={LINE_COLOR[openLine.id]}
                />
              ) : null}
            </g>

            {/* Line segments, with a soft glow underneath */}
            <g aria-hidden>
              <g filter="url(#route-glow)" opacity={0.6}>
                {entries.map((entry) => (
                  <line
                    key={entry.id}
                    x1={x(entry.offset)}
                    x2={x(entry.offset + entry.span)}
                    y1={y(entry.lane)}
                    y2={y(entry.lane)}
                    stroke={LINE_COLOR[entry.lane]}
                    strokeWidth={LINE_WIDTH + 4}
                  />
                ))}
              </g>
              {entries.map((entry) => (
                <line
                  key={entry.id}
                  x1={x(entry.offset)}
                  x2={x(entry.offset + entry.span)}
                  y1={y(entry.lane)}
                  y2={y(entry.lane)}
                  stroke={LINE_COLOR[entry.lane]}
                  strokeWidth={LINE_WIDTH}
                />
              ))}
            </g>

            {/* Interchanges */}
            <g aria-hidden>
              {timeline.interchanges.map((interchange) => {
                const [a, b] = interchange.lanes.map(y) as [number, number];
                const from = Math.min(a, b);
                return (
                  <rect
                    key={interchange.id}
                    x={x(interchange.offset) - 9}
                    y={from - 9}
                    width={18}
                    height={Math.abs(a - b) + 18}
                    rx={9}
                    fill="var(--color-background)"
                    stroke="var(--color-foreground)"
                    strokeWidth={4}
                  />
                );
              })}
            </g>

            {/* Stations */}
            {entries.map((entry) => (
              <Station
                key={entry.id}
                entry={entry}
                x={x(entry.offset)}
                y={y(entry.lane)}
                labelY={top + 8}
                selected={entry.id === selectedId}
                onSelect={setSelectedId}
              />
            ))}

            {nextStop && openLine ? (
              <g>
                {/* A train running the open line, then a beacon at the stop */}
                <rect
                  aria-hidden
                  x={x(openLine.end) - 13}
                  y={y(openLine.id) - 6}
                  width={26}
                  height={12}
                  rx={6}
                  fill="var(--color-signal)"
                  className="motion-safe:animate-train opacity-0"
                  style={
                    {
                      "--travel": `${NEXT_STOP_X - x(openLine.end)}px`,
                    } as CSSProperties
                  }
                />
                <circle
                  aria-hidden
                  cx={NEXT_STOP_X}
                  cy={y(openLine.id)}
                  r={11}
                  fill="none"
                  stroke="var(--color-signal)"
                  strokeWidth={3}
                  className="motion-safe:animate-beacon origin-center opacity-0 [transform-box:fill-box]"
                />
                <circle
                  cx={NEXT_STOP_X}
                  cy={y(openLine.id)}
                  r={11}
                  fill="var(--color-signal)"
                  stroke="var(--color-foreground)"
                  strokeWidth={3.5}
                />
                <text
                  x={NEXT_STOP_X - 40}
                  y={y(openLine.id) + 40}
                  fontSize={16}
                  fontWeight={700}
                  className="fill-foreground"
                >
                  Next stop
                </text>
                <text
                  x={NEXT_STOP_X - 40}
                  y={y(openLine.id) + 58}
                  fontSize={15}
                  className="fill-muted-foreground"
                >
                  {nextStop.label}
                </text>
              </g>
            ) : null}
          </g>

          {/* Today */}
          <g aria-hidden>
            <line
              x1={x(timeline.now.offset)}
              x2={x(timeline.now.offset)}
              y1={top}
              y2={bottom + 40}
              stroke="var(--color-foreground)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />
            <text
              x={x(timeline.now.offset) + 5}
              y={bottom + 36}
              fontSize={13}
              className="fill-foreground font-sans"
            >
              Today
            </text>
          </g>
        </svg>
      </div>

      <div
        aria-live="polite"
        data-testid="station-details"
        className={cn(
          "bg-surface mt-3 min-h-28 rounded-r-lg border-l-[6px] px-5 py-4 backdrop-blur-sm transition-colors duration-300 sm:px-6 sm:py-5",
          selected ? BORDER_COLOR[selected.lane] : "border-border"
        )}
      >
        {selected ? <StationDetails entry={selected} now={now} /> : null}
      </div>
    </div>
  );
}

function DashedLine({
  x1,
  x2,
  y,
  color,
}: {
  x1: number;
  x2: number;
  y: number;
  color: string;
}) {
  return (
    <line
      x1={x1}
      x2={x2}
      y1={y}
      y2={y}
      stroke={color}
      strokeWidth={3}
      strokeDasharray="2 7"
      strokeLinecap="round"
    />
  );
}

interface StationProps {
  entry: PlacedCareerEntry;
  x: number;
  y: number;
  labelY: number;
  selected: boolean;
  onSelect: (id: string) => void;
}

function Station({ entry, x, y, labelY, selected, onSelect }: StationProps) {
  const select = () => onSelect(entry.id);
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select();
    }
  };

  return (
    <g
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`${entry.organization}, ${entry.title}, ${formatPeriod(entry.period)}`}
      onClick={select}
      onFocus={select}
      onMouseEnter={select}
      onKeyDown={onKeyDown}
      className="group cursor-pointer outline-none"
    >
      <line
        x1={x}
        x2={x}
        y1={labelY + 6}
        y2={y - 9}
        stroke="var(--color-foreground)"
        strokeDasharray="1 3"
        aria-hidden
      />
      <text
        transform={`translate(${x + 4} ${labelY}) rotate(-38)`}
        fontSize={17}
        fontWeight={600}
        className={cn(
          "transition-colors",
          selected
            ? "fill-link"
            : "fill-foreground group-hover:fill-link group-focus-visible:fill-link"
        )}
      >
        {entry.organization}
      </text>
      {/* Larger invisible hit area for touch */}
      <circle cx={x} cy={y} r={18} fill="transparent" />
      <circle
        cx={x}
        cy={y}
        r={selected ? 9 : 8}
        fill={selected ? "var(--color-signal)" : "var(--color-background)"}
        stroke="var(--color-foreground)"
        strokeWidth={selected ? 4 : 3.5}
        className="group-focus-visible:stroke-ring"
      />
    </g>
  );
}

function StationDetails({
  entry,
  now,
}: {
  entry: PlacedCareerEntry;
  now: YearMonth;
}) {
  return (
    <div className="grid gap-x-5 gap-y-2 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
      <OrgMark
        name={entry.organization}
        logo={entry.logo}
        className="max-sm:hidden"
      />
      <div>
        <p
          key={entry.id}
          className="type-title motion-safe:animate-flap origin-top text-2xl leading-tight"
        >
          {entry.organization}
        </p>
        <p className="text-muted-foreground">{entry.title}</p>
        <p className="mt-1 max-w-prose">{entry.summary}</p>
      </div>
      <div className="tabular flex flex-col sm:items-end sm:text-right">
        <span>{formatPeriod(entry.period)}</span>
        <span className="text-muted-foreground text-sm">
          {formatDuration(periodMonths(entry.period, now))}
        </span>
        <TextLink href={entry.href} className="mt-1">
          {entry.lane === "study"
            ? "Read about the degree"
            : "Read about the role"}
        </TextLink>
      </div>
    </div>
  );
}
