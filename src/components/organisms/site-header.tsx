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
  profile: Pick<Profile, "name" | "availability">;
}

/**
 * The S¹ mark, small: the initial with its red note, on a scrap of twill.
 * Decorative; the name beside it is the link text.
 */
function BrandMark() {
  return (
    <span
      aria-hidden
      className="twill border-border relative grid size-7 place-items-center rounded-[3px] border text-[0.95rem] leading-none font-extrabold"
    >
      <span className="-translate-x-[0.12em]">S</span>
      <span className="text-accent absolute top-[0.3rem] right-[0.28rem] text-[0.5rem] font-extrabold">
        1
      </span>
    </span>
  );
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

  return (
    <header
      data-print="hide"
      className={cn(
        "scheme-denim sticky top-0 z-40 border-b transition-shadow",
        scrolled && "shadow-[0_10px_30px_-18px_rgb(17_26_54/0.7)]"
      )}
    >
      <Container className="flex h-16 items-center gap-8">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 text-lg font-extrabold tracking-[-0.03em]"
        >
          <BrandMark />
          <span className="group-hover:text-accent transition-colors">
            {profile.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="self-stretch max-md:hidden">
          <ul className="flex h-full items-stretch gap-6">
            {PRIMARY_NAV.map((item) => {
              const active = isActive(item);
              return (
                <li key={item.href} className="flex">
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
                      "relative flex items-center text-[0.9375rem] font-medium transition-colors",
                      "after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:origin-left after:transition-transform after:duration-300",
                      active
                        ? "text-foreground after:bg-accent after:scale-x-100"
                        : "text-muted-foreground hover:text-foreground after:bg-accent after:scale-x-0"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <span className="mr-4 max-lg:hidden">
            <Availability availability={profile.availability} />
          </span>
          <CommandTrigger onOpen={() => setPaletteOpen(true)} />
          <ThemeToggle />
          <MobileNav items={PRIMARY_NAV} isActive={isActive} />
        </div>
      </Container>
    </header>
  );
}
