"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: "none" | "lift" | "glow" | "border-glow";
  intensity?: number;
}

export const SpotlightCard = ({
  children,
  className,
  hoverEffect = "lift",
  intensity = 0.1,
  ...props
}: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(intensity);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const hoverEffects = {
    none: "",
    lift: "hover:-translate-y-1 hover:shadow-elevation-high",
    glow: "hover:shadow-glow",
    "border-glow": "hover:border-accent/50",
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group bg-card/50 relative rounded-2xl border backdrop-blur-sm transition-all duration-300",
        "shadow-elevation-medium",
        hoverEffects[hoverEffect],
        className
      )}
      {...props}
    >
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.15), transparent 50%)`,
        }}
      />

      {/* Border gradient */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-transparent via-transparent to-transparent p-px">
        <div className="from-accent/10 absolute inset-0 rounded-2xl bg-gradient-to-br via-transparent to-blue-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};
