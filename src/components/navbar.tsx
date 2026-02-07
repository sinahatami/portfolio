"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { cn } from "@/app/lib/utils";
import { ThemeToggle } from "./theme-toggle";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  const navLinks = [
    { name: "About", href: "#about", icon: "👤" },
    { name: "Experience", href: "#experience", icon: "💼" },
    { name: "Projects", href: "#projects", icon: "🚀" },
    { name: "Education", href: "#education", icon: "🎓" },
    { name: "Skills", href: "#skills", icon: "🛠️" },
    { name: "Contact", href: "#contact", icon: "📧" },
  ];

  const isMounted = useRef(true);

  // Scroll effects
  useEffect(() => {
    isMounted.current = true;

    const handleScroll = () => {
      if (!isMounted.current) return;

      setIsScrolled(window.scrollY > 20);

      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);

      // Active section detection
      const sections = navLinks.map((link) => link.href.substring(1));
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <div className="from-accent fixed top-0 right-0 left-0 z-[100] h-0.5 bg-gradient-to-r via-blue-500 to-purple-500">
        <motion.div
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Main Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
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
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="from-accent flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br to-blue-500"
              >
                <span className="text-lg font-bold text-white">
                  {RESUME_DATA.initials}
                </span>
              </motion.div>
              <div className="hidden md:block">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{RESUME_DATA.name}</span>
                  <Sparkles className="text-accent h-4 w-4 animate-pulse" />
                </div>
                <div className="text-muted-foreground text-xs">
                  Senior Software Engineer
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 rounded-2xl bg-white/5 px-2 py-2 backdrop-blur-md md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "group relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all",
                    activeSection === link.href.substring(1)
                      ? "text-accent bg-accent/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.name}</span>
                  {activeSection === link.href.substring(1) && (
                    <motion.div
                      layoutId="activeNav"
                      className="from-accent/20 absolute inset-0 -z-10 rounded-xl bg-gradient-to-r to-blue-500/20"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <ChevronRight className="ml-1 h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 md:flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="group relative overflow-hidden rounded-full"
                  asChild
                >
                  <a
                    href={RESUME_DATA.contact.social[0].url}
                    target="_blank"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                    <span className="from-accent/20 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="group relative overflow-hidden rounded-full"
                  asChild
                >
                  <a
                    href={RESUME_DATA.contact.social[1].url}
                    target="_blank"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </Button>

                <Button
                  size="sm"
                  className="group from-accent relative overflow-hidden rounded-full bg-gradient-to-r to-blue-500 text-white shadow-lg hover:shadow-xl"
                  asChild
                >
                  <a href={`mailto:${RESUME_DATA.contact.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </a>
                </Button>
              </div>

              <ThemeToggle />

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-background/95 fixed inset-x-0 top-16 z-40 border-b backdrop-blur-xl md:hidden"
          >
            <div className="container px-6 py-4">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                      activeSection === link.href.substring(1)
                        ? "bg-accent/10 text-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-xl">{link.icon}</span>
                    <span>{link.name}</span>
                    <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                  </Link>
                ))}

                <div className="mt-4 flex gap-2 border-t pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <a href={RESUME_DATA.contact.social[0].url} target="_blank">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <a href={RESUME_DATA.contact.social[1].url} target="_blank">
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </a>
                  </Button>
                </div>

                <Button className="mt-2 w-full" asChild>
                  <a href={`mailto:${RESUME_DATA.contact.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Contact Me
                  </a>
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
