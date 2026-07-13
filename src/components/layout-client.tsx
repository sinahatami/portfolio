"use client";

import { useState, useEffect, Suspense } from "react";
import { SkillsProvider } from "@/contexts/skills-context";
import { Toaster } from "@/components/ui";
import { SmoothScroll } from "./layout/smooth-scroll";
import { Footer } from "./layout/footer";
import { Navbar } from "./layout/navbar";
import { ScrollToTop } from "./layout/scroll-to-top";

import { ThemeProvider } from "next-themes";
import { PerformanceOptimizer } from "./performance-optimizer";
import dynamic from "next/dynamic";

const CommandMenu = dynamic(
  () => import("./features").then((mod) => mod.CommandMenu),
  { ssr: false }
);

const VoiceCommands = dynamic(
  () => import("./features").then((mod) => mod.VoiceCommands),
  { ssr: false }
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

    // Disable any problematic features
    if (typeof window !== "undefined") {
      // Force-disable WebGL context creation attempts
      (window as any).__DISABLE_WEBGL = true;
    }

    return () => resizeObserver.disconnect();
  }, []);

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

          {mounted && !isMobile && (
            <Suspense fallback={null}>
              {/* <CustomCursor /> */}
              {/* <ParticlesBackground /> */}
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
            <VoiceCommands />
          </Suspense>
          <ScrollToTop />
        </SmoothScroll>
      </SkillsProvider>
    </ThemeProvider>
  );
}
