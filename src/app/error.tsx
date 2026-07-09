"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui";
import { AlertCircle, RefreshCcw } from "@/lib/icons";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service like Sentry
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="bg-destructive/10 mb-6 flex h-20 w-20 items-center justify-center rounded-full">
        <AlertCircle className="text-destructive h-10 w-10" />
      </div>
      <h2 className="mb-4 text-3xl font-bold tracking-tight">
        Something went wrong!
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md text-lg">
        An unexpected error occurred. Our team has been notified and is working
        on a fix.
      </p>
      <Button onClick={() => reset()} size="lg" className="gap-2">
        <RefreshCcw className="h-4 w-4" />
        Try again
      </Button>
    </div>
  );
}
