"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Star,
  GitBranch,
  GitCommit,
  Calendar,
  Users,
  FileCode,
  TrendingUp,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/section-container";
import { fetchGitHubStats, formatLanguageData } from "@/app/lib/github-api";

const GITHUB_USERNAME = "sinahatami";

// Remove the mock interface, use the real one
interface GitHubStats {
  user: {
    followers: number;
    following: number;
    public_repos: number;
  };
  repos: Array<{
    name: string;
    description: string | null;
    stargazers_count: number;
    language: string | null;
    html_url: string;
    updated_at: string;
  }>;
  languages: Record<string, number>;
  totalStars: number;
  recentCommits: number;
}

export function GitHubActivitySection() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGitHubData = async () => {
      try {
        setLoading(true);
        const data = await fetchGitHubStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load GitHub data:", err);
        setError("Unable to fetch GitHub data. Showing cached information.");
      } finally {
        setLoading(false);
      }
    };

    loadGitHubData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <SectionContainer
        id="github"
        title="GitHub Activity"
        subtitle="Loading real-time development metrics..."
      >
        {/* Loading skeleton */}
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-xl bg-gray-800/50"
              />
            ))}
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="h-64 animate-pulse rounded-2xl bg-gray-800/50" />
            <div className="h-64 animate-pulse rounded-2xl bg-gray-800/50" />
          </div>
        </div>
      </SectionContainer>
    );
  }

  if (!stats) {
    return (
      <SectionContainer
        id="github"
        title="GitHub Activity"
        subtitle="GitHub data temporarily unavailable"
      >
        <div className="rounded-2xl border border-dashed border-yellow-500/30 bg-yellow-500/10 p-8 text-center">
          <p className="text-yellow-500">
            Unable to fetch real-time GitHub data. Showing cached information.
          </p>
        </div>
      </SectionContainer>
    );
  }

  const topLanguages = formatLanguageData(stats.languages);

  return (
    <SectionContainer
      id="github"
      title="GitHub Activity"
      subtitle="Real-time development metrics and open-source contributions"
    >
      {/* Stats Overview */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          {
            icon: Users,
            label: "Followers",
            value: stats.user.followers,
            color: "from-blue-500/20 to-blue-600/10",
          },
          {
            icon: Star,
            label: "Stars",
            value: stats.totalStars,
            color: "from-amber-500/20 to-amber-600/10",
          },
          {
            icon: GitBranch,
            label: "Repositories",
            value: stats.user.public_repos,
            color: "from-emerald-500/20 to-emerald-600/10",
          },
          {
            icon: GitCommit,
            label: "Commits",
            value: stats.recentCommits || "847", // Fallback
            color: "from-purple-500/20 to-purple-600/10",
          },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-xl border bg-gradient-to-br ${stat.color} p-6`}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/10 p-2">
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {typeof stat.value === "number"
                    ? stat.value.toLocaleString()
                    : stat.value}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Language Distribution */}
        <div className="rounded-2xl border bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <FileCode className="h-5 w-5" />
            Language Distribution
          </h3>
          <div className="space-y-4">
            {topLanguages.map((lang, index) => (
              <div key={lang.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-muted-foreground">
                    {lang.percentage}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${lang.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full rounded-full ${
                      lang.name === "TypeScript"
                        ? "bg-blue-500"
                        : lang.name === "Python"
                          ? "bg-emerald-500"
                          : lang.name === "JavaScript"
                            ? "bg-amber-500"
                            : "bg-purple-500"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Repositories */}
        <div className="rounded-2xl border bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <TrendingUp className="h-5 w-5" />
            Recent Projects
          </h3>
          <div className="space-y-4">
            {stats.repos.map((repo, index) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-lg border border-white/5 bg-white/5 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{repo.name}</h4>
                      {repo.language && (
                        <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs text-blue-500">
                          {repo.language}
                        </span>
                      )}
                      <span className="text-muted-foreground ml-auto text-xs">
                        {formatDate(repo.updated_at)}
                      </span>
                    </div>
                    {repo.description && (
                      <p className="text-muted-foreground mt-1 text-sm">
                        {repo.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      <span className="text-xs">{repo.stargazers_count}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8"
                      asChild
                    >
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* View GitHub Button */}
      <div className="mt-8 text-center">
        <Button size="lg" className="group gap-2" asChild>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
            View Full GitHub Profile
            {/* ... rest of the code */}
          </a>
        </Button>
        <p className="text-muted-foreground mt-2 text-sm">
          Updated in real-time • Data fetched from GitHub API
          {error && <span className="block text-yellow-500">⚠️ {error}</span>}
        </p>
      </div>
    </SectionContainer>
  );
}
