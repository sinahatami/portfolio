import {
  formatDuration,
  formatPeriod,
  formatYearMonth,
  monthIndex,
  parseYearMonth,
  periodMonths,
  toYearMonth,
} from "@/lib/dates";

describe("dates", () => {
  it("parses and formats year-months", () => {
    expect(parseYearMonth("2021-06")).toEqual({ year: 2021, month: 6 });
    expect(formatYearMonth("2021-06")).toBe("Jun 2021");
    expect(toYearMonth(new Date(Date.UTC(2026, 10, 23)))).toBe("2026-11");
  });

  it("rejects malformed values", () => {
    expect(() => parseYearMonth("2021-13")).toThrow(/out of range/);
    expect(() => parseYearMonth("June-2021" as never)).toThrow(/Invalid/);
  });

  it("formats open and closed periods", () => {
    expect(formatPeriod({ start: "2019-05", end: "2021-06" })).toBe(
      "May 2019 – Jun 2021"
    );
    expect(formatPeriod({ start: "2025-11" })).toBe("Nov 2025 – Present");
  });

  it("counts months inclusively, using now for ongoing periods", () => {
    expect(monthIndex("2020-01") - monthIndex("2019-12")).toBe(1);
    expect(periodMonths({ start: "2026-04", end: "2026-07" }, "2026-11")).toBe(
      4
    );
    expect(periodMonths({ start: "2026-01" }, "2026-03")).toBe(3);
  });

  it("formats durations in years and months", () => {
    expect(formatDuration(4)).toBe("4 mos");
    expect(formatDuration(12)).toBe("1 yr");
    expect(formatDuration(26)).toBe("2 yrs 2 mos");
    expect(formatDuration(13)).toBe("1 yr 1 mo");
  });
});
