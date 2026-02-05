"use client";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ExpandableList } from "@/components/expandable-list";
import { RESUME_DATA } from "@/data/resume-data";
import { ExternalLink, Calendar, Briefcase } from "lucide-react";
import Image from "next/image";

export const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="container mx-auto max-w-5xl scroll-mt-24 px-6 py-12 md:py-20"
    >
      <div className="mb-12 md:mb-16">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Professional Experience
          </h2>
          <span className="bg-border h-px flex-1"></span>
        </div>
        <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
          {RESUME_DATA.work.length} roles spanning 5+ years of industry
          experience
        </p>
      </div>

      <ExpandableList
        initialCount={3}
        items={RESUME_DATA.work.map((work) => (
          <SpotlightCard
            key={`${work.company}-${work.start}`}
            className="group transition-all hover:shadow-lg"
          >
            <div className="flex flex-col gap-6 p-6 md:flex-row md:p-8">
              {/* Left Column - Timeline, Logo & Badges */}
              <div className="flex flex-col gap-4 md:w-1/3 lg:w-1/4">
                {/* Timeline */}
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span className="font-mono">
                    {work.start} — {work.end}
                  </span>
                </div>

                {/* Logo */}
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-xl border bg-white/50 p-2 dark:bg-gray-900/50">
                    {work.logoUrl ? (
                      <Image
                        src={work.logoUrl}
                        alt={`${work.company} logo`}
                        fill
                        className="object-contain"
                        sizes="56px"
                      />
                    ) : (
                      <div className="bg-accent/10 flex h-full w-full items-center justify-center rounded-lg">
                        <Briefcase className="text-accent h-6 w-6" />
                      </div>
                    )}
                  </div>

                  {/* Company Name */}
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="group-hover:text-accent text-lg font-bold transition-colors">
                        {work.company}
                      </h3>
                      {work.link && (
                        <a
                          href={work.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-accent transition-colors"
                          aria-label={`Visit ${work.company} website`}
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Summary */}
                {work.summary && (
                  <p className="text-muted-foreground text-sm italic">
                    {work.summary}
                  </p>
                )}
              </div>

              {/* Right Column - Details (Now takes full remaining width) */}
              <div className="border-border/50 flex flex-col gap-4 md:w-2/3 md:border-l md:pl-6 lg:w-3/4 lg:pl-8">
                {/* Title */}
                <div>
                  <p className="text-accent text-xl font-semibold">
                    {work.title}
                  </p>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {work.description}
                </p>

                {/* Technologies - Now properly spaced at the bottom */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {work.badges.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="bg-secondary/30 hover:bg-accent/10 hover:text-accent hover:border-accent text-xs font-normal transition-all duration-200"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </SpotlightCard>
        ))}
      />
    </section>
  );
};
