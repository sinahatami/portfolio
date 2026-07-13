"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { RESUME_DATA } from "@/data/resume-data";

interface ProgressLoaderProps {
  progress: number;
  isLoading: boolean;
  className?: string;
}

export function ProgressLoader({
  progress,
  isLoading,
  className,
}: ProgressLoaderProps) {
  const [show, setShow] = useState(true);

  // Handle the exit delay internally
  useEffect(() => {
    if (isLoading || progress < 100) {
      return;
    }
    const timer = setTimeout(() => setShow(false), 500);
    return () => clearTimeout(timer);
  }, [isLoading, progress]);

  if (!show) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm transition-all duration-500",
        className,
        progress === 100 && !isLoading
          ? "pointer-events-none scale-95 opacity-0 blur-md"
          : "scale-100 opacity-100 blur-none"
      )}
    >
      <div className="w-full max-w-md px-6 text-center">
        {/* Name & Title */}
        <div className="animate-in slide-in-from-top-4 fade-in mb-8 duration-500">
          <div className="mb-2 text-3xl font-bold tracking-tight text-white">
            {RESUME_DATA.name}
          </div>
          <div className="text-sm font-medium tracking-widest text-gray-400 uppercase">
            {RESUME_DATA.position}
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
          {/* The Moving Bar */}
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_100%] transition-all duration-200 ease-out"
            style={{
              width: `${progress}%`,
              animation: "shimmer 2s linear infinite",
            }}
          />
        </div>

        {/* Percentage & Status Text */}
        <div className="mt-4 flex items-center justify-between font-mono text-xs text-gray-500">
          <span className="animate-pulse">
            {progress < 100 ? "Loading assets..." : "Initializing..."}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `,
        }}
      />
    </div>
  );
}
