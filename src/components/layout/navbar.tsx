"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Briefcase,
  Code2,
  GraduationCap,
  Brain,
  MessageCircleCode,
  BookOpen,
  Sparkles,
} from "@/lib/icons";
import { RESUME_DATA } from "@/data/resume-data";
import { cn } from "@/lib/utils";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import { NavbarActions } from "./navbar-actions";

export const navLinks = [
  { name: "About", href: "/#about", icon: <User className="h-4 w-4" /> },
  {
    name: "Experience",
    href: "/#experience",
    icon: <Briefcase className="h-4 w-4" />,
  },
  { name: "Projects", href: "/#projects", icon: <Code2 className="h-4 w-4" /> },
  {
    name: "Education",
    href: "/#education",
    icon: <GraduationCap className="h-4 w-4" />,
  },
  { name: "Skills", href: "/#skills", icon: <Brain className="h-4 w-4" /> },
  {
    name: "Contact",
    href: "/#contact",
    icon: <MessageCircleCode className="h-4 w-4" />,
  },
  { name: "Blog", href: "/blog", icon: <BookOpen className="h-4 w-4" /> },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use Custom Hook to encapsulate all scroll logic
  const sectionIds = navLinks
    .filter((link) => link.href.startsWith("/#"))
    .map((link) => link.href.substring(2));

  const { isScrolled, scrollProgress, activeSection } =
    useScrollSpy(sectionIds);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <div className="from-accent fixed top-0 right-0 left-0 z-[100] h-0.5 bg-gradient-to-r via-blue-500 to-purple-500">
        <div
          className="h-full bg-white transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Navbar */}
      <header
        className={cn(
          "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/80 border-b border-white/10 shadow-2xl backdrop-blur-xl"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-6">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Logo */}
            <Link href="/" className="group relative flex items-center gap-3">
              <div className="from-accent flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br to-blue-500 transition-transform duration-500 group-hover:rotate-180">
                <span className="text-lg font-bold text-white">
                  {RESUME_DATA.initials}
                </span>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{RESUME_DATA.name}</span>
                  <Sparkles className="text-accent h-4 w-4 animate-pulse" />
                </div>
                <div className="text-muted-foreground text-xs">
                  {RESUME_DATA.position}
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <DesktopNav
              navLinks={navLinks}
              activeSection={activeSection}
              onLinkClick={() => setIsMenuOpen(false)}
            />

            {/* Right Section / Actions */}
            <NavbarActions
              isMenuOpen={isMenuOpen}
              onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileNav
        isOpen={isMenuOpen}
        navLinks={navLinks}
        activeSection={activeSection}
        onLinkClick={() => setIsMenuOpen(false)}
      />
    </>
  );
};
