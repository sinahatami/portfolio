import { TextLink } from "@/components/atoms";
import { ExpandableText } from "@/components/molecules";
import type { Recommendation } from "@/domain/portfolio";

interface RecommendationListProps {
  recommendations: Recommendation[];
}

/** The letters' key lines, set as quotes, with the full text on demand. */
export function RecommendationList({
  recommendations,
}: RecommendationListProps) {
  return (
    <ul className="border-foreground grid gap-x-12 gap-y-12 border-t-2 pt-7 lg:grid-cols-3">
      {recommendations.map((item) => (
        <li
          key={item.id}
          id={`reference-${item.id}`}
          className="target:animate-mark -mx-3 flex flex-col rounded-md px-3 py-2"
        >
          <figure className="flex-1">
            <blockquote className="text-[1.375rem] leading-[1.3] font-medium tracking-[-0.015em] text-balance md:text-2xl md:leading-[1.28]">
              <p className="-indent-[0.4em]">“{item.highlight}”</p>
            </blockquote>
            <figcaption className="mt-5 text-[0.9375rem]">
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
              <span className="text-muted-foreground">
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
                className="font-medium"
              >
                PDF
              </TextLink>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
