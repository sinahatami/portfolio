"use client";

import { TechSphere } from "@/components/tech-sphere";
import { SectionContainer } from "@/components/section-container";

export function TechSphereSection() {
  return (
    <SectionContainer
      id="tech-universe"
      title="Tech Universe"
      subtitle="Interactive 3D visualization of my technology stack"
    >
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="aspect-square">
            <TechSphere className="mx-auto h-full w-full" />
          </div>
          <div className="text-muted-foreground mt-2 text-center">
            {" "}
            {/* Reduced margin */}
            <p className="text-sm">
              Drag to rotate • Scroll to zoom • Click technologies for details
            </p>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
