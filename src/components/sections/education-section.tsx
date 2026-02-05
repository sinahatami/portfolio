import { RESUME_DATA } from "@/data/resume-data";
import { SpotlightCard } from "../ui/spotlight-card";
import Image from "next/image";
import { GraduationCap, ExternalLink } from "lucide-react";

export const EducationSection = () => {
  return (
    <section
      id="education"
      className="container mx-auto max-w-5xl scroll-mt-24 px-6 py-12 md:py-20"
    >
      <h2 className="mb-12 flex items-center gap-4 text-3xl font-bold tracking-tight">
        Education <span className="bg-border h-px flex-1"></span>
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {RESUME_DATA.education.map((edu) => (
          <SpotlightCard key={edu.school} className="flex flex-col gap-4 p-6">
            <div className="flex items-start justify-between gap-4">
              {edu.logoUrl ? (
                <div className="bg-muted/50 relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border p-1.5">
                  <Image
                    src={edu.logoUrl}
                    alt={edu.school}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="bg-secondary rounded-xl p-3">
                  <GraduationCap className="text-accent h-8 w-8" />
                </div>
              )}
              <span className="text-muted-foreground font-mono text-xs whitespace-nowrap">
                {edu.start} - {edu.end}
              </span>
            </div>

            <div>
              {/* UPDATED HEADER WITH LINK SUPPORT */}
              <h3 className="flex items-center gap-2 text-lg leading-tight font-bold">
                {edu.link ? (
                  <a
                    href={edu.link}
                    target="_blank"
                    className="hover:text-accent group/link flex items-center gap-2 transition-colors"
                  >
                    {edu.school}
                    <ExternalLink
                      size={14}
                      className="opacity-50 transition-opacity group-hover/link:opacity-100"
                    />
                  </a>
                ) : (
                  edu.school
                )}
              </h3>
              <p className="text-accent pt-1 text-sm font-medium">
                {edu.degree}
              </p>
            </div>

            {edu.notes && (
              <p className="text-muted-foreground border-border/50 mt-auto border-t pt-3 text-sm leading-relaxed">
                {edu.notes}
              </p>
            )}
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
};
