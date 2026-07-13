import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function useScrollSpy(sectionIds: string[]) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("about");
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;

    const handleScroll = () => {
      if (!isMounted || pathname !== "/") return;

      const shouldBeScrolled = window.scrollY > 20;
      if (isScrolled !== shouldBeScrolled) {
        setIsScrolled(shouldBeScrolled);
      }

      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress =
        totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollProgress(currentProgress);

      const current = sectionIds.find((section) => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (current) setActiveSection(current);
    };

    if (pathname.startsWith("/blog")) {
      setActiveSection("blog");
      setIsScrolled(true);
    } else if (pathname === "/") {
      handleScroll();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      isMounted = false;
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, isScrolled, sectionIds]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash.substring(1);
    if (!hash) return;

    let attempts = 0;
    const interval = setInterval(() => {
      const element = document.getElementById(hash);
      if (element) {
        const offset = window.innerWidth < 768 ? 64 : 80;
        const y = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
        setActiveSection(hash);
        clearInterval(interval);
      }
      attempts++;
      if (attempts > 20) clearInterval(interval);
    }, 100);

    return () => clearInterval(interval);
  }, [pathname]);

  return { isScrolled, scrollProgress, activeSection, pathname };
}
