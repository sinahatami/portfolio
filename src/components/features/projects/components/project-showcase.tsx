"use client";

import { useState } from "react";
import { Github, Play, Code, Globe } from "@/lib/icons";
import { Button } from "@/components/ui";
import { RESUME_DATA } from "@/data/resume-data";
import { ProjectSelector } from "./project-selector";
import { ProjectModal } from "./project-modal";

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
        {/* Left: Demo/Visual */}
        <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-gray-900 to-black">
          <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20" />

          {/* Demo Controls */}
          <div className="absolute right-4 bottom-4 left-4 flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-white/10 backdrop-blur-sm hover:bg-white/20"
              onClick={() => setShowModal(true)}
            >
              <Play className="mr-2 h-4 w-4" />
              Live Demo
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-black/50 backdrop-blur-sm"
              asChild
            >
              <a href={project?.link.href} target="_blank">
                <Code className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Right: Details */}
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-bold">{project?.title}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {project?.techStack.map((tech) => (
                <span
                  key={tech}
                  className="bg-accent/10 text-accent rounded-full px-3 py-1 text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {project?.description}
          </p>

          <div className="flex gap-4">
            <Button asChild className="flex-1">
              <a href={project?.link.href} target="_blank">
                <Github className="mr-2 h-4 w-4" />
                View Code
              </a>
            </Button>
            {projectLink?.hrefLive && (
              <Button variant="outline" asChild>
                <a href={projectLink.hrefLive} target="_blank">
                  <Globe className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>
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
