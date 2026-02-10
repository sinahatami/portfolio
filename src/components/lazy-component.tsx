"use client";

import { Suspense, useEffect, ReactNode } from "react";

interface LazyComponentProps {
  children: ReactNode;
  fallback: ReactNode;
  onLoad?: () => void;
}

export function LazyComponent({
  children,
  fallback,
  onLoad,
}: LazyComponentProps) {
  useEffect(() => {
    if (onLoad) {
      // Call onLoad after component mounts
      const timer = setTimeout(onLoad, 50);
      return () => clearTimeout(timer);
    }
  }, [onLoad]);

  return <Suspense fallback={fallback}>{children}</Suspense>;
}
