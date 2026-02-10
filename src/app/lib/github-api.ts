import type { GitHubStats } from "@/types/github";

export async function fetchGitHubStats(): Promise<GitHubStats | null> {
  try {
    const isServer = typeof window === "undefined";
    const baseUrl = isServer
      ? process.env["NEXT_PUBLIC_APP_URL"] || "http://localhost:3000"
      : "";

    const response = await fetch(`${baseUrl}/api/github`, {
      next: { revalidate: 3600 }, // Cache on server for 1 hour
    });

    if (!response.ok) throw new Error(`Status: ${response.status}`);

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
