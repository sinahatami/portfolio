"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ExpandableList } from "@/components/expandable-list"; // Import your list component
import { RESUME_DATA } from "@/data/resume-data";
import {
  Github,
  Globe,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/**
 * Individual Card Component
 * Manages the "Read More" for the text description
 */
const ProjectCard = ({
  project,
}: {
  project: (typeof RESUME_DATA.projects)[0];
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_CHARS = 160;
  const shouldTruncate = project.description.length > MAX_CHARS;

  const displayDescription = isExpanded
    ? project.description
    : shouldTruncate
      ? `${project.description.slice(0, MAX_CHARS)}...`
      : project.description;

  return (
    <SpotlightCard className="group flex h-full flex-col">
      <CardHeader className="p-6">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">
            <Link
              href={`/projects/${project.slug}`}
              className="hover:text-accent flex items-center gap-1 transition-colors"
            >
              {project.title}
              <ArrowUpRight
                size={14}
                className="opacity-0 transition-opacity group-hover:opacity-50"
              />
            </Link>
          </CardTitle>

          <div className="flex items-center gap-3">
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              title="View Source Code"
            >
              <Github size={20} />
            </a>

            {project.link.hrefLive && (
              <a
                href={project.link.hrefLive}
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

/**
 * Main Section Component
 * Uses ExpandableList to show/hide the number of cards
 */
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
        initialCount={4} // Shows 4 cards (2 rows on desktop) before "Show More"
        items={RESUME_DATA.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      />
    </section>
  );
};
