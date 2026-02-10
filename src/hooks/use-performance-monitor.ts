"use client";

import { useEffect } from "react";

export function usePerformanceMonitor() {
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      process.env.NODE_ENV !== "production"
    ) {
      return;
    }

    let observer: PerformanceObserver | null = null;

    try {
      if (typeof PerformanceObserver === "undefined") {
        return;
      }

      const supportedEntryTypes = PerformanceObserver.supportedEntryTypes || [];

      if (supportedEntryTypes.includes("longtask")) {
        observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 100) {
              console.log(`[Perf] Long task: ${Math.round(entry.duration)}ms`);
            }
          }
        });

        observer.observe({ entryTypes: ["longtask"] });
      }
    } catch (error) {
      console.warn("Performance monitoring failed:", error);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return null;
}
