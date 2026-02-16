"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Throttle mouse updates
  const lastUpdateTime = useRef<number>(0);
  const rafId = useRef<number | null>(null);

  // Single spring for main cursor
  const cursorX = useSpring(0, { stiffness: 800, damping: 40 });
  const cursorY = useSpring(0, { stiffness: 800, damping: 40 });

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
      if (rafId.current) cancelAnimationFrame(rafId.current);
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

      const now = Date.now();
      if (now - lastUpdateTime.current < 16) return;
      lastUpdateTime.current = now;

      setMousePosition({ x: e.clientX, y: e.clientY });

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

  // Update spring positions
  useEffect(() => {
    if (isMobile) return;

    const updateCursor = () => {
      cursorX.set(mousePosition.x);
      cursorY.set(mousePosition.y);
      rafId.current = requestAnimationFrame(updateCursor);
    };

    rafId.current = requestAnimationFrame(updateCursor);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [mousePosition, cursorX, cursorY, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: cursorVariant === "interactive" ? 1.2 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 35,
          mass: 0.5,
        }}
      >
        <div
          className={cn(
            "relative h-6 w-6 rounded-full border transition-all duration-150",
            cursorVariant === "interactive"
              ? "border-accent bg-accent/20"
              : "border-accent/50 bg-accent/10"
          )}
        >
          <motion.div
            className="bg-accent absolute top-1/2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            animate={{
              scale: isClicking ? 0.7 : 1,
            }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </motion.div>

      {/* Click ripple effect */}
      {isClicking && (
        <motion.div
          className="border-accent pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </>
  );
};
