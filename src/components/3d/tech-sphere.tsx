// --- FILE: ./src/components/tech-sphere.tsx ---
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { LoadingSpinner } from "../ui/loading-spinner";

// Alternative 2D fallback component
const TechSphereFallback2D = () => {
  const skills = [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Python",
    "TensorFlow",
    "AWS",
    "Docker",
  ];

  return (
    <div className="relative aspect-square w-full max-w-[500px]">
      {/* Background gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />

      {/* Animated orbs */}
      <div className="relative h-full w-full">
        {skills.map((skill, index) => {
          const angle = (index * 2 * Math.PI) / skills.length;
          const radius = 180;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={skill}
              className="absolute top-1/2 left-1/2"
              style={{
                x,
                y,
                marginLeft: -40,
                marginTop: -40,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                delay: index * 0.1,
                repeat: Infinity,
              }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm">
                <span className="text-xs font-bold text-white">{skill}</span>
              </div>
            </motion.div>
          );
        })}

        {/* Center sphere */}
        <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="h-full w-full rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
        </div>
      </div>
    </div>
  );
};

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
