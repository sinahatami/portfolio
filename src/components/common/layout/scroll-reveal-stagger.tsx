"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

export const ScrollRevealStagger = ({
  children,
  className = "",
  threshold = 0.1,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
  once?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, threshold]);

  return (
    <div ref={ref} className={className} data-stagger-visible={isVisible}>
      {children}
    </div>
  );
};
