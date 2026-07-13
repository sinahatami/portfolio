"use client";

import { useState, useEffect } from "react";
import {
  User,
  Briefcase,
  Code2,
  GraduationCap,
  Brain,
  MessageCircleCode,
  BookOpen,
} from "@/lib/icons";
import { cn } from "@/lib/utils";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { DesktopNav } from "./components/desktop-nav";
import { MobileNav } from "./components/mobile-nav";
import { NavbarActions } from "./components/navbar-actions";
import { NavbarProgress } from "./components/navbar-progress";
import { NavbarBrand } from "./components/navbar-brand";

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
      <NavbarProgress scrollProgress={scrollProgress} />

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
            <NavbarBrand />

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
