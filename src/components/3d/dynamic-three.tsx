"use client";

import { Suspense, lazy, useState, useEffect } from "react";
import { LoadingSpinner } from "../ui/loading-spinner";
import {
  loadThree,
  loadDrei,
  preloadThreeOnInteraction,
} from "@/lib/three-loader";

// import { useWebGLSupport } from "@/hooks/use-webgl-support";

// Preload on component mount
preloadThreeOnInteraction();

// Dynamic imports for 3D components
const DynamicTechSphere = lazy(() =>
  import("./tech-sphere")
    .then((mod) => ({
      default: mod.TechSphere,
    }))
    .catch(() => ({
      default: () => (
        <div className="flex h-[400px] items-center justify-center">
          <p className="text-gray-500">3D component failed to load</p>
        </div>
      ),
    }))
);

const DynamicARViewer = lazy(() =>
  import("./ar-viewer")
    .then((mod) => ({
      default: mod.ARViewer,
    }))
    .catch(() => ({
      default: () => (
        <div className="flex h-[600px] items-center justify-center rounded-2xl border border-dashed border-gray-700">
          <p className="text-gray-500">AR Viewer unavailable</p>
        </div>
      ),
    }))
);

interface DynamicThreeProps {
  component: "tech-sphere" | "ar-viewer";
  className?: string;
}

export function DynamicThree({ component, className = "" }: DynamicThreeProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Start loading 3D libraries
    Promise.all([loadThree(), loadDrei()])
      .then(() => setIsLoaded(true))
      .catch(() => setIsLoaded(true)); // Still show component even if load fails
  }, []);

  const Component =
    component === "tech-sphere" ? DynamicTechSphere : DynamicARViewer;

  return (
    <div data-3d-section className={className}>
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <LoadingSpinner
              variant="tech-orbit"
              size={40}
              label="Loading 3D..."
            />
          </div>
        }
      >
        {isLoaded ? (
          <Component />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <LoadingSpinner variant="pulse" size={30} label="Preparing 3D..." />
          </div>
        )}
      </Suspense>
    </div>
  );
}
