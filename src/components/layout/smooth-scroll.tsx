"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";

interface SmoothScrollProps {
  children: ReactNode;
}

// Simple smooth scroll polyfill
const smoothScrollTo = (element: HTMLElement, duration: number = 600) => {
  const targetPosition =
    element.getBoundingClientRect().top + window.scrollY - 80;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  // Easing function
  const ease = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  requestAnimationFrame(animation);
};

export function SmoothScroll({ children }: SmoothScrollProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Handle anchor clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;

      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute("href");
        if (!targetId || targetId === "#" || targetId === "/") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          smoothScrollTo(targetElement as HTMLElement);
        }
      }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        // Show cursor when using keyboard
        document.body.style.cursor = "auto";
      }
    };

    document.addEventListener("click", handleAnchorClick);
    document.addEventListener("keydown", handleKeyDown);

    // Enable smooth scroll behavior for the whole document
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      document.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  // Reset scroll position on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return <>{children}</>;
}
