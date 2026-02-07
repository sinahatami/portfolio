"use client";

import { useEffect } from "react";

export const PerformanceOptimizer = () => {
  useEffect(() => {
    // Optimize for Core Web Vitals
    const optimizePerformance = () => {
      // Set pixel ratio for high DPI displays
      const setPixelRatio = () => {
        if (typeof window !== "undefined") {
          const pixelRatio = Math.min(window.devicePixelRatio, 2);
          document.documentElement.style.setProperty(
            "--pixel-ratio",
            pixelRatio.toString()
          );
        }
      };

      // Optimize scroll performance
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            // Optional: Add any scroll-based optimizations here
            ticking = false;
          });
          ticking = true;
        }
      };

      // Debounce resize events
      let resizeTimeout: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setPixelRatio, 250);
      };

      // Initialize
      setPixelRatio();

      // Add event listeners
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleResize, { passive: true });

      // Cleanup
      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
        clearTimeout(resizeTimeout);
      };
    };

    return optimizePerformance();
  }, []);

  return null;
};
