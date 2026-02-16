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
    if (!onLoad) return;

    const frame = requestAnimationFrame(() => {
      onLoad();
    });

    return () => cancelAnimationFrame(frame);
  }, [onLoad]);

  return <Suspense fallback={fallback}>{children}</Suspense>;
}
