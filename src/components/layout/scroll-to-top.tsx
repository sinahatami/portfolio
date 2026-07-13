"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui";
import { ArrowUp } from "@/lib/icons";

export const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 fixed right-4 bottom-4 z-40 duration-300 md:right-8 md:bottom-14">
      <Button
        variant="outline"
        size="icon"
        onClick={scrollToTop}
        className="bg-background border-border hover:border-accent hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-full border shadow-2xl transition-all duration-300 md:h-12 md:w-12"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-4 w-4 md:h-5 md:w-5" />
      </Button>
    </div>
  );
};
