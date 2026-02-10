"use client";

import { useEffect } from "react";

export function usePerformanceMonitor() {
  useEffect(() => {
    // Don't run on server or in development
    if (
      typeof window === "undefined" ||
      process.env.NODE_ENV !== "production"
    ) {
      return;
    }

    try {
      // Only set up PerformanceObserver if it exists
      if (typeof PerformanceObserver === "undefined") {
        return;
      }

      // Monitor long tasks (only if supported)
      let observer: PerformanceObserver | null = null;

      // Check if longtask is supported
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

      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    } catch (error) {
      // Silently fail - performance monitoring is non-critical
      console.warn("Performance monitoring failed:", error);
    }
  }, []); // Empty dependency array

  return null;
}
