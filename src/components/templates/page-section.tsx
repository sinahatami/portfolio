import type { ReactNode } from "react";
import { Container } from "@/components/atoms";
import { cn } from "@/lib/utils";

export type SectionLine = "industry" | "research" | "study" | "signal";

const LINE_COLOR: Record<SectionLine, string> = {
  industry: "bg-lane-industry",
  research: "bg-lane-research",
  study: "bg-lane-study",
  signal: "bg-signal",
};

interface PageSectionProps {
  id: string;
  title: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  /**
   * "band" sets the section on a quiet tinted band; "board" on the deep blue
   * night map.
   */
  tone?: "default" | "band" | "board";
  /** Colour of the line the heading sits on. */
  line?: SectionLine;
  /** Leave the section out of the printed resume. */
  hideInPrint?: boolean;
}

const TONE: Record<NonNullable<PageSectionProps["tone"]>, string> = {
  default: "pt-20 md:pt-28",
  band: "bg-band mt-20 py-20 md:mt-28 md:py-28",
  board: "board board-map py-20 md:py-28",
};

/**
 * Section layout used across the home page. The heading is a station sign:
 * the title, then a line in the section's colour that runs to the edge and
 * ends in a terminus bar.
 */
export function PageSection({
  id,
  title,
  description,
  children,
  className,
  tone = "default",
  line = "industry",
  hideInPrint = false,
}: PageSectionProps) {
  const titleId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn(TONE[tone], className)}
      {...(hideInPrint ? { "data-print": "hide" } : {})}
    >
      <Container>
        <header className="mb-10 md:mb-12">
          <div className="flex items-center gap-4 md:gap-5">
            <h2
              id={titleId}
              className="type-display shrink-0 text-[2.75rem] leading-none font-extrabold tracking-[-0.015em] md:text-6xl"
            >
              {title}
            </h2>
            <span
              aria-hidden
              data-print="hide"
              className={cn(
                "relative h-2 min-w-12 flex-1 rounded-l-full md:h-2.5",
                LINE_COLOR[line]
              )}
            >
              <span className="border-foreground bg-background absolute top-1/2 left-0 size-5 -translate-y-1/2 rounded-full border-4 md:size-6" />
              <span
                className={cn(
                  "absolute top-1/2 right-0 h-6 w-2 -translate-y-1/2 rounded-sm md:h-7 md:w-2.5",
                  LINE_COLOR[line]
                )}
              />
            </span>
          </div>
          {description ? (
            <p className="text-muted-foreground mt-3 text-lg">{description}</p>
          ) : null}
        </header>
        {children}
      </Container>
    </section>
  );
}
