"use client";

import { useState } from "react";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ExpandableList } from "@/components/expandable-list";
import { RESUME_DATA } from "@/data/resume-data";
import {
  Github,
  Globe,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
} from "@/lib/icons";

interface ProjectCardProps {
  // We use 'any' here to prevent the build error where TypeScript
  // complains that some projects don't have 'hrefLive'.
  project: any;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_CHARS = 250;

  // Safe check for description
  const description = project.description || "";
  const shouldTruncate = description.length > MAX_CHARS;

  const displayDescription = isExpanded
    ? description
    : shouldTruncate
      ? `${description.slice(0, MAX_CHARS)}...`
      : description;

  // Safe link access
  const linkHref = project.link?.href || "#";
  const linkLive = project.link?.hrefLive;

  return (
    <SpotlightCard className="group flex h-full flex-col">
      <CardHeader className="p-6">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">
            {/* Title links to the main project URL (usually GitHub or Live) */}
            <a
              href={linkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent flex items-center gap-1 transition-colors"
            >
              {project.title}
              <ArrowUpRight
                size={14}
                className="opacity-0 transition-opacity group-hover:opacity-50"
              />
            </a>
          </CardTitle>

          <div className="flex items-center gap-3">
            {/* GitHub Link */}
            {linkHref && linkHref !== "#" && (
              <a
                href={linkHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                title="View Source Code"
              >
                <Github size={20} />
              </a>
            )}

            {/* Live Demo Link (Only renders if hrefLive exists) */}
            {linkLive && (
              <a
                href={linkLive}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                title="View Live Demo"
              >
                <Globe size={20} />
              </a>
            )}
          </div>
        </div>

        <CardDescription className="pt-2 font-mono text-xs">
          {project.techStack.join(" • ")}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 p-6 pt-0">
        <p className="text-muted-foreground text-sm leading-relaxed">
          {displayDescription}
        </p>

        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-accent mt-3 flex items-center gap-1 text-xs font-semibold hover:underline"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp size={12} />
              </>
            ) : (
              <>
                Read More <ChevronDown size={12} />
              </>
            )}
          </button>
        )}
      </CardContent>
    </SpotlightCard>
  );
};

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
