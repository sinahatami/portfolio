import { NextRequest, NextResponse } from "next/server";
import {
  fetchGitHubProfile,
  fetchGitHubRepos,
  fetchGitHubCommits,
} from "@/lib/services/github";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest) {
  const GITHUB_TOKEN = process.env["GITHUB_TOKEN"];

  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: "GitHub token not configured" },
      { status: 500 }
    );
  }

  try {
    const user = await fetchGitHubProfile(GITHUB_TOKEN);
    const repos = await fetchGitHubRepos(GITHUB_TOKEN);

    // Process data
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

    let recentCommits = 0;
    if (sortedRepos.length > 0) {
      recentCommits = await fetchGitHubCommits(
        GITHUB_TOKEN,
        sortedRepos[0].name
      );
    }

    return NextResponse.json({
      user: {
        followers: user.followers,
        following: user.following,
        public_repos: user.public_repos,
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
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
