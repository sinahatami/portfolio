const GITHUB_USERNAME = "sinahatami";

interface GitHubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
  forks_count: number;
}

interface GitHubUser {
  followers: number;
  following: number;
  public_repos: number;
}

export interface GitHubStats {
  user: GitHubUser;
  repos: GitHubRepo[];
  languages: Record<string, number>;
  totalStars: number;
  recentCommits: number;
}

export async function fetchGitHubStats(): Promise<GitHubStats | null> {
  try {
    const response = await fetch("/api/github", {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return null;
  }
}

export function formatLanguageData(languages: Record<string, number>) {
  const total = Object.values(languages).reduce((sum, count) => sum + count, 0);
  if (total === 0) return [];

  return Object.entries(languages)
    .map(([name, count]) => ({
      name,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 5);
}
