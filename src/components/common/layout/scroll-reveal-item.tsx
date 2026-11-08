"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

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

    const observer = new MutationObserver(checkParentVisibility);
    if (parent) {
      observer.observe(parent, {
        attributes: true,
        attributeFilter: ["data-stagger-visible"],
      });
      checkParentVisibility();
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
