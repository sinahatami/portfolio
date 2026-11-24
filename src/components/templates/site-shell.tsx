import type { ReactNode } from "react";
import { CommandPalette } from "@/components/organisms/command-palette";
import { SiteFooter } from "@/components/organisms/site-footer";
import { SiteHeader } from "@/components/organisms/site-header";
import { Toaster } from "@/components/organisms/toaster";
import { VoiceStatus } from "@/components/organisms/voice-status";
import { CommandCenterProvider } from "@/components/providers/command-center-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import type { Profile } from "@/domain/portfolio";

interface SiteShellProps {
  profile: Profile;
  version: string;
  year: number;
  children: ReactNode;
}

/** Page frame shared by every route: providers, header, footer, overlays. */
export function SiteShell({
  profile,
  version,
  year,
  children,
}: SiteShellProps) {
  return (
    <ThemeProvider>
      <CommandCenterProvider>
        <a
          href="#main"
          className="bg-signal text-signal-foreground sr-only z-50 rounded-md px-4 py-2 font-semibold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader profile={profile} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter profile={profile} version={version} year={year} />
        <CommandPalette />
        <VoiceStatus />
        <Toaster />
      </CommandCenterProvider>
    </ThemeProvider>
  );
}
