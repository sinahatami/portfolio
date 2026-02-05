"use client"; // Client component because of ExpandableList
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ExpandableList } from "@/components/expandable-list";
import { RESUME_DATA } from "@/data/resume-data";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

export const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="container mx-auto max-w-5xl scroll-mt-24 px-6 py-12 md:py-20"
    >
      <h2 className="mb-12 flex items-center gap-4 text-3xl font-bold tracking-tight">
        Experience <span className="bg-border h-px flex-1"></span>
      </h2>

      <ExpandableList
        initialCount={3}
        items={RESUME_DATA.work.map((work) => (
          <SpotlightCard
            key={work.company}
            className="group grid items-start gap-6 p-6 md:grid-cols-[200px_1fr] md:p-8"
          >
            <div className="text-muted-foreground font-mono text-sm md:pt-1">
              {work.start} — {work.end}
            </div>
            <div className="space-y-4">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  {work.logoUrl && (
                    <div className="bg-muted/50 relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border p-1">
                      <Image
                        src={work.logoUrl}
                        alt={work.company}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="group-hover:text-accent text-xl font-bold transition-colors">
                        {work.company}
                      </h3>
                      {work.link && (
                        <a
                          href={work.link}
                          target="_blank"
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                    {work.summary && (
                      <p className="text-muted-foreground text-sm leading-snug italic">
                        {work.summary}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-foreground text-lg font-medium">
                  {work.title}
                </p>
              </div>

              <p className="text-muted-foreground border-border border-l-2 pl-4 text-sm leading-relaxed md:text-base">
                {work.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {work.badges.map((b) => (
                  <Badge
                    key={b}
                    variant="secondary"
                    className="bg-secondary/50 text-xs font-normal"
                  >
                    {b}
                  </Badge>
                ))}
              </div>
            </div>
          </SpotlightCard>
        ))}
      />
    </section>
  );
};
