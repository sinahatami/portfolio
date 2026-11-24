import {
  attachRepoActivity,
  filterProjects,
  projectFilterOptions,
  repoKey,
  unfeaturedRepos,
} from "@/lib/projects";
import type { Repo } from "@/domain/github";
import type { Project } from "@/domain/portfolio";

const projects = [
  { id: "a", domains: ["web"] },
  { id: "b", domains: ["web", "ml"] },
  { id: "c", domains: ["ml"] },
] as Project[];

describe("project filters", () => {
  it("filters by domain, including multi-domain projects", () => {
    expect(filterProjects(projects, "web").map((p) => p.id)).toEqual([
      "a",
      "b",
    ]);
    expect(filterProjects(projects, "all")).toHaveLength(3);
  });

  it("lists only domains that have projects, with counts", () => {
    expect(projectFilterOptions(projects)).toEqual([
      { value: "all", label: "All", count: 3 },
      { value: "web", label: "Web", count: 2 },
      { value: "ml", label: "Machine learning", count: 2 },
    ]);
  });
});

describe("GitHub repository matching", () => {
  const repo = (name: string, updatedAt = "2026-06-21T10:00:00Z"): Repo => ({
    name,
    description: null,
    url: `https://github.com/octo/${name}`,
    language: "Python",
    stars: 0,
    forks: 0,
    topics: [],
    updatedAt,
    isFork: false,
  });
  const featured = [
    { id: "radar", sourceUrl: "https://github.com/Octo/ChangeRadar/" },
    { id: "site", sourceUrl: "https://gitlab.com/octo/site" },
  ] as Project[];

  it("normalises GitHub URLs into owner/name keys", () => {
    expect(repoKey("https://www.github.com/Octo/ChangeRadar/tree/main")).toBe(
      "octo/changeradar"
    );
    expect(repoKey("https://gitlab.com/octo/site")).toBeNull();
  });

  it("attaches language and last update to matching projects", () => {
    const [radar, site] = attachRepoActivity(featured, [repo("changeradar")]);
    expect(radar?.activity).toEqual({
      language: "Python",
      updatedAt: "2026-06-21T10:00:00Z",
    });
    expect(site?.activity).toBeUndefined();
  });

  it("lists repositories that no project features", () => {
    expect(
      unfeaturedRepos(featured, [repo("changeradar"), repo("notes")]).map(
        (r) => r.name
      )
    ).toEqual(["notes"]);
  });
});
