import type { ReactNode } from "react";
import { Container } from "@/components/atoms";
import { PageIntro } from "./page-intro";

interface StatusLayoutProps {
  title: string;
  /** What happened and what to do about it. */
  description: ReactNode;
  actions: ReactNode;
  /** Optional content under the actions, e.g. places to go instead. */
  children?: ReactNode;
}

/** Layout for not-found and error states, on the standalone page grid. */
export function StatusLayout({
  title,
  description,
  actions,
  children,
}: StatusLayoutProps) {
  return (
    <>
      <PageIntro title={title} description={description} />
      <Container className="mt-8 md:mt-10">
        <div className="flex flex-wrap items-center gap-3" data-print="hide">
          {actions}
        </div>
        {children ? <div className="mt-16 md:mt-24">{children}</div> : null}
      </Container>
    </>
  );
}
