import {
  buildCareerTimeline,
  buildRouteStops,
  experienceToCareerEntries,
  latestEntry,
  type CareerEntry,
} from "@/lib/career";
import { EDUCATION } from "@/content/education";
import { EXPERIENCE } from "@/content/experience";

const entry = (overrides: Partial<CareerEntry>): CareerEntry => ({
  id: "x",
  lane: "industry",
  organization: "Org",
  title: "Role",
  period: { start: "2020-01", end: "2020-12" },
  summary: "",
  href: "#x",
  ...overrides,
});

describe("buildCareerTimeline", () => {
  const timeline = buildCareerTimeline(
    [
      entry({ id: "a", period: { start: "2020-01", end: "2020-12" } }),
      entry({ id: "b", lane: "study", period: { start: "2021-01" } }),
    ],
    "2021-12"
  );

  it("spans whole years from the first start to the year after now", () => {
    expect(timeline.ticks.map((tick) => tick.year)).toEqual([2020, 2021, 2022]);
    expect(timeline.ticks[0]?.offset).toBe(0);
    expect(timeline.ticks[2]?.offset).toBe(100);
  });

  it("positions entries proportionally, treating open periods as ongoing", () => {
    const [industry, study] = timeline.lanes;
    expect(industry?.entries[0]).toMatchObject({ offset: 0, span: 50 });
    expect(study?.entries[0]).toMatchObject({ offset: 50, span: 50 });
    expect(industry?.end).toBe(50);
    expect(timeline.now.offset).toBe(100);
  });

  it("orders lines research, industry, study and omits empty ones", () => {
    const all = buildCareerTimeline(
      [
        entry({ id: "s", lane: "study" }),
        entry({ id: "i", lane: "industry" }),
        entry({ id: "r", lane: "research" }),
      ],
      "2020-12"
    );
    expect(all.lanes.map((lane) => lane.id)).toEqual([
      "research",
      "industry",
      "study",
    ]);
    expect(timeline.lanes.map((lane) => lane.id)).toEqual([
      "industry",
      "study",
    ]);
  });

  it("finds gaps on a line and interchanges between lines", () => {
    const map = buildCareerTimeline(
      [
        entry({ id: "job1", period: { start: "2020-01", end: "2020-06" } }),
        entry({ id: "job2", period: { start: "2021-01", end: "2021-06" } }),
        entry({
          id: "msc",
          lane: "study",
          period: { start: "2020-06", end: "2020-12" },
        }),
      ],
      "2021-12"
    );
    const industry = map.lanes.find((lane) => lane.id === "industry");
    expect(industry?.gaps).toEqual([{ from: 25, to: 50 }]);
    expect(map.interchanges).toEqual([
      {
        id: "job1-msc",
        offset: map.lanes[1]?.entries[0]?.offset,
        lanes: ["industry", "study"],
        at: "2020-06",
      },
    ]);
  });

  it("defaults the selection to the most recently started entry", () => {
    expect(latestEntry(timeline)?.id).toBe("b");
  });
});

describe("experienceToCareerEntries", () => {
  it("routes research roles to the research line", () => {
    const lanes = Object.fromEntries(
      experienceToCareerEntries(EXPERIENCE).map((e) => [e.id, e.lane])
    );
    expect(lanes["happi-lab"]).toBe("research");
    expect(lanes["bpt-soft"]).toBe("industry");
  });
});

describe("buildRouteStops", () => {
  const stops = buildRouteStops(EXPERIENCE, EDUCATION);

  it("merges roles and degrees newest first with stable anchors", () => {
    expect(stops.map((stop) => stop.anchor)).toEqual([
      "experience-happi-lab",
      "experience-widecons",
      "education-unige",
      "experience-iran-eit",
      "experience-bpt-soft",
      "education-bzte",
    ]);
  });

  it("describes degrees with their focus and thesis", () => {
    const unige = stops.find((stop) => stop.id === "unige");
    expect(unige).toMatchObject({ kind: "degree", lane: "study" });
    expect(unige?.note).toMatch(/^Thesis: /);
  });
});
