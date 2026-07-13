"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade";
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
  amount?: number;
}

const getDirectionClass = (direction: string) => {
  switch (direction) {
    case "up":
      return "translate-y-8";
    case "down":
      return "-translate-y-8";
    case "left":
      return "translate-x-8";
    case "right":
      return "-translate-x-8";
    case "fade":
      return "";
    default:
      return "translate-y-8";
  }
};

export const ScrollReveal = ({
  children,
  delay = 0,
  direction = "up",
  duration = 0.5,
  className = "",
  once = true,
  amount = 0.2,
}: ScrollRevealProps) => {
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
      { threshold: amount }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once, amount]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        isVisible
          ? "translate-x-0 translate-y-0 opacity-100"
          : `opacity-0 ${getDirectionClass(direction)}`,
        className
      )}
      style={{
        transitionDuration: `${duration * 1000}ms`,
        transitionDelay: `${delay * 1000}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Stagger container for multiple items
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

export const ScrollRevealItem = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Find our index among siblings to calculate delay
    const parent = element.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children);
      const myIndex = siblings.indexOf(element);
      setIndex(myIndex >= 0 ? myIndex : 0);
    }

    const checkParentVisibility = () => {
      const parentIsVisible =
        parent?.getAttribute("data-stagger-visible") === "true";
      if (parentIsVisible) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Use MutationObserver to watch parent attribute changes
    const observer = new MutationObserver(checkParentVisibility);
    if (parent) {
      observer.observe(parent, {
        attributes: true,
        attributeFilter: ["data-stagger-visible"],
      });
      checkParentVisibility(); // Initial check
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-500 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
        className
      )}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {children}
    </div>
  );
};
