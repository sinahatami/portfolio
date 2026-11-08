"use client";

import { ExpandableList } from "@/components/common";
import { RESUME_DATA } from "@/data/resume-data";
import { SectionContainer } from "@/components/common";
import { ExperienceCard } from "./experience-card";

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
          <ExperienceCard key={`${work.company}-${work.start}`} work={work} />
        ))}
      />
    </SectionContainer>
  );
};
