"use client";

import { useEffect, useState } from "react";

export const PerformanceOptimizer = () => {
  const [_isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Guard for SSR
    if (typeof window === "undefined") return;

    // 1. Initial Setup
    const setPixelRatio = () => {
      const pixelRatio = Math.min(window.devicePixelRatio, 2);
      document.documentElement.style.setProperty(
        "--pixel-ratio",
        pixelRatio.toString()
      );
    };

    setPixelRatio();

    // 2. Scroll Handler (Throttled with rAF)
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          // You can add logic here to pause off-screen 3D content
          ticking = false;
        });
      }
    };

    // 3. Resize Handler (Debounced)
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setPixelRatio();
      }, 250);
    };

    // 4. Attach Listeners
    try {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("resize", handleResize, { passive: true });
    } catch (error) {
      console.warn("Performance optimization listeners failed:", error);
    }

    // 5. Guaranteed Cleanup
    // This return is what TypeScript was looking for!
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, []);

  // This component handles logic only, so it renders nothing
  return null;
};
