import { GitHubStats } from "@/types/github";

export async function fetchGitHubStats(): Promise<GitHubStats | null> {
  const GITHUB_USERNAME = "sinahatami";
  const GITHUB_TOKEN = process.env["GITHUB_TOKEN"];

  if (!GITHUB_TOKEN) {
    console.error("GITHUB_TOKEN is not set.");
    return null;
  }

  try {
    const headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    };

    // 1. Fetch User Data
    const userRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      {
        headers,
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!userRes.ok) throw new Error("Failed to fetch user");
    const user = await userRes.json();

    // 2. Fetch Repositories
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      { headers, next: { revalidate: 3600 } }
    );

    if (!reposRes.ok) throw new Error("Failed to fetch repos");
    const repos = await reposRes.json();

    // 3. Process Data (Logic moved from API route)
    const languages: Record<string, number> = {};
    repos.forEach((repo: any) => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    const totalStars = repos.reduce(
      (sum: number, repo: any) => sum + repo.stargazers_count,
      0
    );

    const sortedRepos = repos
      .sort(
        (a: any, b: any) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      )
      .slice(0, 4);

    // 4. Fetch Commits (Optional / simplified)
    let recentCommits = 0;
    if (sortedRepos.length > 0) {
      try {
        const commitsRes = await fetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${sortedRepos[0].name}/commits?per_page=1`,
          { headers, next: { revalidate: 3600 } }
        );
        // If we get headers, we can sometimes use 'Link' for total count,
        // but simplified here just to check connection:
        if (commitsRes.ok) recentCommits = 50; // Placeholder or implement full commit counting logic
      } catch (e) {
        console.warn("Commit fetch failed", e);
      }
    }

    return {
      user: {
        followers: user.followers,
        following: user.following,
        public_repos: user.public_repos,
        login: user.login,
        avatar_url: user.avatar_url || "",
      },
      repos: sortedRepos.map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
        html_url: repo.html_url,
        updated_at: repo.updated_at,
      })),
      languages,
      totalStars,
      recentCommits,
    };
  } catch (error) {
    console.error("GitHub API Error:", error);
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
