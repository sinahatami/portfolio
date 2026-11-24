import { buildRouteStops, careerAxis, periodBar } from "@/lib/career";
import { EDUCATION } from "@/content/education";
import { EXPERIENCE } from "@/content/experience";

describe("careerAxis and periodBar", () => {
  const axis = careerAxis(
    [{ start: "2020-01", end: "2020-12" }, { start: "2021-01" }],
    "2021-12"
  );

  it("spans whole years from the first start to the year after now", () => {
    expect(axis).toEqual({ firstYear: 2020, start: 2020 * 12, end: 2022 * 12 });
  });

  it("places periods proportionally with inclusive months", () => {
    expect(
      periodBar({ start: "2020-01", end: "2020-12" }, axis, "2021-12")
    ).toEqual({ offset: 0, span: 50 });
    expect(
      periodBar({ start: "2021-07", end: "2021-09" }, axis, "2021-12")
    ).toEqual({ offset: 75, span: 12.5 });
  });

  it("runs open periods to now", () => {
    expect(periodBar({ start: "2021-01" }, axis, "2021-12")).toEqual({
      offset: 50,
      span: 50,
    });
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

  it("puts research roles on the research line", () => {
    const lanes = Object.fromEntries(stops.map((stop) => [stop.id, stop.lane]));
    expect(lanes["happi-lab"]).toBe("research");
    expect(lanes["bpt-soft"]).toBe("industry");
  });

  it("describes degrees with their focus and thesis", () => {
    const unige = stops.find((stop) => stop.id === "unige");
    expect(unige).toMatchObject({ kind: "degree", lane: "study" });
    expect(unige?.note).toMatch(/^Thesis: /);
  });
});
