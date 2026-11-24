import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CareerTable } from "@/components/organisms/career-table";
import { Hero } from "@/components/organisms/hero";
import { SkillsExplorer } from "@/components/organisms/skills-explorer";
import { EDUCATION } from "@/content/education";
import { EXPERIENCE } from "@/content/experience";
import { PROFILE } from "@/content/profile";
import { PROJECTS } from "@/content/projects";
import { RECOMMENDATIONS } from "@/content/recommendations";
import { SKILL_GROUPS } from "@/content/skills";
import { buildRouteStops } from "@/lib/career";
import { resolveProofNotes } from "@/lib/proof";
import { evidenceColumns, rankSkills, withSkillUsage } from "@/lib/skills";

describe("Hero", () => {
  it("links each claim marker to its numbered source", () => {
    render(
      <Hero
        profile={PROFILE}
        notes={resolveProofNotes(PROFILE.proof, RECOMMENDATIONS)}
      />
    );
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      PROFILE.name
    );
    const sources = screen.getByRole("list", { name: "Sources" });
    const notes = within(sources).getAllByRole("listitem");
    expect(notes).toHaveLength(PROFILE.proof.length);

    for (const [index, note] of notes.entries()) {
      const marker = screen.getByRole("link", { name: `Note ${index + 1}` });
      expect(marker).toHaveAttribute("href", `#${note.id}`);
    }
    expect(
      within(sources).getByRole("link", { name: "Read the letter" })
    ).toHaveAttribute("href", "#reference-payam-jabbari");
  });
});

describe("CareerTable", () => {
  it("renders every role and degree under its deep-link anchor", () => {
    const { container } = render(
      <CareerTable
        stops={buildRouteStops(EXPERIENCE, EDUCATION)}
        now="2026-11"
      />
    );
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(
      EXPERIENCE.length + EDUCATION.length
    );
    expect(container.querySelector("#education-unige")).not.toBeNull();
    expect(container.querySelector("#experience-iran-eit")).not.toBeNull();
  });
});

describe("SkillsExplorer", () => {
  const sources = { experience: EXPERIENCE, projects: PROJECTS };
  const skills = rankSkills(withSkillUsage(SKILL_GROUPS, sources));
  const renderExplorer = (initialCount?: number) =>
    render(
      <SkillsExplorer
        skills={skills.used}
        unused={skills.unused}
        columns={evidenceColumns(skills.used, sources)}
        {...(initialCount ? { initialCount } : {})}
      />
    );

  it("selects the most-used skill and shows its evidence", () => {
    renderExplorer();
    const top = skills.used[0];
    expect(
      screen.getByRole("button", { name: `${top?.name}, ${top?.count} uses` })
    ).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      top?.name ?? ""
    );
  });

  it("switches the evidence to the chosen skill, with links to it", async () => {
    renderExplorer();
    const react = screen.getByRole("button", { name: /^React, \d+ uses?$/ });
    await userEvent.click(react);

    expect(react).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "React"
    );
    expect(screen.getByRole("link", { name: "Widecons" })).toHaveAttribute(
      "href",
      "#experience-widecons"
    );
  });

  it("shows the first rows, then all of them on demand", async () => {
    renderExplorer(5);
    const rowsBefore = screen.getAllByRole("button", { pressed: false });
    expect(rowsBefore.length).toBe(4);

    await userEvent.click(
      screen.getByRole("button", {
        name: `Show all ${skills.used.length} skills`,
      })
    );
    expect(
      screen.getAllByRole("button", { name: /, \d+ uses?$/ })
    ).toHaveLength(skills.used.length);
  });

  it("names skills that no role or project uses yet", () => {
    renderExplorer();
    if (skills.unused.length === 0) return;
    expect(
      screen.getByText(/not yet on a listed role or project/)
    ).toHaveTextContent(skills.unused[0] ?? "");
  });
});
