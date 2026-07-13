"use client";

import { cn } from "@/lib/utils";
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
            <style
              dangerouslySetInnerHTML={{
                __html: `
              @keyframes spin { 100% { transform: rotate(360deg); } }
              @keyframes spin-reverse { 100% { transform: rotate(-360deg); } }
              @keyframes pulse-scale { 0%, 100% { transform: scale(1); opacity: 0.9; } 50% { transform: scale(1.15); opacity: 1; } }
              @keyframes particle-scale { 0%, 100% { transform: scale(0.8); } 50% { transform: scale(1.2); } }
            `,
              }}
            />

            {/* Background Ambient Glow */}
            <div
              className="absolute inset-0 rounded-full opacity-10 blur-2xl"
              style={{
                background: `radial-gradient(circle, ${primaryColor}, ${secondaryColor})`,
              }}
            />

            {/* Outer Orbiting Ring - Glass Effect */}
            <div
              className="absolute inset-0 rounded-full border-[2px] border-transparent"
              style={{
                borderTopColor: primaryColor,
                borderRightColor: `${primaryColor}22`,
                filter: `drop-shadow(0 0 8px ${primaryColor}66)`,
                animation: `spin ${2 / speedMultiplier}s linear infinite`,
              }}
            />

            {/* Inner Orbiting Ring - Reversed */}
            <div
              className="absolute inset-2 rounded-full border-[1.5px] border-transparent"
              style={{
                borderBottomColor: secondaryColor,
                borderLeftColor: `${secondaryColor}22`,
                filter: `drop-shadow(0 0 5px ${secondaryColor}66)`,
                animation: `spin-reverse ${1.5 / speedMultiplier}s linear infinite`,
              }}
            />

            {/* Core Pulsing Sphere */}
            <div
              className="relative z-10 flex items-center justify-center rounded-full shadow-lg"
              style={{
                width: size * 0.35,
                height: size * 0.35,
                background: `radial-gradient(circle at 30% 30%, #fff, ${primaryColor}, ${secondaryColor})`,
                boxShadow: `0 0 20px ${primaryColor}44`,
                animation: `pulse-scale ${1.2 / speedMultiplier}s ease-in-out infinite`,
              }}
            >
              {/* Inner Lens Flare Effect */}
              <div className="h-1/2 w-1/2 rounded-full bg-white/20 blur-[1px]" />
            </div>

            {/* Orbiting Particles */}
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  width: size,
                  height: size,
                  animation: `spin ${(2.5 + i * 0.5) / speedMultiplier}s linear infinite`,
                }}
              >
                <div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: i === 0 ? "#fff" : primaryColor,
                    boxShadow: `0 0 10px ${primaryColor}`,
                    marginLeft: "auto",
                    marginRight: "auto",
                    animation: `particle-scale 1s infinite`,
                  }}
                />
              </div>
            ))}
          </div>
        );

      case "galaxy":
        return (
          <div
            className="relative flex items-center justify-center"
            style={{ width: size, height: size }}
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
              @keyframes spin { 100% { transform: rotate(360deg); } }
              @keyframes spin-reverse { 100% { transform: rotate(-360deg); } }
            `,
              }}
            />
            {/* Primary Swirl */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, transparent, ${primaryColor}, transparent)`,
                WebkitMaskImage:
                  "radial-gradient(circle, transparent 35%, black 36%)",
                filter: `drop-shadow(0 0 12px ${primaryColor}88)`,
                animation: `spin ${2 / speedMultiplier}s linear infinite`,
              }}
            />
            {/* Secondary Swirl */}
            <div
              className="absolute inset-2 rounded-full opacity-50"
              style={{
                background: `conic-gradient(from 180deg, transparent, ${secondaryColor}, transparent)`,
                WebkitMaskImage:
                  "radial-gradient(circle, transparent 35%, black 36%)",
                animation: `spin-reverse ${3 / speedMultiplier}s linear infinite`,
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
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes pulse-opacity { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
      `,
        }}
      />
      {variant === "tech-orbit" || variant === "galaxy"
        ? getCustomSpinner()
        : getSpinnerComponent()}

      {showLabel && (
        <p
          className="text-muted-foreground mt-4 text-xs font-semibold tracking-widest uppercase"
          style={{ animation: "pulse-opacity 2s ease-in-out infinite" }}
        >
          {label}
        </p>
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
