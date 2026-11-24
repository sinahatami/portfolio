import type { Experience, Project, SkillGroup } from "@/domain/portfolio";

/** Spellings that should be treated as the same technology. */
const ALIASES: Record<string, string> = {
  nextjs: "next",
  reactjs: "react",
  tailwindcss: "tailwind",
  tailwind: "tailwind",
  sklearn: "scikitlearn",
  scikitlearn: "scikitlearn",
  javascriptes6: "javascript",
  js: "javascript",
  ts: "typescript",
  deeplearningcnns: "deeplearning",
  yoloobjectdetection: "yolo",
};

/**
 * Normalises a technology name for comparison: case-insensitive, ignores
 * punctuation, parenthesised qualifiers and trailing version numbers.
 * `"Next.js 16"` → `"next"`, `"Scikit-Learn"` → `"scikitlearn"`.
 */
export function normalizeSkill(name: string): string {
  const key = name
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/\s+\d+(\.\d+)*\s*$/, "")
    .replace(/[^a-z0-9+#]/g, "");
  return ALIASES[key] ?? key;
}

export interface SkillUsage {
  roles: { id: string; label: string }[];
  projects: { id: string; label: string }[];
}

export interface SkillWithUsage {
  name: string;
  usage: SkillUsage;
}

export interface SkillGroupWithUsage {
  id: string;
  title: string;
  skills: SkillWithUsage[];
}

export function findSkillUsage(
  skill: string,
  sources: { experience: Experience[]; projects: Project[] }
): SkillUsage {
  const key = normalizeSkill(skill);
  const matches = (list: string[]) =>
    list.some((item) => normalizeSkill(item) === key);

  return {
    roles: sources.experience
      .filter((role) => matches(role.skills))
      .map((role) => ({ id: role.id, label: role.company })),
    projects: sources.projects
      .filter((project) => matches(project.stack))
      .map((project) => ({ id: project.id, label: project.title })),
  };
}

/** Joins each skill with the evidence of where it was used. */
export function withSkillUsage(
  groups: SkillGroup[],
  sources: { experience: Experience[]; projects: Project[] }
): SkillGroupWithUsage[] {
  return groups.map((group) => ({
    id: group.id,
    title: group.title,
    skills: group.skills.map((name) => ({
      name,
      usage: findSkillUsage(name, sources),
    })),
  }));
}
