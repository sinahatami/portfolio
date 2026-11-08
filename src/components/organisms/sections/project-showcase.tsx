"use client";

import { useState } from "react";
import { RESUME_DATA } from "@/data/resume-data";
import { ProjectSelector } from "@/components/molecules/projects/project-selector";
import { ProjectModal } from "@/components/organisms/modals/project-modal";
import { ProjectDemoVisual } from "@/components/molecules/projects/project-demo-visual";
import { ProjectDetailsText } from "@/components/molecules/projects/project-details-text";

interface ProjectShowcaseProps {
  projectIndex?: number;
}

export function ProjectShowcase({ projectIndex = 0 }: ProjectShowcaseProps) {
  const [activeProject, setActiveProject] = useState(projectIndex);
  const [showModal, setShowModal] = useState(false);

  const project = RESUME_DATA.projects[activeProject];

  const projectLink = project?.link as { href: string; hrefLive?: string };

  return (
    <>
      <ProjectSelector
        activeProject={activeProject}
        setActiveProject={setActiveProject}
      />

      {/* Project Display */}
      <div
        className="animate-in fade-in slide-in-from-bottom-4 grid gap-8 duration-500 lg:grid-cols-2"
        key={activeProject}
      >
        <ProjectDemoVisual
          setShowModal={setShowModal}
          projectLinkHref={projectLink?.href}
        />
        <ProjectDetailsText project={project} projectLink={projectLink} />
      </div>

      <ProjectModal
        showModal={showModal}
        setShowModal={setShowModal}
        project={project}
        projectLink={projectLink}
      />
    </>
  );
}
