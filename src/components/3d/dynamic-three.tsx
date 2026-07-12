"use client";

import dynamic from "next/dynamic";

import { LoadingSpinner } from "../ui/loading-spinner";
import { preloadThreeOnInteraction } from "@/lib/three-loader";

// Preload on component mount
if (typeof window !== "undefined") {
  preloadThreeOnInteraction();
}

// Dynamic imports for 3D components
const DynamicTechSphere = dynamic(
  () => import("./tech-sphere").then((mod) => mod.TechSphere),
  {
    loading: () => (
      <div className="flex h-[400px] w-full items-center justify-center">
        <LoadingSpinner variant="tech-orbit" size={40} label="Loading 3D..." />
      </div>
    ),
    ssr: false,
  }
);

const DynamicARViewer = dynamic(
  () => import("./ar-viewer").then((mod) => mod.ARViewer),
  {
    loading: () => (
      <div className="flex h-[600px] w-full items-center justify-center rounded-2xl border border-dashed border-gray-700">
        <LoadingSpinner
          variant="tech-orbit"
          size={40}
          label="Loading AR Viewer..."
        />
      </div>
    ),
    ssr: false,
  }
);

interface DynamicThreeProps {
  component: "tech-sphere" | "ar-viewer";
  className?: string;
}

export function DynamicThree({ component, className = "" }: DynamicThreeProps) {
  const Component =
    component === "tech-sphere" ? DynamicTechSphere : DynamicARViewer;

  return (
    <div data-3d-section className={className}>
      <Component />
    </div>
  );
}
