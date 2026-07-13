"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "../ui/loading-spinner";

import { TechSphereFallback2D } from "./tech-sphere-fallback";

// Main component
export function TechSphere({ className = "" }: { className?: string }) {
  const [isMobile, setIsMobile] = useState(false);
  const [webglError, setWebglError] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        window.innerWidth < 768 ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Check WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

      if (!gl) {
        setWebglError(true);
      }
    } catch (error) {
      setWebglError(true);
    }
  }, []);

  // Use 2D fallback on mobile or WebGL error
  if (isMobile || webglError) {
    return (
      <div className={`relative ${className}`}>
        <div className="rounded-2xl border border-gray-800 bg-black/50 p-4">
          <TechSphereFallback2D />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-gray-400 backdrop-blur-sm">
            2D Interactive View
          </div>
        </div>
      </div>
    );
  }

  // Dynamic import for 3D version
  const DynamicThree = dynamic(
    () => import("./dynamic-three").then((mod) => mod.DynamicThree),
    {
      ssr: false,
      loading: () => (
        <div
          className={`flex aspect-square w-full items-center justify-center ${className}`}
        >
          <LoadingSpinner
            variant="tech-orbit"
            size={40}
            label="Loading 3D..."
          />
        </div>
      ),
    }
  );

  return (
    <div className={`relative aspect-square w-full max-w-[500px] ${className}`}>
      <DynamicThree component="tech-sphere" />
    </div>
  );
}
