"use client";

import { RESUME_DATA } from "@/data/resume-data";

import { BrainCircuit, Code2 } from "@/lib/icons";
import { useEffect, useState, useCallback, useRef } from "react";
import { SkillSearch } from "./skill-search";
import { SkillModal } from "./skill-modal";
import { SkillCategoryCard } from "./skill-category-card";
import { useSkills } from "@/contexts/skills-context";
import { SKILL_DETAILS } from "@/data/skill-details";

export const SkillSelection = () => {
  const { selectedSkill, setSelectedSkill, hoveredSkill, setHoveredSkill } =
    useSkills();

  const useIsMounted = () => {
    const isMounted = useRef(true);
    useEffect(() => {
      return () => {
        isMounted.current = false;
      };
    }, []);
    return isMounted;
  };

  const isMounted = useIsMounted();
  const [, setViewingProjects] = useState<any[]>([]);

  const viewRelatedProjects = useCallback((skillName: string) => {
    const skillKey =
      skillName.toLowerCase().split("/")[0] || skillName.toLowerCase();
    const relatedProjects = RESUME_DATA.projects.filter((p) =>
      p.techStack.some((tech) => tech.toLowerCase().includes(skillKey))
    );
    setViewingProjects(relatedProjects);
  }, []);

  useEffect(() => {
    const handleSkillClickFrom3D = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail) {
        setSelectedSkill(customEvent.detail);
        setTimeout(() => {
          const skillsSection = document.getElementById("skills");
          if (skillsSection) {
            skillsSection.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 100);
      }
    };

    window.addEventListener("skill-click", handleSkillClickFrom3D);
    document.addEventListener("skill-click", handleSkillClickFrom3D);

    return () => {
      window.removeEventListener("skill-click", handleSkillClickFrom3D);
      document.removeEventListener("skill-click", handleSkillClickFrom3D);
    };
  }, [setSelectedSkill]);

  const handleSkillClick = useCallback(
    (skill: string) => {
      const skillKey = Object.keys(SKILL_DETAILS).find(
        (key) =>
          skill.toLowerCase().includes(key.toLowerCase()) ||
          key.toLowerCase().includes(skill.toLowerCase())
      );

      if (skillKey) {
        const detail: any = SKILL_DETAILS[skillKey];
        setSelectedSkill(detail);
      } else {
        const fallbackDetail = {
          name: skill,
          description: `Proficient in ${skill}. Check my projects for implementation examples.`,
          level: 75,
          years: 2,
          projects: 3,
          category: "other" as const,
        };
        setSelectedSkill(fallbackDetail);
      }
    },
    [setSelectedSkill]
  );

  return (
    <section
      id="skills"
      className="container mx-auto max-w-5xl px-6 py-12 md:py-20"
    >
      <div className="mb-12 md:mb-16">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Technical Skills
          </h2>
          <span className="bg-border h-px flex-1"></span>
        </div>
        <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
          Click on any technology to see detailed experience and projects
        </p>
      </div>

      <SkillSearch onSkillClick={handleSkillClick} />

      <div className="grid gap-8 md:grid-cols-2">
        {/* Software Engineering Card */}
        <SkillCategoryCard
          title="Software Engineering"
          icon={<Code2 className="text-accent h-7 w-7" />}
          iconBgClass="from-accent/20 bg-gradient-to-br to-blue-500/10"
          skills={RESUME_DATA.skills[0]?.items || []}
          hoveredSkill={hoveredSkill}
          onSkillHover={setHoveredSkill}
          onSkillClick={handleSkillClick}
          themeClass="default"
        />

        {/* Data Science & AI Card */}
        <SkillCategoryCard
          title="Data Science & AI"
          icon={<BrainCircuit className="h-7 w-7 text-blue-500" />}
          iconBgClass="bg-gradient-to-br from-blue-500/20 to-purple-500/10"
          skills={RESUME_DATA.skills[1]?.items || []}
          hoveredSkill={hoveredSkill}
          onSkillHover={setHoveredSkill}
          onSkillClick={handleSkillClick}
          themeClass="blue"
        />
      </div>

      {selectedSkill && isMounted.current && (
        <SkillModal
          selectedSkill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
          onViewProjects={viewRelatedProjects}
        />
      )}

      <div className="text-muted-foreground mt-8 text-center text-sm">
        <p className="flex items-center justify-center gap-2">
          <span className="bg-accent inline-flex h-2 w-2 rounded-full" />
          Click any skill for detailed experience and project history
        </p>
      </div>
    </section>
  );
};
