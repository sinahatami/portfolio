"use client";

import { useState } from "react";
import { TextLink } from "@/components/atoms";
import type { SkillGroupWithUsage, SkillWithUsage } from "@/lib/skills";
import { cn } from "@/lib/utils";

interface SkillsExplorerProps {
  groups: SkillGroupWithUsage[];
}

const evidenceCount = (skill: SkillWithUsage) =>
  skill.usage.roles.length + skill.usage.projects.length;

const plural = (count: number, word: string) =>
  `${count} ${word}${count === 1 ? "" : "s"}`;

/**
 * Skills as evidence: choosing a skill shows, on a departure board, the roles
 * and projects that used it, instead of self-rated percentages.
 */
export function SkillsExplorer({ groups }: SkillsExplorerProps) {
  const [selected, setSelected] = useState<{
    group: string;
    skill: SkillWithUsage;
  } | null>(() => {
    const first = groups[0];
    const skill = first?.skills.find((s) => evidenceCount(s) > 0);
    return first && skill ? { group: first.id, skill } : null;
  });

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,1fr)] lg:gap-14">
      <div className="grid content-start gap-9">
        {groups.map((group) => (
          <div key={group.id}>
            <h3 className="type-title text-xl">{group.title}</h3>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label={group.title}>
              {group.skills.map((skill) => {
                const count = evidenceCount(skill);
                const isSelected =
                  selected?.group === group.id &&
                  selected.skill.name === skill.name;
                return (
                  <li key={skill.name}>
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      {...(count > 0
                        ? {
                            "aria-label": `${skill.name}, ${plural(count, "use")}`,
                          }
                        : {})}
                      onClick={() => setSelected({ group: group.id, skill })}
                      className={cn(
                        "inline-flex h-9 items-center gap-2 rounded-full border-2 pr-1.5 pl-3.5 font-medium transition-[color,background-color,border-color,transform] duration-150 active:scale-[0.97]",
                        count === 0 && "pr-3.5",
                        isSelected
                          ? "border-signal bg-signal text-signal-foreground"
                          : count > 0
                            ? "border-foreground/80 hover:bg-foreground hover:text-background"
                            : "border-border text-muted-foreground hover:border-foreground/50"
                      )}
                    >
                      {skill.name}
                      {count > 0 ? (
                        <span
                          aria-hidden
                          className={cn(
                            "tabular grid h-6 min-w-6 place-items-center rounded-full px-1.5 text-xs font-semibold",
                            isSelected
                              ? "bg-signal-foreground text-signal"
                              : "bg-muted text-foreground"
                          )}
                        >
                          {count}
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div
          aria-live="polite"
          className="board board-map overflow-hidden rounded-lg p-6 shadow-[0_24px_48px_-24px_rgb(9_19_48/0.6)] md:p-7"
        >
          {selected ? (
            <SkillEvidence skill={selected.skill} />
          ) : (
            <p className="text-muted-foreground">
              Choose a skill to see the roles and projects where I used it.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function SkillEvidence({ skill }: { skill: SkillWithUsage }) {
  const { roles, projects } = skill.usage;
  const empty = roles.length === 0 && projects.length === 0;

  return (
    <div key={skill.name}>
      <p className="text-muted-foreground text-sm">Departures for</p>
      <h4 className="type-display text-signal motion-safe:animate-flap mt-1 origin-top text-4xl leading-none font-extrabold">
        {skill.name}
      </h4>
      <p className="text-muted-foreground mt-2 text-sm">
        {empty
          ? "Part of my toolkit, but not tagged on a listed role or project yet."
          : `${plural(roles.length, "role")} and ${plural(projects.length, "project")}`}
      </p>
      {empty ? null : (
        <>
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
        </>
      )}
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
  if (items.length === 0) return null;
  return (
    <div className="mt-6">
      <h5 className="text-muted-foreground font-semibold">{title}</h5>
      <ul className="border-border mt-2 border-t">
        {items.map((item, index) => (
          <li
            key={item.id}
            className="border-border motion-safe:animate-flap flex items-center gap-3 border-b py-2.5"
            style={{ animationDelay: `${index * 45}ms` }}
          >
            <span
              aria-hidden
              className="border-foreground size-3 shrink-0 rounded-full border-[3px]"
            />
            <TextLink href={item.href} tone="quiet" className="font-medium">
              {item.label}
            </TextLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
