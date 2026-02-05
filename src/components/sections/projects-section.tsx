"use client";

import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { RESUME_DATA } from "@/data/resume-data";
import { Github, Globe, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const ProjectsSection = () => {
  return (
    <section
      id="projects"
      className="container mx-auto max-w-5xl scroll-mt-24 px-6 py-12 md:py-20"
    >
      <h2 className="mb-12 flex items-center gap-4 text-3xl font-bold tracking-tight">
        Featured Work <span className="bg-border h-px flex-1"></span>
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {RESUME_DATA.projects.map((project) => (
          <SpotlightCard
            key={project.title}
            className="group flex h-full flex-col"
          >
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

                {/* ACTION LINKS */}
                <div className="flex items-center gap-3">
                  {/* GitHub Link */}
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-accent transition-colors"
                    title="View Source Code"
                  >
                    <Github size={20} />
                  </a>

                  {/* Live Demo Link - Conditional */}
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
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </CardContent>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
};
