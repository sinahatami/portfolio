"use client";

import { ExpandableList } from "@/components/common";
import { RESUME_DATA } from "@/data/resume-data";
import { ProjectCard } from "./project-card";

export const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="container mx-auto max-w-5xl scroll-mt-24 px-6 py-12 md:py-20"
    >
      <h2 className="mb-12 flex items-center gap-4 text-3xl font-bold tracking-tight">
        Featured Work <span className="bg-border h-px flex-1"></span>
      </h2>

      <ExpandableList
        initialCount={4}
        items={RESUME_DATA.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      />
    </section>
  );
};
