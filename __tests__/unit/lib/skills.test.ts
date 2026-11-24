import {
  evidenceColumns,
  findSkillUsage,
  normalizeSkill,
  rankSkills,
  shortTitle,
  type SkillGroupWithUsage,
} from "@/lib/skills";
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

describe("rankSkills", () => {
  const use = (roles: number, projects: number) => ({
    roles: Array.from({ length: roles }, (_, i) => ({
      id: `r${i}`,
      label: "R",
    })),
    projects: Array.from({ length: projects }, (_, i) => ({
      id: `p${i}`,
      label: "P",
    })),
  });
  const groups: SkillGroupWithUsage[] = [
    {
      id: "a",
      title: "A",
      skills: [
        { name: "React", usage: use(1, 1) },
        { name: "Python", usage: use(2, 3) },
        { name: "HTML5", usage: use(0, 0) },
      ],
    },
    {
      id: "b",
      title: "B",
      skills: [
        { name: "python", usage: use(2, 3) },
        { name: "Keras", usage: use(1, 1) },
      ],
    },
  ];

  it("ranks by evidence, ties alphabetical, each skill once", () => {
    const { used } = rankSkills(groups);
    expect(used.map((skill) => [skill.name, skill.count])).toEqual([
      ["Python", 5],
      ["Keras", 2],
      ["React", 2],
    ]);
  });

  it("lists skills without evidence by name", () => {
    expect(rankSkills(groups).unused).toEqual(["HTML5"]);
  });
});

describe("shortTitle", () => {
  it.each([
    ["Wildfire Risk Prediction (Master's Thesis)", "Wildfire Risk Prediction"],
    [
      "High Performance Computing: CUDA, OpenMP, MPI",
      "High Performance Computing",
    ],
    ["HoldsUp", "HoldsUp"],
  ])("%s → %s", (input, expected) => {
    expect(shortTitle(input)).toBe(expected);
  });
});

describe("evidenceColumns", () => {
  it("keeps only used roles and projects, in content order", () => {
    const experience = [
      { id: "new", company: "New" },
      { id: "old", company: "Old" },
      { id: "idle", company: "Idle" },
    ] as Experience[];
    const projects = [
      { id: "x", title: "X: the sequel" },
      { id: "y", title: "Y" },
    ] as Project[];
    const columns = evidenceColumns(
      [
        {
          name: "Go",
          usage: {
            roles: [
              { id: "old", label: "Old" },
              { id: "new", label: "New" },
            ],
            projects: [{ id: "x", label: "X: the sequel" }],
          },
        },
      ],
      { experience, projects }
    );
    expect(columns.roles.map((role) => role.id)).toEqual(["new", "old"]);
    expect(columns.projects).toEqual([
      { id: "x", label: "X", title: "X: the sequel" },
    ]);
  });
});
