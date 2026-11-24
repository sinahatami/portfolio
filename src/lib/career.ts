import type {
  Education,
  Experience,
  Period,
  YearMonth,
} from "@/domain/portfolio";
import { monthIndex, parseYearMonth } from "./dates";

export type CareerLane = "industry" | "research" | "study";

export interface CareerEntry {
  id: string;
  lane: CareerLane;
  organization: string;
  title: string;
  period: Period;
  summary: string;
  /** In-page anchor with the full record. */
  href: string;
  logo?: string | undefined;
}

export interface PlacedCareerEntry extends CareerEntry {
  /** Left edge as a percentage of the axis. */
  offset: number;
  /** Length as a percentage of the axis. */
  span: number;
}

export interface CareerLine {
  id: CareerLane;
  label: string;
  entries: PlacedCareerEntry[];
  /** Stretches between entries on the same line, drawn dashed. */
  gaps: { from: number; to: number }[];
  /** Right edge of the line's last entry. */
  end: number;
}

/** A switch between lines: one entry ends the month another line's starts. */
export interface Interchange {
  id: string;
  offset: number;
  lanes: [CareerLane, CareerLane];
  at: YearMonth;
}

export interface CareerTimeline {
  lanes: CareerLine[];
  interchanges: Interchange[];
  ticks: { year: number; offset: number }[];
  now: { offset: number; value: YearMonth };
}

export const LANE_LABELS: Record<CareerLane, string> = {
  industry: "Industry",
  research: "Research",
  study: "Study",
};

/** Top to bottom on the map: industry sits between its two neighbours. */
const LANE_ORDER: CareerLane[] = ["research", "industry", "study"];

const round = (value: number) => Math.round(value * 1000) / 1000;

/** Roles whose title mentions research run on the research line. */
const laneForRole = (role: Pick<Experience, "role">): CareerLane =>
  /research/i.test(role.role) ? "research" : "industry";

export function experienceToCareerEntries(
  experience: Experience[]
): CareerEntry[] {
  return experience.map((role) => ({
    id: role.id,
    lane: laneForRole(role),
    organization: role.company,
    title: role.role,
    period: role.period,
    summary: role.companySummary,
    href: `#experience-${role.id}`,
    logo: role.logo,
  }));
}

export function educationToCareerEntries(
  education: Education[]
): CareerEntry[] {
  return education.map((degree) => ({
    id: degree.id,
    lane: "study",
    organization: degree.school,
    title: degree.degree,
    period: degree.period,
    summary: degree.focus,
    href: `#education-${degree.id}`,
    logo: degree.logo,
  }));
}

/**
 * Projects career entries onto a shared time axis (whole calendar years,
 * from January of the earliest start to the January after `now`), and works
 * out the gaps and interchanges a line map needs. Pure and deterministic.
 */
export function buildCareerTimeline(
  entries: CareerEntry[],
  now: YearMonth
): CareerTimeline {
  if (entries.length === 0) {
    return {
      lanes: [],
      interchanges: [],
      ticks: [],
      now: { offset: 100, value: now },
    };
  }

  const firstYear = Math.min(
    ...entries.map((entry) => parseYearMonth(entry.period.start).year)
  );
  const lastYear = parseYearMonth(now).year + 1;
  const axisStart = firstYear * 12;
  const axisLength = lastYear * 12 - axisStart;
  const toOffset = (index: number) =>
    round(((index - axisStart) / axisLength) * 100);

  const place = (entry: CareerEntry): PlacedCareerEntry => {
    const start = monthIndex(entry.period.start);
    const end = monthIndex(entry.period.end ?? now) + 1; // inclusive month
    return {
      ...entry,
      offset: toOffset(start),
      span: round(((end - start) / axisLength) * 100),
    };
  };

  const lanes = LANE_ORDER.map((lane): CareerLine => {
    const placed = entries
      .filter((entry) => entry.lane === lane)
      .map(place)
      .sort((a, b) => a.offset - b.offset);
    const gaps = placed.slice(1).flatMap((entry, index) => {
      const previous = placed[index];
      if (!previous) return [];
      const from = round(previous.offset + previous.span);
      return entry.offset > from ? [{ from, to: entry.offset }] : [];
    });
    const end = Math.max(0, ...placed.map((e) => round(e.offset + e.span)));
    return { id: lane, label: LANE_LABELS[lane], entries: placed, gaps, end };
  }).filter((lane) => lane.entries.length > 0);

  const interchanges = entries.flatMap((to) =>
    entries
      .filter(
        (from) =>
          from.lane !== to.lane &&
          from.period.end !== undefined &&
          from.period.end === to.period.start
      )
      .map(
        (from): Interchange => ({
          id: `${from.id}-${to.id}`,
          offset: toOffset(monthIndex(to.period.start)),
          lanes: [from.lane, to.lane],
          at: to.period.start,
        })
      )
  );

  const ticks = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => ({
    year: firstYear + i,
    offset: toOffset((firstYear + i) * 12),
  }));

  return {
    lanes,
    interchanges,
    ticks,
    now: { offset: toOffset(monthIndex(now) + 1), value: now },
  };
}

/** The entry that started most recently: a sensible default selection. */
export function latestEntry(
  timeline: CareerTimeline
): PlacedCareerEntry | undefined {
  return timeline.lanes
    .flatMap((lane) => lane.entries)
    .reduce<
      PlacedCareerEntry | undefined
    >((latest, entry) => (!latest || monthIndex(entry.period.start) > monthIndex(latest.period.start) ? entry : latest), undefined);
}

/** One stop on the route strip: a role or a degree, in a common shape. */
export interface RouteStop {
  id: string;
  /** Element id, kept stable for deep links (`#experience-…`, `#education-…`). */
  anchor: string;
  kind: "role" | "degree";
  lane: CareerLane;
  organization: string;
  url?: string | undefined;
  logo?: string | undefined;
  title: string;
  period: Period;
  description: string;
  note?: string | undefined;
  tags: string[];
  tagsLabel: string;
}

/** Roles and degrees on one route, newest first. */
export function buildRouteStops(
  experience: Experience[],
  education: Education[]
): RouteStop[] {
  const roles = experience.map(
    (role): RouteStop => ({
      id: role.id,
      anchor: `experience-${role.id}`,
      kind: "role",
      lane: laneForRole(role),
      organization: role.company,
      url: role.url,
      logo: role.logo,
      title: role.role,
      period: role.period,
      description: role.description,
      note: role.companySummary,
      tags: role.skills,
      tagsLabel: `Skills used at ${role.company}`,
    })
  );
  const degrees = education.map(
    (degree): RouteStop => ({
      id: degree.id,
      anchor: `education-${degree.id}`,
      kind: "degree",
      lane: "study",
      organization: degree.school,
      url: degree.url,
      logo: degree.logo,
      title: degree.degree,
      period: degree.period,
      description: `${degree.focus}.`,
      note: degree.thesis ? `Thesis: ${degree.thesis}` : undefined,
      tags: degree.coursework,
      tagsLabel: `Coursework at ${degree.school}`,
    })
  );

  const endIndex = (period: Period) =>
    period.end ? monthIndex(period.end) : Number.MAX_SAFE_INTEGER;
  return [...roles, ...degrees].sort(
    (a, b) =>
      monthIndex(b.period.start) - monthIndex(a.period.start) ||
      endIndex(b.period) - endIndex(a.period)
  );
}
