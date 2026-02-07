"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { SkillsProvider } from "@/contexts/skills-context";
import SmoothScroll from "@/components/smooth-scroll";
import { PerformanceOptimizer } from "@/components/performance-optimizer";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { ScrollToTop } from "@/components/scroll-to-top";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Lazy load heavy components with proper default exports
const ParticlesBackground = lazy(() =>
  import("@/components/particles-background").then((mod) => ({
    default: mod.ParticlesBackground,
  }))
);
const CustomCursor = lazy(() =>
  import("@/components/custom-cursor").then((mod) => ({
    default: mod.CustomCursor,
  }))
);
const CommandMenu = lazy(() =>
  import("@/components/command-menu").then((mod) => ({
    default: mod.CommandMenu,
  }))
);
const PWARegister = lazy(() =>
  import("@/components/pwa/pwa-register").then((mod) => ({
    default: mod.PWARegister,
  }))
);
const OfflineIndicator = lazy(() =>
  import("@/components/pwa/offline-indicator").then((mod) => ({
    default: mod.OfflineIndicator,
  }))
);
const InstallPrompt = lazy(() =>
  import("@/components/pwa/install-prompt").then((mod) => ({
    default: mod.InstallPrompt,
  }))
);

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

    return () => resizeObserver.disconnect();
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
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

          {/* Lazy loaded components with suspense */}
          <Suspense fallback={null}>
            <PWARegister />
            <OfflineIndicator />
            <InstallPrompt />
          </Suspense>

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
