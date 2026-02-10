// --- FILE: ./src/components/ui/optimized-canvas.tsx ---
"use client";

import React, { Suspense, useState, useEffect } from "react";
import { Canvas, CanvasProps } from "@react-three/fiber";
import type { WebGLRendererParameters } from "three";
import { LoadingSpinner } from "./loading-spinner";
import { useWebGLSupport } from "@/hooks/use-webgl-support";

interface OptimizedCanvasProps extends CanvasProps {
  fallbackComponent?: React.ReactNode;
}

export function OptimizedCanvas({
  children,
  fallbackComponent,
  className = "",
  ...props
}: OptimizedCanvasProps) {
  const { supported: webglSupported } = useWebGLSupport();
  const [hasError, setHasError] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Only run on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Error UI
  const ErrorUI = fallbackComponent || (
    <div
      className={`flex h-full w-full flex-col items-center justify-center rounded-lg border border-gray-800 bg-black p-8 text-center ${className}`}
    >
      <div>
        <h3 className="mb-2 text-lg font-bold text-white">
          3D Experience Unavailable
        </h3>
        <p className="mb-4 text-sm text-gray-400">
          Your browser or device doesn't support WebGL 3D graphics.
        </p>
        <div className="space-y-2 text-xs text-gray-500">
          <p>• Try updating your browser to the latest version</p>
          <p>• Enable hardware acceleration in browser settings</p>
          <p>• Use Chrome, Firefox, or Edge for best results</p>
        </div>
      </div>
    </div>
  );

  // Loading state
  if (!isClient || webglSupported === null) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center ${className}`}
      >
        <LoadingSpinner variant="tech-orbit" size={40} />
      </div>
    );
  }

  // WebGL not supported
  if (webglSupported === false || hasError) {
    return ErrorUI;
  }

  // Safe WebGL context creation with error handling
  const safeGLConfig: Partial<WebGLRendererParameters> = {
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: false,
    powerPreference: "default" as WebGLPowerPreference,
    failIfMajorPerformanceCaveat: false, // Allow software rendering fallback
  };

  return (
    <Canvas
      className={className}
      frameloop="demand" // Changed from "always" to save resources
      dpr={[1, 1.5]} // Lower DPR for performance
      gl={safeGLConfig}
      onCreated={(state) => {
        // Log WebGL info for debugging
        const glContext = state.gl.getContext();
        if (glContext) {
          console.log("WebGL Info:", {
            vendor: glContext.getParameter(glContext.VENDOR),
            renderer: glContext.getParameter(glContext.RENDERER),
            version: glContext.getParameter(glContext.VERSION),
          });
        }
      }}
      onError={(error) => {
        console.error("WebGL Error:", error);
        setHasError(true);
      }}
      {...props}
    >
      <Suspense fallback={<LoadingSpinner variant="tech-orbit" />}>
        {children}
      </Suspense>
    </Canvas>
  );
}
