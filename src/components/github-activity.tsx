"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitBranch, GitCommit, Calendar } from "@/lib/icons";
import { Skeleton } from "@/components/ui/skeleton";

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
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-6"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/20 p-2">
              <Github className="h-5 w-5 text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats?.followers}</div>
              <div className="text-muted-foreground text-sm">Followers</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border bg-gradient-to-br from-amber-500/10 to-amber-600/5 p-6"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-amber-500/20 p-2">
              <Star className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats?.total_stars}</div>
              <div className="text-muted-foreground text-sm">Stars</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-6"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-500/20 p-2">
              <GitBranch className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats?.public_repos}</div>
              <div className="text-muted-foreground text-sm">Repositories</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl border bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-6"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-500/20 p-2">
              <GitCommit className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stats?.following}</div>
              <div className="text-muted-foreground text-sm">Following</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Calendar className="h-5 w-5" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {stats?.recent_activity.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center gap-4 rounded-lg border border-white/5 bg-white/5 p-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                <GitCommit className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="font-medium">{activity.repo}</div>
                <div className="text-muted-foreground text-sm">
                  {activity.message}
                </div>
              </div>
              <div className="text-muted-foreground text-sm">
                {activity.date}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
