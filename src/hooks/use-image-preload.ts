"use client";

import { useEffect, useRef } from "react";
import { RESUME_DATA } from "@/data/resume-data";

export function useImagePreload() {
  const hasPreloadedRef = useRef(false);

  useEffect(() => {
    if (hasPreloadedRef.current) return;
    hasPreloadedRef.current = true;

    // Simple, non-blocking image preload
    const criticalImages = [
      RESUME_DATA.avatarUrl,
      ...RESUME_DATA.work.map((w) => w.logoUrl).filter(Boolean),
      ...RESUME_DATA.education.map((e) => e.logoUrl).filter(Boolean),
    ].filter(Boolean) as string[];

    // Use link preload for critical images
    criticalImages.slice(0, 2).forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });

    // Lazy load the rest
    setTimeout(() => {
      criticalImages.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }, 1000);

    // No return value needed
  }, []);
}
