"use client";

import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ExpandableList } from "@/components/expandable-list";
import { RESUME_DATA } from "@/data/resume-data";
import { ExternalLink, Calendar, Briefcase } from "@/lib/icons";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { SectionContainer } from "@/components/section-container";
import { getOptimizedImageProps } from "@/lib/image-optimizer";

export const ExperienceSection = () => {
  return (
    <SectionContainer
      id="experience"
      title="Professional Experience"
      subtitle={`${RESUME_DATA.work.length} roles spanning ${RESUME_DATA.yearsExperience} years of industry experience`}
    >
      <ExpandableList
        initialCount={3}
        items={RESUME_DATA.work.map((work, _index) => (
          <div key={`${work.company}-${work.start}`} className="mb-6">
            <SpotlightCard className="group mb-6 transition-all hover:shadow-lg">
              <div className="flex flex-col gap-6 p-6 md:flex-row md:p-8">
                {/* Left Column */}
                <div className="flex flex-col gap-4 md:w-1/3 lg:w-1/4">
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span className="font-mono">
                      {work.start} — {work.end}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="relative h-14 w-14 content-center items-center justify-center overflow-hidden rounded-xl border bg-white/50 p-2 align-middle dark:bg-gray-900/50">
                      {work.logoUrl ? (
                        <OptimizedImage
                          {...getOptimizedImageProps(
                            work.logoUrl,
                            `${work.company} logo`,
                            "logo"
                          )}
                          className="object-contain"
                        />
                      ) : (
                        <div className="bg-accent/10 flex h-full w-full items-center justify-center rounded-lg">
                          <Briefcase className="text-accent h-6 w-6" />
                        </div>
                      )}
                    </div>

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

                  {work.summary && (
                    <p className="text-muted-foreground text-sm italic">
                      {work.summary}
                    </p>
                  )}
                </div>

                {/* Right Column */}
                <div className="border-border/50 flex flex-col gap-4 md:w-2/3 md:border-l md:pl-6 lg:w-3/4 lg:pl-8">
                  <div>
                    <p className="text-accent text-xl font-semibold">
                      {work.title}
                    </p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {work.description}
                  </p>

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
          </div>
        ))}
      />
    </SectionContainer>
  );
};
