import { Button, Icon, TextLink } from "@/components/atoms";
import type { GitHubActivity, Repo } from "@/domain/github";

/** Categorical series tokens, theme-aware via CSS variables. */
const seriesColor = (index: number) => `var(--color-series-${(index % 5) + 1})`;

interface RepositorySummaryProps {
  activity: GitHubActivity | null;
  /** Repositories that aren't featured as projects above. */
  others: Repo[];
  profileUrl: string;
}

/**
 * Closes the projects section with the live GitHub picture: repository count,
 * languages drawn as one segmented line, and anything not featured above.
 */
export function RepositorySummary({
  activity,
  others,
  profileUrl,
}: RepositorySummaryProps) {
  return (
    <div className="board board-map mt-12 grid gap-6 overflow-hidden rounded-lg p-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:p-8">
      <div className="min-w-0">
        {activity ? (
          <>
            <h3 className="type-title text-2xl md:text-3xl">
              <span className="tabular text-signal">
                {activity.profile.publicRepos}
              </span>{" "}
              public repositories since {activity.profile.memberSince}
            </h3>
            {activity.languages.length > 0 ? (
              <>
                {/* Languages as one line, with a station at each change */}
                <div className="mt-5 flex h-3 items-center" aria-hidden>
                  {activity.languages.map((language, index) => (
                    <span
                      key={language.name}
                      style={{
                        flexGrow: language.repos,
                        backgroundColor: seriesColor(index),
                      }}
                      className="relative h-full first:rounded-l-full last:rounded-r-full"
                    >
                      {index > 0 ? (
                        <span className="border-board-foreground bg-board absolute top-1/2 left-0 z-10 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px]" />
                      ) : null}
                    </span>
                  ))}
                </div>
                <ul
                  className="text-muted-foreground mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm"
                  aria-label="Repositories by primary language"
                >
                  {activity.languages.map((language, index) => (
                    <li
                      key={language.name}
                      className="inline-flex items-center gap-1.5"
                    >
                      <span
                        aria-hidden
                        className="size-3 rounded-full"
                        style={{ backgroundColor: seriesColor(index) }}
                      />
                      {language.name}
                      <span className="tabular">{language.repos}</span>
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
            <h3 className="type-title text-2xl">More on GitHub</h3>
            <p className="text-muted-foreground mt-1">
              Live repository data didn&apos;t load this time. Every project
              above links to its source.
            </p>
          </>
        )}
      </div>
      <Button asChild size="lg">
        <a href={profileUrl} target="_blank" rel="noopener noreferrer">
          <Icon name="github" />
          Open GitHub profile
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </Button>
    </div>
  );
}
