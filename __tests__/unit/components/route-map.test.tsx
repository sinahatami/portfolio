import { fireEvent, render, screen } from "@testing-library/react";
import { RouteMap } from "@/components/organisms/route-map";
import { RouteStrip } from "@/components/organisms/route-strip";
import { buildCareerTimeline, buildRouteStops } from "@/lib/career";
import { EDUCATION } from "@/content/education";
import { EXPERIENCE } from "@/content/experience";

const timeline = buildCareerTimeline(
  [
    {
      id: "acme",
      lane: "industry",
      organization: "Acme",
      title: "Engineer",
      period: { start: "2019-01", end: "2021-06" },
      summary: "Builds rockets.",
      href: "#experience-acme",
    },
    {
      id: "uni",
      lane: "study",
      organization: "University",
      title: "MSc",
      period: { start: "2021-06", end: "2023-07" },
      summary: "Data science.",
      href: "#education-uni",
    },
  ],
  "2024-01"
);

describe("RouteMap", () => {
  it("selects the latest station by default and switches on focus", () => {
    render(<RouteMap timeline={timeline} now="2024-01" />);

    const uni = screen.getByRole("button", { name: /University, MSc/ });
    const acme = screen.getByRole("button", { name: /Acme, Engineer/ });
    expect(uni).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Data science.")).toBeInTheDocument();

    fireEvent.focus(acme);

    expect(acme).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Builds rockets.")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Read about the role" })
    ).toHaveAttribute("href", "#experience-acme");
  });

  it("selects a station from the keyboard and shows the next stop", () => {
    render(
      <RouteMap
        timeline={timeline}
        now="2024-01"
        nextStop={{ lane: "industry", label: "Open to new roles" }}
      />
    );
    const acme = screen.getByRole("button", { name: /Acme/ });
    fireEvent.keyDown(acme, { key: "Enter" });

    expect(acme).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Next stop")).toBeInTheDocument();
    expect(screen.getByText("Open to new roles")).toBeInTheDocument();
  });
});

describe("RouteStrip", () => {
  it("renders every stop under its deep-link anchor, after the next stop", () => {
    const { container } = render(
      <RouteStrip
        stops={buildRouteStops(EXPERIENCE, EDUCATION)}
        now="2026-11"
        nextStop={{
          title: "Your team",
          description: "Next stop",
          href: "#contact",
        }}
      />
    );
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings[0]).toHaveTextContent("Your team");
    expect(headings).toHaveLength(EXPERIENCE.length + EDUCATION.length + 1);
    expect(container.querySelector("#education-unige")).not.toBeNull();
    expect(container.querySelector("#experience-iran-eit")).not.toBeNull();
  });
});
