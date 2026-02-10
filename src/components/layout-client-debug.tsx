"use client";

import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { SkillsProvider } from "@/contexts/skills-context";
import { Toaster } from "@/components/ui/toaster";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { SmoothScroll } from "./layout/smooth-scroll";
import { Footer } from "./layout/footer";
import { Navbar } from "./layout/navbar";
import { ScrollToTop } from "./layout/scroll-to-top";
import { CommandMenu } from "./features";

export default function LayoutClientDebug({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // Simple mount effect - runs once
  useEffect(() => {
    console.log("LayoutClient mounted");
    setMounted(true);
  }, []); // Empty array = run once

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
          {/* Minimal components for testing */}
          <Navbar />
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <CommandMenu />

          <ScrollToTop />
        </SmoothScroll>
      </SkillsProvider>
    </ThemeProvider>
  );
}
