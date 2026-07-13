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
    <div className="animate-in fade-in slide-in-from-bottom-4 fixed right-8 bottom-14 z-40 duration-300">
      <Button
        variant="outline"
        size="icon"
        onClick={scrollToTop}
        className="bg-background border-border hover:border-accent hover:bg-accent hover:text-accent-foreground h-12 w-12 rounded-full border shadow-2xl transition-all duration-300"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </div>
  );
};
