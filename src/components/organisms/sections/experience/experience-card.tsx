import { SpotlightCard } from "@/components";
import { ExperienceCompanyInfo } from "./experience-company-info";
import { ExperienceRoleDetails } from "./experience-role-details";

interface ExperienceCardProps {
  work: {
    company: string;
    start: string;
    end: string;
    logoUrl?: string;
    link?: string;
    summary?: string;
    title: string;
    description: string;
    badges: string[];
  };
}

export const ExperienceCard = ({ work }: ExperienceCardProps) => {
  return (
    <div className="mb-6">
      <SpotlightCard className="group mb-6 transition-all hover:shadow-lg">
        <div className="flex flex-col gap-6 p-6 md:flex-row md:p-8">
          {/* Left Column */}
          <ExperienceCompanyInfo
            start={work.start}
            end={work.end}
            company={work.company}
            logoUrl={work.logoUrl}
            link={work.link}
            summary={work.summary}
          />

          {/* Right Column */}
          <ExperienceRoleDetails
            title={work.title}
            description={work.description}
            badges={work.badges}
          />
        </div>
      </SpotlightCard>
    </div>
  );
};
