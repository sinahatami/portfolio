"use client";

import { useState, useEffect, Suspense } from "react";
import { SkillsProvider } from "@/contexts/skills-context";
import { Toaster, LoadingSpinner } from "@/components/ui";
import { SmoothScroll } from "./layout/smooth-scroll";
import { Footer } from "./layout/footer";
import { Navbar } from "./layout/navbar";
import { ScrollToTop } from "./layout/scroll-to-top";

import { CommandMenu, CustomCursor } from "./features";
import { PerformanceOptimizer } from "./performance-optimizer";
import { ParticlesBackground } from "./visualizations/particles-background";
import { ThemeProvider } from "next-themes";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          "ontouchstart" in window ||
          navigator.maxTouchPoints > 0
      );
    };

    checkMobile();

    const resizeObserver = new ResizeObserver(checkMobile);
    resizeObserver.observe(document.body);

    // Disable any problematic features
    if (typeof window !== "undefined") {
      // Force-disable WebGL context creation attempts
      (window as any).__DISABLE_WEBGL = true;
    }

    return () => resizeObserver.disconnect();
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner variant="galaxy" size={60} />
      </div>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
      storageKey="portfolio-theme"
    >
      <SkillsProvider>
        <SmoothScroll>
          <PerformanceOptimizer />

          {!isMobile && (
            <Suspense fallback={null}>
              <CustomCursor />
              <ParticlesBackground />
            </Suspense>
          )}
          <Navbar />
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />

          <Suspense fallback={null}>
            <CommandMenu />
          </Suspense>
          <ScrollToTop />
        </SmoothScroll>
      </SkillsProvider>
    </ThemeProvider>
  );
}
