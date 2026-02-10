"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    if (!isLoading && progress >= 100) {
      // Wait a tiny bit to show 100%, then trigger exit
      const timer = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, progress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={cn(
            "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm",
            className
          )}
        >
          <div className="w-full max-w-md px-6 text-center">
            {/* Name & Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <div className="mb-2 text-3xl font-bold tracking-tight text-white">
                {RESUME_DATA.name}
              </div>
              <div className="text-sm font-medium tracking-widest text-gray-400 uppercase">
                {RESUME_DATA.position}
              </div>
            </motion.div>

            {/* Progress Bar Container */}
            <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
              {/* The Moving Bar */}
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-[length:200%_100%]"
                initial={{ width: "0%" }}
                animate={{
                  width: `${progress}%`,
                  backgroundPosition: ["0% 50%", "100% 50%"], // Shimmer effect
                }}
                transition={{
                  width: { duration: 0.2, ease: "easeOut" },
                  backgroundPosition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              />
            </div>

            {/* Percentage & Status Text */}
            <div className="mt-4 flex items-center justify-between font-mono text-xs text-gray-500">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {progress < 100 ? "Loading assets..." : "Initializing..."}
              </motion.span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
