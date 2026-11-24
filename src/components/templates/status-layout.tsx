import type { ReactNode } from "react";
import { Container } from "@/components/atoms";

interface StatusLayoutProps {
  code: string;
  title: string;
  description: ReactNode;
  actions: ReactNode;
}

/** Layout for not-found and error states. */
export function StatusLayout({
  code,
  title,
  description,
  actions,
}: StatusLayoutProps) {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-20">
      <p className="text-muted-foreground tabular text-sm">{code}</p>
      <h1 className="type-display mt-3 text-4xl md:text-5xl">{title}</h1>
      <div className="text-muted-foreground mt-4 max-w-prose text-lg">
        {description}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
    </Container>
  );
}
