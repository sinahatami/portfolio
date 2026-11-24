import type {
  Education,
  Experience,
  Period,
  YearMonth,
} from "@/domain/portfolio";
import { monthIndex, parseYearMonth } from "./dates";

export type CareerLane = "industry" | "research" | "study";

/** Roles whose title mentions research count as research, not industry. */
const laneForRole = (role: Pick<Experience, "role">): CareerLane =>
  /research/i.test(role.role) ? "research" : "industry";

/** One row of the career record: a role or a degree, in a common shape. */
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

/** Roles and degrees in one list, newest first. */
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

/** A shared time axis in whole calendar years, as month indexes. */
export interface CareerAxis {
  firstYear: number;
  /** January of the first year. */
  start: number;
  /** January of the year after `now`. */
  end: number;
}

/** From January of the earliest start to the January after `now`. */
export function careerAxis(periods: Period[], now: YearMonth): CareerAxis {
  const nowYear = parseYearMonth(now).year;
  const firstYear = Math.min(
    nowYear,
    ...periods.map((period) => parseYearMonth(period.start).year)
  );
  return { firstYear, start: firstYear * 12, end: (nowYear + 1) * 12 };
}

const round = (value: number) => Math.round(value * 1000) / 1000;

/**
 * Where a period sits on the axis, as percentages: `offset` from the left
 * and `span` wide. Months are inclusive; an open period runs to `now`.
 */
export function periodBar(
  period: Period,
  axis: CareerAxis,
  now: YearMonth
): { offset: number; span: number } {
  const length = axis.end - axis.start;
  const start = monthIndex(period.start);
  const end = monthIndex(period.end ?? now) + 1;
  return {
    offset: round(((start - axis.start) / length) * 100),
    span: round(((end - start) / length) * 100),
  };
}
