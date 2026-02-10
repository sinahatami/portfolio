"use client";

import { cn } from "@/app/lib/utils";
import { useState, useEffect, JSX } from "react";
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
  const [secondaryColor, setSecondaryColor] = useState(THEME_COLORS.purple);

  useEffect(() => {
    const updateColors = () => {
      if (color) {
        setPrimaryColor(color);
        setSecondaryColor(color);
      } else {
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

  const getCustomSpinner = () => {
    switch (variant) {
      case "tech-orbit":
        return (
          <div
            className="relative flex items-center justify-center"
            style={{ width: size, height: size }}
          >
            {/* Background Ambient Glow */}
            <div
              className="absolute inset-0 rounded-full opacity-10 blur-2xl"
              style={{
                background: `radial-gradient(circle, ${primaryColor}, ${secondaryColor})`,
              }}
            />

            {/* Outer Orbiting Ring - Glass Effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-[2px] border-transparent"
              style={{
                borderTopColor: primaryColor,
                borderRightColor: `${primaryColor}22`,
                filter: `drop-shadow(0 0 8px ${primaryColor}66)`,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 2 / speedMultiplier,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Inner Orbiting Ring - Reversed */}
            <motion.div
              className="absolute inset-2 rounded-full border-[1.5px] border-transparent"
              style={{
                borderBottomColor: secondaryColor,
                borderLeftColor: `${secondaryColor}22`,
                filter: `drop-shadow(0 0 5px ${secondaryColor}66)`,
              }}
              animate={{ rotate: -360 }}
              transition={{
                duration: 1.5 / speedMultiplier,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Core Pulsing Sphere */}
            <motion.div
              className="relative z-10 flex items-center justify-center rounded-full shadow-lg"
              style={{
                width: size * 0.35,
                height: size * 0.35,
                background: `radial-gradient(circle at 30% 30%, #fff, ${primaryColor}, ${secondaryColor})`,
                boxShadow: `0 0 20px ${primaryColor}44`,
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 1.2 / speedMultiplier,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Inner Lens Flare Effect */}
              <div className="h-1/2 w-1/2 rounded-full bg-white/20 blur-[1px]" />
            </motion.div>

            {/* Orbiting Particles */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ width: size, height: size }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: (2.5 + i * 0.5) / speedMultiplier,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: i === 0 ? "#fff" : primaryColor,
                    boxShadow: `0 0 10px ${primaryColor}`,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  animate={{ scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </div>
        );

      case "galaxy":
        return (
          <div
            className="relative flex items-center justify-center"
            style={{ width: size, height: size }}
          >
            {/* Primary Swirl */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, transparent, ${primaryColor}, transparent)`,
                WebkitMaskImage:
                  "radial-gradient(circle, transparent 35%, black 36%)",
                filter: `drop-shadow(0 0 12px ${primaryColor}88)`,
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 2 / speedMultiplier,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            {/* Secondary Swirl */}
            <motion.div
              className="absolute inset-2 rounded-full opacity-50"
              style={{
                background: `conic-gradient(from 180deg, transparent, ${secondaryColor}, transparent)`,
                WebkitMaskImage:
                  "radial-gradient(circle, transparent 35%, black 36%)",
              }}
              animate={{ rotate: -360 }}
              transition={{
                duration: 3 / speedMultiplier,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            {/* Central "Star" Core */}
            <div
              className="h-[30%] w-[30%] rounded-full bg-white shadow-[0_0_20px_#fff]"
              style={{
                background: `radial-gradient(circle at center, #fff, ${primaryColor}aa)`,
              }}
            />
          </div>
        );

      default:
        return null;
    }
  };

  const getSpinnerComponent = () => {
    const commonProps = {
      color: primaryColor,
      size: size,
      speedMultiplier: speedMultiplier,
    };

    const spinnerMap: Record<string, JSX.Element> = {
      clock: <ClockLoader {...commonProps} />,
      grid: <GridLoader {...commonProps} />,
      hash: <HashLoader {...commonProps} />,
      pulse: <PulseLoader {...commonProps} />,
      ring: <RingLoader {...commonProps} />,
      scale: <ScaleLoader {...commonProps} />,
      beat: <BeatLoader {...commonProps} />,
      sync: <SyncLoader {...commonProps} />,
      rise: <RiseLoader {...commonProps} />,
      moon: <MoonLoader {...commonProps} />,
      bounce: <BounceLoader {...commonProps} />,
      circle: <CircleLoader {...commonProps} />,
      clip: <ClipLoader {...commonProps} />,
      dot: <DotLoader {...commonProps} />,
      fade: <FadeLoader {...commonProps} />,
      propagate: <PropagateLoader {...commonProps} />,
      puff: <PuffLoader {...commonProps} />,
    };

    return spinnerMap[variant] || <RingLoader {...commonProps} />;
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      {variant === "tech-orbit" || variant === "galaxy"
        ? getCustomSpinner()
        : getSpinnerComponent()}

      {showLabel && (
        <motion.p
          className="text-muted-foreground mt-4 text-xs font-semibold tracking-widest uppercase"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {label}
        </motion.p>
      )}
    </div>
  );
}

export const SpinnerPresets = {
  GitHub: {
    variant: "tech-orbit" as const,
    size: 60,
    label: "Syncing Repository...",
    showLabel: true,
  },
  Page: {
    variant: "ring" as const,
    size: 50,
    label: "Loading Experience...",
    showLabel: true,
  },
  Button: {
    variant: "beat" as const,
    size: 14,
    showLabel: false,
  },
  Card: {
    variant: "pulse" as const,
    size: 30,
    showLabel: false,
  },
  FullScreen: {
    variant: "galaxy" as const,
    size: 100,
    label: "Initializing Intelligence...",
    showLabel: true,
  },
};
