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

/** A skill with how many roles and projects used it. */
export interface RankedSkill extends SkillWithUsage {
  count: number;
}

/**
 * Flattens the groups into one list ranked by evidence: most-used first,
 * ties alphabetical. A skill listed in several groups appears once, under
 * its first spelling. Skills with no evidence are returned by name.
 */
export function rankSkills(groups: SkillGroupWithUsage[]): {
  used: RankedSkill[];
  unused: string[];
} {
  const seen = new Set<string>();
  const unique = groups
    .flatMap((group) => group.skills)
    .filter((skill) => {
      const key = normalizeSkill(skill.name);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((skill) => ({
      ...skill,
      count: skill.usage.roles.length + skill.usage.projects.length,
    }));

  return {
    used: unique
      .filter((skill) => skill.count > 0)
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
    unused: unique.filter((skill) => skill.count === 0).map((s) => s.name),
  };
}

/** "Wildfire Risk Prediction (Master's Thesis)" → "Wildfire Risk Prediction". */
export function shortTitle(title: string): string {
  return title
    .replace(/\s*\(.*\)\s*$/, "")
    .replace(/:.*$/, "")
    .trim();
}

export interface EvidenceColumn {
  id: string;
  label: string;
  /** Full name when `label` is shortened. */
  title: string;
}

/**
 * The matrix columns: every role and project that used at least one of the
 * skills, in the order the content lists them.
 */
export function evidenceColumns(
  skills: SkillWithUsage[],
  sources: { experience: Experience[]; projects: Project[] }
): { roles: EvidenceColumn[]; projects: EvidenceColumn[] } {
  const roleIds = new Set(
    skills.flatMap((skill) => skill.usage.roles.map((role) => role.id))
  );
  const projectIds = new Set(
    skills.flatMap((skill) => skill.usage.projects.map((p) => p.id))
  );
  return {
    roles: sources.experience
      .filter((role) => roleIds.has(role.id))
      .map((role) => ({
        id: role.id,
        label: role.company,
        title: role.company,
      })),
    projects: sources.projects
      .filter((project) => projectIds.has(project.id))
      .map((project) => ({
        id: project.id,
        label: shortTitle(project.title),
        title: project.title,
      })),
  };
}
