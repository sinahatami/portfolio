"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Throttle mouse updates
  const lastUpdateTime = useRef<number>(0);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        window.innerWidth < 768 ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
      setIsMobile(mobile);

      if (!mobile) {
        document.body.style.cursor = "none";
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
      document.body.style.cursor = "auto";
    };
  }, []);

  // Optimized mouse tracking
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      const isOverScrollbar = e.clientX >= window.innerWidth - 15;

      if (isOverScrollbar) {
        setIsVisible(false);
        document.body.style.cursor = "auto";
      } else {
        setIsVisible(true);
        document.body.style.cursor = "none";
      }

      setMousePosition({ x: e.clientX, y: e.clientY });

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      const now = Date.now();
      if (now - lastUpdateTime.current < 16) return;
      lastUpdateTime.current = now;

      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a");

      setCursorVariant(isInteractive ? "interactive" : "default");
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    setIsVisible(true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-[9999] transition-opacity duration-300",
          isVisible ? "opacity-100" : "opacity-0"
        )}
      >
        <div
          className={cn(
            "relative h-6 w-6 rounded-full border transition-all duration-150 ease-out",
            cursorVariant === "interactive"
              ? "border-accent bg-accent/20 scale-125"
              : "border-accent/50 bg-accent/10 scale-100"
          )}
        >
          <div
            className={cn(
              "bg-accent absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-100",
              isClicking ? "scale-75" : "scale-100"
            )}
          />
        </div>
      </div>

      {/* Click ripple effect */}
      {isClicking && (
        <div
          className="border-accent pointer-events-none fixed top-0 left-0 z-[9998] animate-ping rounded-full border"
          style={{
            transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) translate(-50%, -50%)`,
            width: "40px",
            height: "40px",
          }}
        />
      )}
    </>
  );
};
