import { SpotlightCard } from "@/components";
import { EducationSchoolInfo } from "./education-school-info";
import { EducationDetails } from "./education-details";

interface EducationCardProps {
  edu: {
    school: string;
    start: string;
    end: string;
    degree: string;
    logoUrl?: string;
    link?: string;
    notes?: string;
  };
}

export const EducationCard = ({ edu }: EducationCardProps) => {
  return (
    <SpotlightCard className="p-6">
      <div className="flex flex-col gap-6 md:flex-row md:gap-8">
        {/* LEFT COLUMN: Date, Logo, School Name */}
        <EducationSchoolInfo
          start={edu.start}
          end={edu.end}
          school={edu.school}
          logoUrl={edu.logoUrl}
          link={edu.link}
        />

        {/* VERTICAL DIVIDER (Visible on Desktop) */}
        <div className="bg-border hidden w-px md:block" />

        {/* RIGHT COLUMN: Degree & Description */}
        <EducationDetails degree={edu.degree} notes={edu.notes} />
      </div>
    </SpotlightCard>
  );
};
