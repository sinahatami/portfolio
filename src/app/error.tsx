"use client";

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
      code="Error"
      title="This page failed to load"
      description="Something broke while rendering. Reload the section to try again."
      actions={
        <Button onClick={reset}>
          <Icon name="reset" />
          Try again
        </Button>
      }
    />
  );
}
