"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button, Icon } from "@/components/atoms";
import { StatusLayout } from "@/components/templates/status-layout";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <StatusLayout
      title="This page failed to load"
      description={
        <>
          Something broke while rendering it. Try again; if it keeps failing,
          the home page and the contact form still work.
          {error.digest ? (
            <span className="mt-3 block text-base">
              Error reference{" "}
              <code className="bg-muted text-foreground rounded-sm px-1.5 py-0.5 font-mono text-[0.85em]">
                {error.digest}
              </code>
            </span>
          ) : null}
        </>
      }
      actions={
        <>
          <Button size="lg" onClick={reset}>
            <Icon name="reset" />
            Try again
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/">Go to the home page</Link>
          </Button>
        </>
      }
    />
  );
}
