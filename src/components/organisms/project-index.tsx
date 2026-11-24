"use client";

import { useEffect, useState } from "react";
import { Button, Icon, Roundel } from "@/components/atoms";
import { ChoiceChips, EmptyState, TagList } from "@/components/molecules";
import type { ProjectDomain } from "@/domain/portfolio";
import { formatYearMonth } from "@/lib/dates";
import {
  PROJECT_DOMAIN_LABELS,
  filterProjects,
  projectFilterOptions,
  type ProjectFilter,
  type ProjectWithActivity,
} from "@/lib/projects";
import { cn } from "@/lib/utils";

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
  const options = projectFilterOptions(projects).map((option) =>
    option.value === "all"
      ? option
      : { ...option, leading: <Roundel domain={option.value} /> }
  );

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
        className="mb-8"
      />

      {visible.length === 0 ? (
        <EmptyState
          title="No projects in this area yet"
          description="Choose another area to see more work."
        />
      ) : (
        <ul className="grid gap-5 md:gap-6 lg:grid-cols-2">
          {visible.map((project) => (
            <li
              key={project.id}
              id={`project-${project.id}`}
              tabIndex={-1}
              className="ticket-shadow focus-visible:outline-ring rounded-lg outline-offset-4"
            >
              <ProjectTicket project={project} />
            </li>
          ))}
        </ul>
      )}

      {hiddenCount > 0 || expanded ? (
        <div className="mt-10 flex justify-center" data-print="hide">
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

const DOMAIN_STRIPE: Record<ProjectDomain, string> = {
  web: "bg-domain-web",
  ml: "bg-domain-ml",
  data: "bg-domain-data",
  systems: "bg-domain-systems",
};

/**
 * A project as a transit ticket: the route stripe in its areas' colours, the
 * fare details, and a tear-off stub with live GitHub data and the links.
 */
function ProjectTicket({ project }: { project: ProjectWithActivity }) {
  const areas = project.domains
    .map((domain) => PROJECT_DOMAIN_LABELS[domain])
    .join(", ");

  return (
    <article className="ticket bg-ticket flex h-full flex-col rounded-lg [--stub:4.25rem]">
      <div aria-hidden className="flex h-2 overflow-hidden rounded-t-lg">
        {project.domains.map((domain) => (
          <span key={domain} className={cn("flex-1", DOMAIN_STRIPE[domain])} />
        ))}
      </div>

      <div className="flex flex-1 flex-col px-6 pt-5 pb-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="type-title text-[1.65rem] leading-tight">
            {project.title}
          </h3>
          <p className="flex shrink-0 gap-1 pt-0.5">
            <span className="sr-only">Areas: {areas}</span>
            {project.domains.map((domain) => (
              <Roundel key={domain} domain={domain} />
            ))}
          </p>
        </div>
        <p className="mt-2 max-w-[62ch]">{project.description}</p>
        <TagList
          items={project.stack}
          label={`Built with`}
          className="mt-auto pt-5"
        />
      </div>

      <div className="before:border-border relative flex h-(--stub) shrink-0 items-center justify-between gap-4 px-6 text-sm before:absolute before:inset-x-5 before:top-0 before:border-t-2 before:border-dashed">
        {project.activity ? (
          <p className="min-w-0 leading-tight">
            {project.activity.language ? (
              <span className="block truncate font-semibold">
                {project.activity.language}
              </span>
            ) : null}
            <span className="text-muted-foreground">
              Updated{" "}
              <time dateTime={project.activity.updatedAt}>
                {formatYearMonth(
                  project.activity.updatedAt.slice(
                    0,
                    7
                  ) as `${number}-${number}`
                )}
              </time>
            </span>
          </p>
        ) : (
          <span />
        )}
        <div className="flex shrink-0 gap-2">
          <Button asChild variant="secondary" size="sm">
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="github" />
              Code
              <span className="sr-only">
                {" "}
                for {project.title} (opens in a new tab)
              </span>
            </a>
          </Button>
          {project.liveUrl ? (
            <Button asChild variant="primary" size="sm">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Live
                <span className="sr-only">
                  {" "}
                  version of {project.title} (opens in a new tab)
                </span>
              </a>
            </Button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
