import { GitCommit, Calendar } from "@/lib/icons";

interface GitHubActivityItem {
  type: string;
  repo: string;
  date: string;
  message: string;
}

export const GitHubRecentActivity = ({
  activity,
}: {
  activity?: GitHubActivityItem[] | undefined;
}) => {
  return (
    <div className="rounded-xl border bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-6">
      <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <Calendar className="h-5 w-5" />
        Recent Activity
      </h3>
      <div className="space-y-3">
        {activity?.map((item, index) => (
          <div
            key={index}
            className="animate-in fade-in slide-in-from-right-4 fill-mode-both flex items-center gap-4 rounded-lg border border-white/5 bg-white/5 p-4 duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
              <GitCommit className="h-5 w-5 text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="font-medium">{item.repo}</div>
              <div className="text-muted-foreground text-sm">
                {item.message}
              </div>
            </div>
            <div className="text-muted-foreground text-sm">{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
