import { TextLink } from "@/components/atoms";
import type { GitHubActivity, Repo } from "@/domain/github";

/** Sequential slate shades, theme-aware via CSS variables. */
const seriesColor = (index: number) => `var(--color-series-${(index % 5) + 1})`;

interface RepositorySummaryProps {
  activity: GitHubActivity | null;
  /** Repositories that aren't featured as projects above. */
  others: Repo[];
  profileUrl: string;
}

/**
 * Closes the projects section with the live GitHub picture: repository
 * count, repositories by language as one bar, and anything not listed above.
 */
export function RepositorySummary({
  activity,
  others,
  profileUrl,
}: RepositorySummaryProps) {
  const total =
    activity?.languages.reduce((sum, language) => sum + language.repos, 0) ?? 0;

  return (
    <div className="bg-muted mt-10 grid gap-x-12 gap-y-5 rounded-md px-5 py-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:px-7">
      <div className="min-w-0">
        {activity ? (
          <>
            <h3 className="type-title text-xl md:text-2xl">
              <span className="tabular">{activity.profile.publicRepos}</span>{" "}
              public repositories since {activity.profile.memberSince}
            </h3>
            {activity.languages.length > 0 ? (
              <>
                <div
                  aria-hidden
                  className="mt-4 flex h-2 max-w-xl gap-0.5 overflow-hidden rounded-full"
                >
                  {activity.languages.map((language, index) => (
                    <span
                      key={language.name}
                      style={{
                        flexGrow: language.repos,
                        backgroundColor: seriesColor(index),
                      }}
                    />
                  ))}
                </div>
                <ul
                  className="text-muted-foreground mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm"
                  aria-label={`Repositories by primary language, ${total} in all`}
                >
                  {activity.languages.map((language, index) => (
                    <li
                      key={language.name}
                      className="inline-flex items-center gap-1.5"
                    >
                      <span
                        aria-hidden
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: seriesColor(index) }}
                      />
                      {language.name}
                      <span className="tabular text-foreground font-medium">
                        {language.repos}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            {others.length > 0 ? (
              <p className="mt-4 text-sm">
                Also on GitHub:{" "}
                {others.map((repo, index) => (
                  <span key={repo.name}>
                    {index > 0 ? ", " : null}
                    <TextLink href={repo.url} showExternalIcon={false}>
                      {repo.name}
                    </TextLink>
                  </span>
                ))}
              </p>
            ) : null}
          </>
        ) : (
          <>
            <h3 className="type-title text-xl">More on GitHub</h3>
            <p className="text-muted-foreground mt-1">
              Live repository data didn&apos;t load this time. Every project
              above links to its source.
            </p>
          </>
        )}
      </div>
      <TextLink
        href={profileUrl}
        showExternalIcon={false}
        className="font-semibold"
      >
        GitHub profile
      </TextLink>
    </div>
  );
}
