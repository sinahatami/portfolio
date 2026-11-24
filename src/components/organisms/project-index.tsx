"use client";

import { useEffect, useState } from "react";
import { Button, Icon, TextLink } from "@/components/atoms";
import { ChoiceChips, EmptyState } from "@/components/molecules";
import type { YearMonth } from "@/domain/portfolio";
import { formatYearMonth } from "@/lib/dates";
import {
  PROJECT_DOMAIN_LABELS,
  filterProjects,
  projectFilterOptions,
  type ProjectFilter,
  type ProjectWithActivity,
} from "@/lib/projects";

interface ProjectIndexProps {
  projects: ProjectWithActivity[];
  /** How many projects to show before "Show all". */
  initialCount?: number;
}

export function ProjectIndex({
  projects,
  initialCount = 6,
}: ProjectIndexProps) {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [expanded, setExpanded] = useState(false);
  const [revealId, setRevealId] = useState<string | null>(null);

  // Deep links like #project-wildfire (e.g. from the skills section) reveal
  // the project even when it is filtered out or collapsed.
  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.replace(/^#project-/, "");
      if (id === window.location.hash || !projects.some((p) => p.id === id))
        return;
      setFilter("all");
      setExpanded(true);
      setRevealId(id);
    };
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [projects]);

  useEffect(() => {
    if (!revealId) return;
    const element = document.getElementById(`project-${revealId}`);
    element?.scrollIntoView({ block: "start", behavior: "instant" });
    element?.focus({ preventScroll: true });
    setRevealId(null);
  }, [revealId]);

  const matching = filterProjects(projects, filter);
  const visible = expanded ? matching : matching.slice(0, initialCount);
  const hiddenCount = matching.length - visible.length;
  const options = projectFilterOptions(projects);

  return (
    <div>
      <ChoiceChips
        label="Filter projects by area"
        options={options}
        value={filter}
        onChange={(value) => {
          setFilter(value);
          setExpanded(false);
        }}
        className="mb-6"
      />

      {visible.length === 0 ? (
        <EmptyState
          title="No projects in this area yet"
          description="Choose another area to see more work."
        />
      ) : (
        <ul className="border-foreground border-t-2">
          {visible.map((project) => (
            <li
              key={project.id}
              id={`project-${project.id}`}
              tabIndex={-1}
              className="border-border target:animate-mark focus-visible:outline-ring border-b outline-offset-2"
            >
              <ProjectRow project={project} />
            </li>
          ))}
        </ul>
      )}

      {hiddenCount > 0 || expanded ? (
        <div className="mt-6" data-print="hide">
          <Button
            variant="secondary"
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded
              ? "Show fewer projects"
              : `Show all ${matching.length} projects`}
            <Icon
              name="chevron-down"
              className={expanded ? "rotate-180" : undefined}
            />
          </Button>
        </div>
      ) : null}
    </div>
  );
}

/**
 * A project as one row: what it is, what it does and what it's built with,
 * then the live GitHub data and the links.
 */
function ProjectRow({ project }: { project: ProjectWithActivity }) {
  const areas = project.domains
    .map((domain) => PROJECT_DOMAIN_LABELS[domain])
    .join(", ");

  return (
    <article className="grid gap-x-8 gap-y-3 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.75fr)_9.5rem] md:py-7">
      <div>
        <h3 className="type-title text-[1.375rem] leading-tight text-balance">
          {project.title}
        </h3>
        <p className="text-muted-foreground mt-1 text-[0.9375rem]">
          <span className="sr-only">Areas: </span>
          {areas}
        </p>
      </div>

      <div className="max-w-[62ch]">
        <p>{project.description}</p>
        <p className="text-muted-foreground mt-3 text-sm">
          <span className="sr-only">Built with: </span>
          {project.stack.join(", ")}
        </p>
      </div>

      <div className="text-[0.9375rem] md:text-right">
        {project.activity ? (
          <p className="text-muted-foreground leading-snug">
            {project.activity.language ? (
              <span className="text-foreground block font-medium">
                {project.activity.language}
              </span>
            ) : null}
            Updated{" "}
            <time dateTime={project.activity.updatedAt}>
              {formatYearMonth(
                project.activity.updatedAt.slice(0, 7) as YearMonth
              )}
            </time>
          </p>
        ) : null}
        <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 md:justify-end">
          <TextLink
            href={project.sourceUrl}
            showExternalIcon={false}
            className="font-medium"
          >
            Source code
            <span className="sr-only"> for {project.title}</span>
          </TextLink>
          {project.liveUrl ? (
            <TextLink
              href={project.liveUrl}
              showExternalIcon={false}
              className="font-medium"
            >
              Live site
              <span className="sr-only"> of {project.title}</span>
            </TextLink>
          ) : null}
        </p>
      </div>
    </article>
  );
}
