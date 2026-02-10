import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Make sure it's dynamic

const GITHUB_USERNAME = "sinahatami";

export async function GET(_request: NextRequest) {
  const GITHUB_TOKEN = process.env["GITHUB_TOKEN"];

  if (!GITHUB_TOKEN) {
    return NextResponse.json(
      { error: "GitHub token not configured" },
      { status: 500 }
    );
  }

  try {
    const headers = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    };

    // Fetch user data
    const userResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      { headers }
    );

    if (!userResponse.ok) throw new Error("Failed to fetch user");
    const user = await userResponse.json();

    // Fetch repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      { headers }
    );

    if (!reposResponse.ok) throw new Error("Failed to fetch repos");
    const repos = await reposResponse.json();

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

    // Try to get commits from a specific repo
    let recentCommits = 0;
    if (sortedRepos.length > 0) {
      try {
        const commitsResponse = await fetch(
          `https://api.github.com/repos/${GITHUB_USERNAME}/${sortedRepos[0].name}/commits?per_page=100`,
          { headers }
        );

        if (commitsResponse.ok) {
          const commits = await commitsResponse.json();
          recentCommits = Array.isArray(commits) ? commits.length : 0;
        }
      } catch (error) {
        console.log("Could not fetch commits, using fallback");
        recentCommits = 847; // Fallback value
      }
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
