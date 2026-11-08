// src/lib/github-route-handler.ts
import {
  fetchGitHubProfile,
  fetchGitHubRepos,
  fetchGitHubCommits,
} from "@/lib/services/github";
import type { GitHubUser, GitHubRepo, GitHubStats } from "@/types/github";

const RECENT_REPO_COUNT = 4;

const processGitHubData = async (
  _user: GitHubUser,
  repos: GitHubRepo[],
  token: string
): Promise<Omit<GitHubStats, "user">> => {
  const languages: Record<string, number> = repos.reduce(
    (acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    },
    {} as Record<string, number>
  );

  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );

  const sortedRepos = repos
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
    .slice(0, RECENT_REPO_COUNT);

  let recentCommits = 0;
  if (sortedRepos.length > 0) {
    recentCommits = await fetchGitHubCommits(token, sortedRepos[0]!.name);
  }

  return {
    repos: sortedRepos.map((repo) => ({
      name: repo.name,
      description: repo.description,
      stargazers_count: repo.stargazers_count,
      language: repo.language,
      html_url: repo.html_url,
      updated_at: repo.updated_at,
      forks_count: repo.forks_count,
      topics: repo.topics,
    })),
    languages,
    totalStars,
    recentCommits,
  };
};

export const getGitHubStats = async (token: string): Promise<GitHubStats> => {
  const [user, repos] = await Promise.all([
    fetchGitHubProfile(token),
    fetchGitHubRepos(token),
  ]);

  const processedData = await processGitHubData(user, repos, token);

  return {
    user: {
      followers: user.followers,
      following: user.following,
      public_repos: user.public_repos,
      login: user.login,
      avatar_url: user.avatar_url,
    },
    ...processedData,
  };
};
