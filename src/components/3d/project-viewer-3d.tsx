"use client";

import { useState } from "react";
import { OptimizedCanvas } from "@/components/ui";
import { ProjectScene } from "./project-scene";
import { ProjectDetailsPanel } from "./project-details-panel";
import type { ProjectModel } from "./project-model";

export function ProjectViewer3D() {
  const [selectedProject, setSelectedProject] = useState<ProjectModel | null>(
    null
  );

  const handleProjectClick = (project: ProjectModel) => {
    setSelectedProject(project);
  };

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-white/10">
      <OptimizedCanvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
        }}
      >
        <ProjectScene onProjectClick={handleProjectClick} />
      </OptimizedCanvas>

      {/* Project Details Panel */}
      {selectedProject && (
        <ProjectDetailsPanel
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Instructions */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-xl border border-white/20 bg-black/50 p-3 backdrop-blur-sm">
        <p className="text-xs text-white">
          Drag to rotate • Scroll to zoom • Click cubes for details
        </p>
      </div>
    </div>
  );
}
