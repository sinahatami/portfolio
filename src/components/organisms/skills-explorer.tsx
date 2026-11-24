"use client";

import { Fragment, useState } from "react";
import { Button, Icon, TextLink } from "@/components/atoms";
import type { EvidenceColumn, RankedSkill, SkillWithUsage } from "@/lib/skills";
import { cn } from "@/lib/utils";

interface SkillsExplorerProps {
  /** Skills with evidence, most-used first. */
  skills: RankedSkill[];
  /** Skills in the toolkit that no listed role or project uses yet. */
  unused: string[];
  columns: { roles: EvidenceColumn[]; projects: EvidenceColumn[] };
  /** Rows shown before "Show all". */
  initialCount?: number;
}

const plural = (count: number, word: string) =>
  `${count} ${word}${count === 1 ? "" : "s"}`;

/**
 * Skills as evidence: a matrix of skills against the roles and projects that
 * used them. Choosing a skill lists that evidence with links underneath.
 */
export function SkillsExplorer({
  skills,
  unused,
  columns,
  initialCount = 12,
}: SkillsExplorerProps) {
  const [selected, setSelected] = useState(skills[0]?.name ?? null);
  const [expanded, setExpanded] = useState(false);
  const rows = expanded ? skills : skills.slice(0, initialCount);
  const current = skills.find((skill) => skill.name === selected);
  const groups = [
    { id: "roles", label: "Roles", items: columns.roles },
    { id: "projects", label: "Projects", items: columns.projects },
  ].filter((group) => group.items.length > 0);

  return (
    <div>
      <div className="relative -mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
        <table className="border-collapse text-[0.9375rem]">
          <caption className="sr-only">
            Skills, and the roles and projects that used each one
          </caption>
          <thead>
            <tr>
              <th scope="col" className="bg-background sticky left-0 z-10">
                <span className="sr-only">Skill</span>
              </th>
              <th scope="col">
                <span className="sr-only">Uses</span>
              </th>
              {groups.map((group, index) => (
                <Fragment key={group.id}>
                  {index > 0 ? <td /> : null}
                  {group.items.map((column) => (
                    <th
                      key={column.id}
                      scope="col"
                      title={column.title}
                      className="w-9 min-w-9 p-0 align-bottom font-normal"
                    >
                      <div className="relative h-36">
                        <span className="text-muted-foreground absolute bottom-1 left-1/2 w-[10.5rem] origin-bottom-left -rotate-[55deg] truncate text-left text-sm">
                          {column.label}
                        </span>
                      </div>
                    </th>
                  ))}
                </Fragment>
              ))}
            </tr>
            <tr>
              <td className="bg-background sticky left-0 z-10" />
              <td />
              {groups.map((group, index) => (
                <Fragment key={group.id}>
                  {index > 0 ? <td className="w-5" /> : null}
                  <th
                    scope="colgroup"
                    colSpan={group.items.length}
                    className="border-foreground border-b-2 pt-2 pb-1 pl-2 text-left text-[0.9375rem] font-semibold"
                  >
                    {group.label}
                  </th>
                </Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((skill) => {
              const isSelected = skill.name === selected;
              return (
                <tr
                  key={skill.name}
                  onClick={() => setSelected(skill.name)}
                  className={cn(
                    "group cursor-pointer",
                    isSelected
                      ? "bg-accent-wash [--loom-float:var(--color-accent)] [--loom-row:var(--color-accent-wash)]"
                      : "hover:bg-muted hover:[--loom-row:var(--color-muted)]"
                  )}
                >
                  <th
                    scope="row"
                    className={cn(
                      "sticky left-0 z-20 p-0 text-left font-semibold",
                      isSelected
                        ? "bg-accent-wash"
                        : "bg-background group-hover:bg-muted"
                    )}
                  >
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      aria-label={`${skill.name}, ${plural(skill.count, "use")}`}
                      onClick={() => setSelected(skill.name)}
                      className="block w-full py-2 pr-4 pl-2 text-left whitespace-nowrap sm:w-48"
                    >
                      {skill.name}
                    </button>
                  </th>
                  <td
                    aria-hidden
                    className={cn(
                      "tabular pr-4 text-right font-semibold",
                      isSelected ? "text-accent" : "text-muted-foreground"
                    )}
                  >
                    {skill.count}
                  </td>
                  {groups.map((group, index) => {
                    const used = group.items.map((column) =>
                      usedIn(skill, group.id, column.id)
                    );
                    return (
                      <Fragment key={group.id}>
                        {index > 0 ? <td /> : null}
                        {group.items.map((column, at) => (
                          <Cell
                            key={column.id}
                            used={used[at] ?? false}
                            joinsLeft={used[at - 1] ?? false}
                            joinsRight={used[at + 1] ?? false}
                            selected={isSelected}
                          />
                        ))}
                      </Fragment>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {skills.length > initialCount ? (
        <div className="mt-4" data-print="hide">
          <Button
            variant="secondary"
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded
              ? "Show fewer skills"
              : `Show all ${skills.length} skills`}
            <Icon
              name="chevron-down"
              className={expanded ? "rotate-180" : undefined}
            />
          </Button>
        </div>
      ) : null}

      <div aria-live="polite" className="mt-10">
        {current ? <SkillEvidence skill={current} /> : null}
      </div>

      {unused.length > 0 ? (
        <p className="text-muted-foreground mt-8 max-w-[70ch] text-[0.9375rem]">
          Also in the toolkit, not yet on a listed role or project:{" "}
          {unused.join(", ")}.
        </p>
      ) : null}
    </div>
  );
}

function usedIn(skill: SkillWithUsage, group: string, id: string) {
  const list = group === "roles" ? skill.usage.roles : skill.usage.projects;
  return list.some((item) => item.id === id);
}

function Cell({
  used,
  joinsLeft,
  joinsRight,
  selected,
}: {
  used: boolean;
  joinsLeft: boolean;
  joinsRight: boolean;
  selected: boolean;
}) {
  return (
    <td
      className={cn(
        "loom-cell h-10",
        selected && "[--loom-weft:var(--color-accent)]"
      )}
    >
      {used ? (
        <>
          <span
            aria-hidden
            className={cn(
              "loom-float",
              joinsLeft ? "-left-px rounded-l-none" : "left-[18%]",
              joinsRight ? "-right-px rounded-r-none" : "right-[18%]"
            )}
          />
          <span className="sr-only">Used</span>
        </>
      ) : null}
    </td>
  );
}

function SkillEvidence({ skill }: { skill: RankedSkill }) {
  const { roles, projects } = skill.usage;
  return (
    <div className="border-foreground grid gap-x-10 gap-y-6 border-t-2 pt-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,2.4fr)]">
      <div>
        <h3 className="type-title text-2xl">{skill.name}</h3>
        <p className="text-muted-foreground mt-1">
          {plural(roles.length, "role")} and{" "}
          {plural(projects.length, "project")}
        </p>
      </div>
      <EvidenceList
        title="Roles"
        items={roles.map((role) => ({
          ...role,
          href: `#experience-${role.id}`,
        }))}
      />
      <EvidenceList
        title="Projects"
        items={projects.map((project) => ({
          ...project,
          href: `#project-${project.id}`,
        }))}
      />
    </div>
  );
}

function EvidenceList({
  title,
  items,
}: {
  title: string;
  items: { id: string; label: string; href: string }[];
}) {
  if (items.length === 0) return <div />;
  return (
    <div>
      <h4 className="text-muted-foreground text-[0.9375rem] font-medium">
        {title}
      </h4>
      <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <TextLink href={item.href} className="font-medium">
              {item.label}
            </TextLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
