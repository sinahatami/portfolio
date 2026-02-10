import { RESUME_DATA } from "@/data/resume-data";
import { SpotlightCard } from "../ui/spotlight-card";
import { GraduationCap, ExternalLink, Calendar } from "@/lib/icons";
import { OptimizedImage } from "../ui/optimized-image";
import { getOptimizedImageProps } from "@/lib/image-optimizer";

export const EducationSection = () => {
  return (
    <section
      id="education"
      className="container mx-auto max-w-5xl scroll-mt-24 px-6 py-12 md:py-20"
    >
      <h2 className="mb-12 flex items-center gap-4 text-3xl font-bold tracking-tight">
        Education <span className="bg-border h-px flex-1"></span>
      </h2>

      <div className="flex flex-col gap-8">
        {RESUME_DATA.education.map((edu: any) => (
          <SpotlightCard key={edu.school} className="p-6">
            <div className="flex flex-col gap-6 md:flex-row md:gap-8">
              {/* LEFT COLUMN: Date, Logo, School Name */}
              <div className="flex flex-col gap-3 md:w-60 md:shrink-0">
                {/* Date */}
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span className="font-mono">
                    {edu.start} — {edu.end}
                  </span>
                </div>

                {/* Logo & School Name Block */}
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 flex-shrink-0 content-center items-center justify-center overflow-hidden rounded-xl border bg-white/50 p-2 align-middle dark:bg-gray-900/50">
                    {edu.logoUrl ? (
                      <OptimizedImage
                        {...getOptimizedImageProps(
                          edu.logoUrl,
                          `${edu.school} logo`,
                          "logo"
                        )}
                        className="object-contain"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center">
                        <GraduationCap className="text-accent h-5 w-5" />
                      </div>
                    )}
                  </div>

                  {/* School Name with Link - Pushing icon to the right */}
                  <div className="flex-1 text-sm leading-tight font-semibold">
                    {edu.link ? (
                      <a
                        href={edu.link}
                        target="_blank"
                        className="hover:text-accent group/link flex items-start justify-between gap-2 transition-colors"
                      >
                        <span>{edu.school}</span>
                        <ExternalLink
                          size={14}
                          className="shrink-0 opacity-50 transition-all group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:opacity-100"
                        />
                      </a>
                    ) : (
                      edu.school
                    )}
                  </div>
                </div>

                {/* Optional: Short sub-caption for school if needed */}
                <p className="text-muted-foreground text-xs italic">
                  {/* You can put a short generic description here if your data has it, e.g. "University" */}
                </p>
              </div>

              {/* VERTICAL DIVIDER (Visible on Desktop) */}
              <div className="bg-border hidden w-px md:block" />

              {/* RIGHT COLUMN: Degree & Description */}
              <div className="flex flex-1 flex-col justify-start gap-2">
                <h3 className="text-accent text-xl font-bold">{edu.degree}</h3>

                {edu.notes && (
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {edu.notes}
                  </p>
                )}

                {/* Tags (if your education data has tags, render them here similar to the screenshot) */}
                {/* <div className="mt-2 flex flex-wrap gap-2">
                   {edu.tags?.map(tag => <Badge key={tag}>{tag}</Badge>)}
                </div> 
                */}
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
};
