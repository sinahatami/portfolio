"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui";
import { GitHubStatsGrid } from "./github-stats-grid";
import { GitHubRecentActivity } from "./github-recent-activity";

interface GitHubStats {
  followers: number;
  following: number;
  public_repos: number;
  total_stars: number;
  recent_activity: Array<{
    type: string;
    repo: string;
    date: string;
    message: string;
  }>;
}

export function GitHubActivity() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // This is a mock - you'll need to replace with real GitHub API
        const mockStats: GitHubStats = {
          followers: 87,
          following: 32,
          public_repos: 42,
          total_stars: 156,
          recent_activity: [
            {
              type: "PushEvent",
              repo: "portfolio",
              date: "2024-01-15",
              message: "Added 3D tech sphere",
            },
            {
              type: "CreateEvent",
              repo: "ai-project",
              date: "2024-01-14",
              message: "Created new ML model",
            },
            {
              type: "PushEvent",
              repo: "ecommerce",
              date: "2024-01-13",
              message: "Fixed checkout bug",
            },
            {
              type: "WatchEvent",
              repo: "nextjs",
              date: "2024-01-12",
              message: "Starred repository",
            },
          ],
        };

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setStats(mockStats);
      } catch (err) {
        setError("Failed to fetch GitHub data");
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-dashed border-red-300 bg-red-50/10 p-8 text-center dark:border-red-800 dark:bg-red-900/10">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <GitHubStatsGrid stats={stats} />
      <GitHubRecentActivity activity={stats?.recent_activity} />
    </div>
  );
}
