"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Play, Code, Globe } from "@/lib/icons";
import { Button } from "@/components/ui";
import { RESUME_DATA } from "@/data/resume-data";

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
      {/* Project Selector */}
      <div className="mb-8 flex flex-wrap gap-2">
        {RESUME_DATA.projects.map((proj, index) => (
          <Button
            key={proj.title}
            variant={activeProject === index ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveProject(index)}
            className="relative"
          >
            {proj.title.split(" ")[0]}
            {activeProject === index && (
              <motion.div
                layoutId="activeProject"
                className="bg-accent/20 absolute inset-0 rounded-md"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </Button>
        ))}
      </div>

      {/* Project Display */}
      <motion.div
        key={activeProject}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="grid gap-8 lg:grid-cols-2"
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
      </motion.div>

      {/* Demo Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative m-4 w-full max-w-4xl rounded-2xl bg-gray-900 p-1"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2 z-10"
                onClick={() => setShowModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20" />

              <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between rounded-lg bg-black/50 p-4 backdrop-blur-sm">
                <div>
                  <div className="font-medium">{project?.title}</div>
                  <div className="text-muted-foreground text-sm">
                    Interactive Demo
                  </div>
                </div>
                <Button asChild>
                  <a
                    href={projectLink?.hrefLive || projectLink?.href}
                    target="_blank"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Open Full Demo
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
