"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { cn } from "@/app/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to add shadow/border to navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "bg-background/20 sticky top-0 z-50 w-full border-b border-transparent backdrop-blur-md transition-all",
        isScrolled && "border-border/40 bg-background/40"
      )}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Logo / Name */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/"
            className="text-lg font-bold tracking-tight transition-opacity hover:opacity-80"
          >
            {RESUME_DATA.initials}
            <span className="text-accent">.</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav
          className="hidden items-center gap-6 text-sm font-medium md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-foreground focus-visible:ring-accent rounded-sm px-2 py-1 underline-offset-4 transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              aria-label={`Navigate to ${link.name} section`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Call to Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hidden sm:inline-flex"
          >
            <a
              href={RESUME_DATA.contact.social[0].url}
              target="_blank"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hidden sm:inline-flex"
          >
            <a
              href={RESUME_DATA.contact.social[1].url}
              target="_blank"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
          <Button size="sm" className="hidden md:inline-flex" asChild>
            <a href={`mailto:${RESUME_DATA.contact.email}`}>
              Contact Me <Mail className="ml-2 h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};
