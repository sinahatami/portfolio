import { Github, Star, GitBranch, GitCommit } from "@/lib/icons";

interface GitHubStats {
  followers: number;
  following: number;
  public_repos: number;
  total_stars: number;
}

export const GitHubStatsGrid = ({ stats }: { stats: GitHubStats | null }) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div
        className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both rounded-xl border bg-gradient-to-br from-blue-500/10 to-blue-600/5 p-6 duration-500"
        style={{ animationDelay: "100ms" }}
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
      </div>

      <div
        className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both rounded-xl border bg-gradient-to-br from-amber-500/10 to-amber-600/5 p-6 duration-500"
        style={{ animationDelay: "200ms" }}
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
      </div>

      <div
        className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both rounded-xl border bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 p-6 duration-500"
        style={{ animationDelay: "300ms" }}
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
      </div>

      <div
        className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both rounded-xl border bg-gradient-to-br from-purple-500/10 to-purple-600/5 p-6 duration-500"
        style={{ animationDelay: "400ms" }}
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
      </div>
    </div>
  );
};
