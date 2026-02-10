"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff } from "@/lib/icons";

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsOffline(!navigator.onLine);

      const handleOnline = () => setIsOffline(false);
      const handleOffline = () => setIsOffline(true);

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  if (!isOffline) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="fixed top-4 left-1/2 z-50 -translate-x-1/2"
      >
        <div className="flex items-center gap-2 rounded-lg bg-yellow-500/90 px-4 py-2 text-yellow-900 shadow-lg backdrop-blur-sm">
          <WifiOff className="h-4 w-4" />
          <span className="text-sm font-medium">
            You are offline. Some features may be limited.
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
