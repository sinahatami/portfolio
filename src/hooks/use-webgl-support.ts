// --- FILE: ./src/hooks/use-webgl-support.ts ---
"use client";

import { useState, useEffect } from "react";

export function useWebGLSupport() {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const checkWebGL = () => {
      try {
        // Create a test canvas
        const canvas = document.createElement("canvas");

        // Try to get WebGL context with multiple fallbacks
        const gl =
          canvas.getContext("webgl") ||
          canvas.getContext("webgl2") ||
          canvas.getContext("experimental-webgl") ||
          (canvas as any).getContext("moz-webgl");

        // Check for specific WebGL features
        if (!gl) {
          setSupported(false);
          return;
        }

        // Additional checks for WebGL support
        const isSupported =
          gl instanceof WebGLRenderingContext ||
          gl instanceof (window as any).WebGL2RenderingContext;

        setSupported(isSupported);
      } catch (error) {
        console.warn("WebGL check failed:", error);
        setSupported(false);
      }
    };

    // Wait for next tick to avoid SSR issues
    const timer = setTimeout(checkWebGL, 0);

    return () => clearTimeout(timer);
  }, []);

  return { supported };
}
