"use client";

import { useEffect, useState } from "react";

export const PerformanceOptimizer = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Only run on client
    if (typeof window === "undefined") return;

    // Simple performance optimization
    const optimize = () => {
      try {
        // Set pixel ratio
        const pixelRatio = Math.min(window.devicePixelRatio, 2);
        document.documentElement.style.setProperty(
          "--pixel-ratio",
          pixelRatio.toString()
        );

        // Optimize scroll
        let ticking = false;
        const handleScroll = () => {
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
              // Optional: Throttle heavy operations here
              ticking = false;
            });
          }
        };

        // Debounced resize handler
        let resizeTimeout: NodeJS.Timeout;
        const handleResize = () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            const newPixelRatio = Math.min(window.devicePixelRatio, 2);
            document.documentElement.style.setProperty(
              "--pixel-ratio",
              newPixelRatio.toString()
            );
          }, 250);
        };

        // Add listeners
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize, { passive: true });

        return () => {
          window.removeEventListener("scroll", handleScroll);
          window.removeEventListener("resize", handleResize);
          clearTimeout(resizeTimeout);
        };
      } catch (error) {
        console.warn("Performance optimization failed:", error);
      }
    };

    return optimize();
  }, []);

  // Don't render anything
  return null;
};
