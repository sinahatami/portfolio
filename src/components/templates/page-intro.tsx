import type { ReactNode } from "react";
import { Container } from "@/components/atoms";
import { cn } from "@/lib/utils";

interface PageIntroProps {
  title: string;
  description?: ReactNode;
  className?: string;
}

/**
 * The top of a standalone page: one large heavy title and what the page
 * holds. Pages follow it with their own rule-led content.
 */
export function PageIntro({ title, description, className }: PageIntroProps) {
  return (
    <Container className={cn("pt-10 md:pt-16", className)}>
      <h1 className="type-display -ml-[0.04em] text-[clamp(3.25rem,9vw,7rem)] leading-[0.9] tracking-[-0.05em] text-balance">
        {title}
      </h1>
      {description ? (
        <div className="text-muted-foreground mt-5 max-w-[52ch] text-xl leading-8">
          {description}
        </div>
      ) : null}
    </Container>
  );
}
