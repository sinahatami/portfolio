"use client";

import { useState } from "react";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui";
import { SpotlightCard } from "@/components/ui";
import {
  Github,
  Globe,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
} from "@/lib/icons";

interface ProjectCardProps {
  project: any;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_CHARS = 250;

  const description = project.description || "";
  const shouldTruncate = description.length > MAX_CHARS;

  const displayDescription = isExpanded
    ? description
    : shouldTruncate
      ? `${description.slice(0, MAX_CHARS)}...`
      : description;

  const linkHref = project.link?.href || "#";
  const linkLive = project.link?.hrefLive;

  return (
    <SpotlightCard className="group flex h-full flex-col">
      <CardHeader className="p-6">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">
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
            {linkHref && linkHref !== "#" && (
              <a
                href={linkHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent p-1 transition-colors"
                title="View Source Code"
                aria-label="View Source Code"
              >
                <Github size={20} />
              </a>
            )}

            {linkLive && (
              <a
                href={linkLive}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent p-1 transition-colors"
                title="View Live Demo"
                aria-label="View Live Demo"
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
