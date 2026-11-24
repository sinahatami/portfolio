import type { Repo } from "@/domain/github";
import type { Project, ProjectDomain } from "@/domain/portfolio";

export const PROJECT_DOMAIN_LABELS: Record<ProjectDomain, string> = {
  web: "Web",
  ml: "Machine learning",
  data: "Data & signals",
  systems: "Systems & XR",
};

export type ProjectFilter = ProjectDomain | "all";

export interface ProjectFilterOption {
  value: ProjectFilter;
  label: string;
  count: number;
}

export function filterProjects(
  projects: Project[],
  filter: ProjectFilter
): Project[] {
  if (filter === "all") return projects;
  return projects.filter((project) => project.domains.includes(filter));
}

/** Filter options with counts; domains without projects are omitted. */
export function projectFilterOptions(
  projects: Project[]
): ProjectFilterOption[] {
  const domains = Object.keys(PROJECT_DOMAIN_LABELS) as ProjectDomain[];
  return [
    { value: "all" as const, label: "All", count: projects.length },
    ...domains.map((domain) => ({
      value: domain,
      label: PROJECT_DOMAIN_LABELS[domain],
      count: filterProjects(projects, domain).length,
    })),
  ].filter((option) => option.count > 0);
}

/** Live repository data shown next to a project. */
export interface RepoActivity {
  language: string | null;
  updatedAt: string;
}

export interface ProjectWithActivity extends Project {
  activity?: RepoActivity | undefined;
}

/** `https://github.com/owner/Name/` → `owner/name`; null for other hosts. */
export function repoKey(url: string): string | null {
  const match = /^https?:\/\/(?:www\.)?github\.com\/([^/]+)\/([^/#?]+)/i.exec(
    url
  );
  return match ? `${match[1]}/${match[2]}`.toLowerCase() : null;
}

/**
 * Joins curated projects with live GitHub data by repository URL, so the
 * project list doubles as the open-source list.
 */
export function attachRepoActivity(
  projects: Project[],
  repos: Repo[]
): ProjectWithActivity[] {
  const byKey = new Map(repos.map((repo) => [repoKey(repo.url), repo]));
  return projects.map((project) => {
    const repo = byKey.get(repoKey(project.sourceUrl));
    return repo
      ? {
          ...project,
          activity: { language: repo.language, updatedAt: repo.updatedAt },
        }
      : project;
  });
}

/** Repositories that no curated project points to. */
export function unfeaturedRepos(projects: Project[], repos: Repo[]): Repo[] {
  const featured = new Set(projects.map((p) => repoKey(p.sourceUrl)));
  return repos.filter((repo) => !featured.has(repoKey(repo.url)));
}
