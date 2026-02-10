"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  FileCode,
  TrendingUp,
  Globe,
  Star,
  ChevronRight,
} from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/section-container";
import { cn } from "@/app/lib/utils";

interface GitHubActivityViewProps {
  stats: {
    user: { followers: number; public_repos: number };
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
  };
  topLanguages: Array<{ name: string; percentage: number }>;
}

export function GitHubActivityView({
  stats,
  topLanguages,
}: GitHubActivityViewProps) {
  const GITHUB_USERNAME = "sinahatami";

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // const statItems = [
  //   {
  //     icon: Users,
  //     label: "Followers",
  //     value: stats.user.followers,
  //     color: "text-blue-600 dark:text-blue-400",
  //     bg: "bg-blue-50 ring-blue-100 dark:bg-blue-500/10 dark:ring-blue-500/20",
  //   },
  //   {
  //     icon: Star,
  //     label: "Total Stars",
  //     value: stats.totalStars,
  //     color: "text-amber-600 dark:text-amber-400",
  //     bg: "bg-amber-50 ring-amber-100 dark:bg-amber-500/10 dark:ring-amber-500/20",
  //   },
  //   {
  //     icon: GitBranch,
  //     label: "Repositories",
  //     value: stats.user.public_repos,
  //     color: "text-emerald-600 dark:text-emerald-400",
  //     bg: "bg-emerald-50 ring-emerald-100 dark:bg-emerald-500/10 dark:ring-emerald-500/20",
  //   },
  //   {
  //     icon: GitCommit,
  //     label: "Recent Commits",
  //     value: stats.recentCommits,
  //     color: "text-purple-600 dark:text-purple-400",
  //     bg: "bg-purple-50 ring-purple-100 dark:bg-purple-500/10 dark:ring-purple-500/20",
  //   },
  // ];

  return (
    <SectionContainer
      id="github"
      title="GitHub Activity"
      subtitle="Real-time development metrics and open-source contributions"
    >
      {/* 1. Stats Grid */}
      {/* <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {statItems.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              "group relative rounded-2xl p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md",
              // Light: White bg, slate border
              "border border-slate-200 bg-white/60 backdrop-blur-md",
              // Dark: Slate-900 bg, white/5 border
              "dark:border-white/5 dark:bg-slate-900/50 dark:shadow-2xl dark:hover:border-white/10 dark:hover:bg-slate-800/50"
            )}
          >
            <div className="flex items-center gap-4">
              <div
                className={cn("rounded-xl p-2.5 ring-1", stat.bg, stat.color)}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                  {stat.value.toLocaleString()}
                </div>
                <div className="text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div> */}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* 2. Languages Card */}
        <div
          className={cn(
            "rounded-3xl p-8 shadow-sm backdrop-blur-xl transition-colors",
            "border border-slate-200 bg-white/50", // Light
            "dark:border-white/10 dark:bg-black/20" // Dark
          )}
        >
          <h3 className="mb-8 flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-slate-100">
            <div className="rounded-lg bg-blue-50 p-2 ring-1 ring-blue-100 dark:bg-blue-500/10 dark:ring-blue-500/20">
              <FileCode className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            Languages
          </h3>
          <div className="space-y-6">
            {topLanguages.map((lang, _index) => (
              <div key={lang.name} className="space-y-3">
                <div className="flex justify-between text-sm font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">
                    {lang.name}
                  </span>
                  <span className="font-mono text-blue-600 dark:text-blue-400">
                    {lang.percentage}%
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200/50 dark:bg-slate-800/50 dark:ring-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${lang.percentage}%` }}
                    transition={{ duration: 1.5, ease: "circOut", delay: 0.4 }}
                    className={cn(
                      "h-full rounded-full dark:shadow-[0_0_10px_rgba(59,130,246,0.5)]",
                      lang.name === "TypeScript"
                        ? "bg-blue-500"
                        : lang.name === "Python"
                          ? "bg-emerald-500"
                          : lang.name === "Jupyter Notebook"
                            ? "bg-purple-500"
                            : "bg-blue-400"
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Recent Updates Card */}
        <div
          className={cn(
            "rounded-3xl p-8 shadow-sm backdrop-blur-xl transition-colors",
            "border border-slate-200 bg-white/50", // Light
            "dark:border-white/10 dark:bg-black/20" // Dark
          )}
        >
          <h3 className="mb-8 flex items-center gap-3 text-xl font-bold text-slate-900 dark:text-slate-100">
            <div className="rounded-lg bg-emerald-50 p-2 ring-1 ring-emerald-100 dark:bg-emerald-500/10 dark:ring-emerald-500/20">
              <TrendingUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            Recent Updates
          </h3>
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {stats.repos.map((repo, _index) => (
                <motion.div
                  key={repo.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={cn(
                    "group relative rounded-2xl p-4 transition-all",
                    // Light
                    "border border-slate-100 bg-white/70 hover:border-blue-200 hover:bg-white",
                    // Dark
                    "dark:border-white/5 dark:bg-white/5 dark:hover:border-blue-500/30 dark:hover:bg-white/10"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 pr-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-600 dark:text-slate-200 dark:group-hover:text-blue-400">
                          {repo.name}
                        </h4>
                        {repo.language && (
                          <span className="rounded-md border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600 uppercase dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
                            {repo.language}
                          </span>
                        )}
                      </div>
                      <p className="line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {repo.description ||
                          "Building robust solutions and innovative architectures."}
                      </p>
                      <div className="flex items-center gap-4 pt-2 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                        <span className="flex items-center gap-1 transition-colors group-hover:text-amber-500 dark:group-hover:text-amber-400">
                          <Star className="h-3.5 w-3.5" />{" "}
                          {repo.stargazers_count}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-slate-200 dark:bg-slate-700" />
                        <span>Updated {formatDate(repo.updated_at)}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className={cn(
                        "shrink-0 rounded-xl transition-all",
                        // Light
                        "border-slate-200 hover:bg-blue-600 hover:text-white",
                        // Dark
                        "dark:border-white/10 dark:bg-transparent dark:text-slate-400 dark:hover:border-blue-500 dark:hover:bg-blue-600 dark:hover:text-white"
                      )}
                      asChild
                    >
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* 4. Action Button */}
      <div className="mt-12 flex justify-center">
        <Button
          size="lg"
          className={cn(
            "rounded-full px-10 py-6 font-bold shadow-xl transition-all hover:scale-105",
            // Light
            "bg-slate-900 text-white hover:bg-blue-600 hover:shadow-blue-200",
            // Dark
            "dark:bg-white dark:text-slate-900 dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] dark:hover:bg-blue-50 dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
          )}
          asChild
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="mr-3 h-5 w-5" />
            <span>Visit GitHub Profile</span>
            <ChevronRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
      </div>
    </SectionContainer>
  );
}
