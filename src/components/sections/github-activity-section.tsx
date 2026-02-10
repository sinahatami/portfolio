import { fetchGitHubStats, formatLanguageData } from "@/app/lib/github-api";
import { GitHubActivityView } from "./github-activity-view";
import { SectionContainer } from "@/components/section-container";

export default async function GitHubActivitySection() {
  // 1. Fetch data on the server
  const stats = await fetchGitHubStats();

  // 2. Handle the error state if GitHub is down
  if (!stats) {
    return (
      <SectionContainer
        id="github"
        title="GitHub Activity"
        subtitle="Data temporarily unavailable"
      >
        <div className="rounded-2xl border border-dashed border-yellow-500/30 bg-yellow-500/10 p-8 text-center">
          <p className="text-yellow-500">
            Could not sync with GitHub. Showing offline status.
          </p>
        </div>
      </SectionContainer>
    );
  }

  const topLanguages = formatLanguageData(stats.languages);

  // 3. Pass data to the Client View for animations
  return <GitHubActivityView stats={stats} topLanguages={topLanguages} />;
}
