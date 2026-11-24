import type { ReactNode } from "react";
import { Container } from "@/components/atoms";
import { cn } from "@/lib/utils";

interface PageSectionProps {
  id: string;
  title: string;
  /** One line that says what the section holds, set beside the title. */
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Leave the section out of the printed resume. */
  hideInPrint?: boolean;
}

/**
 * Section layout used across the home page: a heavy title with its
 * description on the same baseline, then the content. Structure inside the
 * section (rules, rows, columns) belongs to the content, not the frame.
 */
export function PageSection({
  id,
  title,
  description,
  children,
  className,
  hideInPrint = false,
}: PageSectionProps) {
  const titleId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn("pt-24 md:pt-32", className)}
      {...(hideInPrint ? { "data-print": "hide" } : {})}
    >
      <Container>
        <header className="mb-7 flex flex-wrap items-baseline gap-x-5 gap-y-2 md:mb-9">
          <h2
            id={titleId}
            className="type-display text-[2.5rem] leading-none md:text-[3.25rem]"
          >
            {title}
          </h2>
          {description ? (
            <p className="text-muted-foreground text-lg">{description}</p>
          ) : null}
        </header>
        {children}
      </Container>
    </section>
  );
}
