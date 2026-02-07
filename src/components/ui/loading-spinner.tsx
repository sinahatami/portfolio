"use client";

import { cn } from "@/app/lib/utils";
import { useState, useEffect } from "react";
import {
  ClockLoader,
  GridLoader,
  HashLoader,
  PulseLoader,
  RingLoader,
  ScaleLoader,
  BeatLoader,
  SyncLoader,
  RiseLoader,
  MoonLoader,
  BounceLoader,
  CircleLoader,
  ClipLoader,
  DotLoader,
  FadeLoader,
  PropagateLoader,
  PuffLoader,
} from "react-spinners";
import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
  variant?:
    | "clock"
    | "grid"
    | "hash"
    | "pulse"
    | "ring"
    | "scale"
    | "beat"
    | "sync"
    | "rise"
    | "moon"
    | "bounce"
    | "circle"
    | "clip"
    | "dot"
    | "fade"
    | "propagate"
    | "puff"
    | "tech-orbit"
    | "galaxy";
  color?: string;
  speedMultiplier?: number;
  label?: string;
  showLabel?: boolean;
}

// Theme colors matching your portfolio
const THEME_COLORS = {
  accent: "#3b82f6",
  blue: "#3b82f6",
  purple: "#8b5cf6",
  emerald: "#10b981",
  amber: "#f59e0b",
};

export function LoadingSpinner({
  size = 40,
  className,
  variant = "tech-orbit",
  color,
  speedMultiplier = 1,
  label = "Loading...",
  showLabel = false,
}: LoadingSpinnerProps) {
  const [primaryColor, setPrimaryColor] = useState(THEME_COLORS.accent);
  const [secondaryColor, setSecondaryColor] = useState(THEME_COLORS.blue);

  // Handle theme changes
  useEffect(() => {
    const updateColors = () => {
      if (color) {
        setPrimaryColor(color);
        setSecondaryColor(color);
      } else {
        // Use theme colors based on variant
        if (variant === "tech-orbit" || variant === "galaxy") {
          setPrimaryColor(THEME_COLORS.accent);
          setSecondaryColor(THEME_COLORS.purple);
        } else {
          setPrimaryColor(THEME_COLORS.accent);
          setSecondaryColor(THEME_COLORS.blue);
        }
      }
    };

    updateColors();
  }, [variant, color]);

  // Custom tech-themed spinners
  const getCustomSpinner = () => {
    switch (variant) {
      case "tech-orbit":
        return (
          <div className="relative" style={{ width: size, height: size }}>
            {/* Outer orbiting rings */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent"
              style={{
                borderTopColor: primaryColor,
                borderRightColor: secondaryColor,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 2 / speedMultiplier,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-transparent"
              style={{
                borderBottomColor: primaryColor,
                borderLeftColor: secondaryColor,
              }}
              animate={{ rotate: -360 }}
              transition={{
                duration: 1.5 / speedMultiplier,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            {/* Inner pulsing core */}
            <motion.div
              className="absolute inset-4 rounded-full"
              style={{
                background: `radial-gradient(circle at center, ${primaryColor}, ${secondaryColor})`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1 / speedMultiplier,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Orbiting dots */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? primaryColor : secondaryColor,
                  top: "50%",
                  left: "50%",
                  marginTop: -4,
                  marginLeft: -4,
                }}
                animate={{
                  x: [
                    Math.cos((i * Math.PI) / 2) * (size / 2),
                    Math.cos((i * Math.PI) / 2 + Math.PI) * (size / 2),
                    Math.cos((i * Math.PI) / 2) * (size / 2),
                  ],
                  y: [
                    Math.sin((i * Math.PI) / 2) * (size / 2),
                    Math.sin((i * Math.PI) / 2 + Math.PI) * (size / 2),
                    Math.sin((i * Math.PI) / 2) * (size / 2),
                  ],
                }}
                transition={{
                  duration: 2 / speedMultiplier,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        );

      case "galaxy":
        return (
          <div className="relative" style={{ width: size, height: size }}>
            {/* Swirling galaxy effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, transparent, ${primaryColor}, ${secondaryColor}, transparent)`,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 3 / speedMultiplier,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute inset-2 rounded-full"
              style={{
                background: `conic-gradient(from 180deg, transparent, ${secondaryColor}, ${primaryColor}, transparent)`,
              }}
              animate={{ rotate: -360 }}
              transition={{
                duration: 2.5 / speedMultiplier,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            {/* Central black hole */}
            <div
              className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: `radial-gradient(circle at center, ${primaryColor}, transparent)`,
                boxShadow: `0 0 20px ${primaryColor}`,
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  // Map variants to react-spinners components
  const getSpinnerComponent = () => {
    const commonProps = {
      color: primaryColor,
      size: size,
      speedMultiplier: speedMultiplier,
    };

    switch (variant) {
      case "clock":
        return <ClockLoader {...commonProps} />;
      case "grid":
        return <GridLoader {...commonProps} />;
      case "hash":
        return <HashLoader {...commonProps} />;
      case "pulse":
        return <PulseLoader {...commonProps} />;
      case "ring":
        return <RingLoader {...commonProps} />;
      case "scale":
        return <ScaleLoader {...commonProps} />;
      case "beat":
        return <BeatLoader {...commonProps} />;
      case "sync":
        return <SyncLoader {...commonProps} />;
      case "rise":
        return <RiseLoader {...commonProps} />;
      case "moon":
        return <MoonLoader {...commonProps} />;
      case "bounce":
        return <BounceLoader {...commonProps} />;
      case "circle":
        return <CircleLoader {...commonProps} />;
      case "clip":
        return <ClipLoader {...commonProps} />;
      case "dot":
        return <DotLoader {...commonProps} />;
      case "fade":
        return <FadeLoader {...commonProps} />;
      case "propagate":
        return <PropagateLoader {...commonProps} />;
      case "puff":
        return <PuffLoader {...commonProps} />;
      default:
        return <RingLoader {...commonProps} />;
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      {variant === "tech-orbit" || variant === "galaxy"
        ? getCustomSpinner()
        : getSpinnerComponent()}

      {showLabel && (
        <motion.p
          className="text-muted-foreground mt-4 text-sm font-medium"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {label}
        </motion.p>
      )}
    </div>
  );
}

// Preset spinner configurations for different use cases
export const SpinnerPresets = {
  GitHub: {
    variant: "tech-orbit" as const,
    size: 60,
    label: "Fetching GitHub data...",
    showLabel: true,
  },
  Page: {
    variant: "ring" as const,
    size: 50,
    label: "Loading...",
    showLabel: true,
  },
  Button: {
    variant: "beat" as const,
    size: 20,
    showLabel: false,
  },
  Card: {
    variant: "pulse" as const,
    size: 30,
    showLabel: false,
  },
  FullScreen: {
    variant: "galaxy" as const,
    size: 80,
    label: "Please wait...",
    showLabel: true,
  },
};
