"use client";

import { useEffect, useState } from "react";

export function usePerformanceMonitor() {
  const [metrics, _setMetrics] = useState({
    fcp: 0,
    lcp: 0,
    fid: 0,
    cls: 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Simple performance monitoring
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log(`[Perf] ${entry.name}:`, {
          duration: Math.round(entry.duration),
          startTime: Math.round(entry.startTime),
        });
      });
    });

    // Monitor Core Web Vitals
    observer.observe({
      entryTypes: [
        "paint",
        "largest-contentful-paint",
        "first-input",
        "layout-shift",
      ],
    });

    return () => observer.disconnect();
  }, []);

  return metrics;
}
