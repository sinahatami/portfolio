import { TextLink } from "@/components/atoms";
import { ExpandableText } from "@/components/molecules";
import type { Recommendation } from "@/domain/portfolio";
import { cn } from "@/lib/utils";

/* Each letter takes a line colour, in map order. */
const ACCENTS = [
  { bar: "bg-lane-industry", mark: "text-lane-industry" },
  { bar: "bg-lane-research", mark: "text-lane-research" },
  { bar: "bg-lane-study", mark: "text-lane-study" },
] as const;

interface RecommendationListProps {
  recommendations: Recommendation[];
}

export function RecommendationList({
  recommendations,
}: RecommendationListProps) {
  return (
    <ul className="grid gap-6 lg:grid-cols-3">
      {recommendations.map((item, index) => {
        const accent = ACCENTS[index % ACCENTS.length] ?? ACCENTS[0];
        return (
          <li
            key={item.id}
            className="bg-ticket ticket-shadow relative flex flex-col overflow-hidden rounded-lg px-6 pt-8 pb-6"
          >
            <span
              aria-hidden
              className={cn("absolute inset-x-0 top-0 h-2", accent.bar)}
            />
            <figure className="flex-1">
              <span
                aria-hidden
                className={cn(
                  "type-display block h-10 text-7xl leading-none font-extrabold",
                  accent.mark
                )}
              >
                “
              </span>
              <blockquote className="mt-1 text-xl leading-snug font-medium text-balance">
                <p>{item.highlight}</p>
              </blockquote>
              <figcaption className="border-border mt-6 border-t pt-4">
                <span className="block font-semibold">
                  {item.authorUrl ? (
                    <TextLink
                      href={item.authorUrl}
                      tone="quiet"
                      showExternalIcon={false}
                    >
                      {item.author}
                    </TextLink>
                  ) : (
                    item.author
                  )}
                </span>
                <span className="text-muted-foreground text-sm">
                  {item.role},{" "}
                  {item.organizationUrl ? (
                    <TextLink
                      href={item.organizationUrl}
                      tone="quiet"
                      showExternalIcon={false}
                      className="text-muted-foreground"
                    >
                      {item.organization}
                    </TextLink>
                  ) : (
                    item.organization
                  )}
                </span>
              </figcaption>
            </figure>
            <div className="mt-4 flex flex-wrap items-start gap-x-5 gap-y-2 text-sm">
              <ExpandableText
                text={item.letter}
                expandLabel="Read the letter"
                collapseLabel="Hide the letter"
              />
              {item.letterUrl ? (
                <TextLink
                  href={item.letterUrl}
                  aria-label={`Letter from ${item.author} as PDF`}
                >
                  PDF
                </TextLink>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
