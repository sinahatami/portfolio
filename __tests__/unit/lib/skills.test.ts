import { findSkillUsage, normalizeSkill } from "@/lib/skills";
import type { Experience, Project } from "@/domain/portfolio";

describe("normalizeSkill", () => {
  it.each([
    ["Next.js 16", "next"],
    ["Next.js", "next"],
    ["Scikit-Learn", "scikitlearn"],
    ["Tailwind CSS", "tailwind"],
    ["tailwindcss", "tailwind"],
    ["JavaScript (ES6+)", "javascript"],
    ["C#", "c#"],
    ["Angular 17", "angular"],
  ])("%s → %s", (input, expected) => {
    expect(normalizeSkill(input)).toBe(expected);
  });
});

describe("findSkillUsage", () => {
  const experience = [
    { id: "acme", company: "Acme", skills: ["React", "Next.js"] },
  ] as Experience[];
  const projects = [
    { id: "site", title: "Site", stack: ["Next.js 16", "Tailwind CSS"] },
    { id: "ml", title: "Model", stack: ["PyTorch"] },
  ] as Project[];

  it("matches across spelling variants", () => {
    expect(findSkillUsage("Next.js", { experience, projects })).toEqual({
      roles: [{ id: "acme", label: "Acme" }],
      projects: [{ id: "site", label: "Site" }],
    });
  });

  it("returns empty evidence for unused skills", () => {
    expect(findSkillUsage("Rust", { experience, projects })).toEqual({
      roles: [],
      projects: [],
    });
  });
});
