import type { GitHubActivity, LanguageShare, Repo } from "@/domain/github";
import type { GitHubClient } from "./github-client";

/** Share of repositories per primary language, largest first. */
export function summarizeLanguages(
  repos: Pick<Repo, "language">[],
  limit = 5
): LanguageShare[] {
  const counts = new Map<string, number>();
  for (const { language } of repos) {
    if (language) counts.set(language, (counts.get(language) ?? 0) + 1);
  }

  const total = [...counts.values()].reduce((sum, count) => sum + count, 0);
  if (total === 0) return [];

  return [...counts.entries()]
    .map(([name, count]) => ({
      name,
      repos: count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.repos - a.repos || a.name.localeCompare(b.name))
    .slice(0, limit);
}

/**
 * Original repositories, newest first: forks and the profile README
 * repository (named after the account) are left out.
 */
export function selectOriginalRepos(repos: Repo[], login?: string): Repo[] {
  return repos
    .filter(
      (repo) => !repo.isFork && repo.name.toLowerCase() !== login?.toLowerCase()
    )
    .toSorted(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
}

interface Logger {
  error(message: string, error?: unknown): void;
}

/**
 * Use case: build the "open source" summary. Depends on the `GitHubClient`
 * abstraction (DIP), so tests pass an in-memory fake and production passes
 * the REST adapter.
 */
export class GitHubActivityService {
  constructor(
    private readonly client: GitHubClient,
    private readonly options: { logger?: Logger } = {}
  ) {}

  async getActivity(): Promise<GitHubActivity | null> {
    try {
      const [profile, repos] = await Promise.all([
        this.client.getProfile(),
        this.client.listRepos(),
      ]);
      const originals = selectOriginalRepos(repos, profile.login);

      return {
        profile,
        languages: summarizeLanguages(originals),
        repos: originals,
      };
    } catch (error) {
      (this.options.logger ?? console).error(
        "Could not load GitHub activity",
        error
      );
      return null;
    }
  }
}
