import type { Period, YearMonth } from "@/domain/portfolio";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export interface ParsedYearMonth {
  year: number;
  /** 1–12 */
  month: number;
}

export function parseYearMonth(value: YearMonth): ParsedYearMonth {
  const [yearPart, monthPart] = value.split("-");
  const year = Number(yearPart);
  const month = Number(monthPart);

  if (!Number.isInteger(year) || !Number.isInteger(month)) {
    throw new Error(`Invalid year-month "${value}"`);
  }
  if (month < 1 || month > 12) {
    throw new Error(`Month out of range in "${value}"`);
  }
  return { year, month };
}

export function toYearMonth(date: Date): YearMonth {
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${date.getUTCFullYear()}-${month}` as YearMonth;
}

/** Months elapsed since year 0 — a linear scale for arithmetic. */
export function monthIndex(value: YearMonth): number {
  const { year, month } = parseYearMonth(value);
  return year * 12 + (month - 1);
}

export function formatYearMonth(value: YearMonth): string {
  const { year, month } = parseYearMonth(value);
  return `${MONTHS[month - 1]} ${year}`;
}

export function formatPeriod(period: Period): string {
  const end = period.end ? formatYearMonth(period.end) : "Present";
  return `${formatYearMonth(period.start)} – ${end}`;
}

/** Inclusive number of months covered by a period. */
export function periodMonths(period: Period, now: YearMonth): number {
  const end = period.end ?? now;
  return Math.max(1, monthIndex(end) - monthIndex(period.start) + 1);
}

export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  if (rest > 0) parts.push(`${rest} ${rest === 1 ? "mo" : "mos"}`);
  return parts.join(" ");
}

export function formatIsoDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
