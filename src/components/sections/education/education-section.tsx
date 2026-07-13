import { RESUME_DATA } from "@/data/resume-data";
import { EducationCard } from "./education-card";

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
          <EducationCard key={edu.school} edu={edu} />
        ))}
      </div>
    </section>
  );
};
