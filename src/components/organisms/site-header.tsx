"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/atoms";
import {
  Availability,
  CommandTrigger,
  ThemeToggle,
} from "@/components/molecules";
import { useCommandCenter } from "@/components/providers/command-center-provider";
import { PRIMARY_NAV, type NavItem } from "@/config/navigation";
import type { Profile } from "@/domain/portfolio";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";

const SPY_IDS = PRIMARY_NAV.flatMap((item) =>
  item.sectionId ? [item.sectionId] : []
);

interface SiteHeaderProps {
  profile: Pick<Profile, "name" | "initials" | "availability">;
}

export function SiteHeader({ profile }: SiteHeaderProps) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const activeSection = useScrollSpy(SPY_IDS, onHome);
  const scrolled = useScrolled();
  const { setPaletteOpen } = useCommandCenter();

  const isActive = (item: NavItem) =>
    item.sectionId
      ? onHome && activeSection === item.sectionId
      : pathname.startsWith(item.href);

  const activeIndex = PRIMARY_NAV.findIndex(isActive);

  return (
    <header
      data-print="hide"
      className={cn(
        "bg-background/80 sticky top-0 z-40 backdrop-blur-md backdrop-saturate-150 transition-shadow",
        (scrolled || !onHome) && "shadow-[0_10px_30px_-20px_rgb(15_30_61/0.45)]"
      )}
    >
      <Container className="flex h-16 items-center gap-5">
        <Link
          href="/"
          aria-label={`${profile.name}, home`}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-[conic-gradient(from_-135deg,var(--color-lane-research)_0_37.5%,var(--color-lane-industry)_0_62.5%,var(--color-lane-study)_0)] p-[3px] transition-transform hover:rotate-12"
        >
          <span className="font-display bg-board text-board-foreground grid size-full place-items-center rounded-full text-sm font-bold tracking-wide">
            {profile.initials}
          </span>
        </Link>

        <nav aria-label="Primary" className="max-md:hidden">
          <ul className="flex items-center gap-1">
            {PRIMARY_NAV.map((item, index) => {
              const active = index === activeIndex;
              const passed = activeIndex > -1 && index < activeIndex;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={
                      active
                        ? item.sectionId
                          ? "location"
                          : "page"
                        : undefined
                    }
                    className={cn(
                      "relative block rounded-md px-3 py-2 font-medium transition-colors",
                      active
                        ? "text-foreground"
                        : "text-foreground/70 hover:text-foreground"
                    )}
                  >
                    {item.label}
                    {/* Station on the line along the bottom of the header */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -bottom-[18px] left-1/2 size-3 -translate-x-1/2 rounded-full border-[2.5px] transition-[background-color,border-color,scale] duration-300",
                        active
                          ? "border-foreground bg-signal scale-[1.35]"
                          : passed
                            ? "border-lane-industry bg-lane-industry"
                            : "border-foreground/30 bg-background"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <span className="mr-3 max-lg:hidden">
            <Availability availability={profile.availability} />
          </span>
          <CommandTrigger onOpen={() => setPaletteOpen(true)} />
          <ThemeToggle />
          <MobileNav items={PRIMARY_NAV} isActive={isActive} />
        </div>
      </Container>

      {/* The line: a track with the reading progress drawn over it */}
      <div aria-hidden className="bg-border/70 relative h-[3px]">
        <div className="scroll-progress bg-lane-industry absolute inset-0" />
      </div>
    </header>
  );
}
