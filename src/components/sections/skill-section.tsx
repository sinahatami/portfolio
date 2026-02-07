"use client";

import { RESUME_DATA } from "@/data/resume-data";
import { SpotlightCard } from "../ui/spotlight-card";
import { BrainCircuit, Code2, ExternalLink, Info, Search } from "lucide-react";
import { useEffect, useState, useCallback, useRef } from "react";
import { useSkills } from "@/contexts/skills-context";
import { motion, AnimatePresence } from "framer-motion";
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

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  // FIX: Destructure with a comma to skip the first item (viewingProjects)
  // This avoids declaring an unused variable entirely.
  const [, setViewingProjects] = useState<any[]>([]);

  const viewRelatedProjects = useCallback((skillName: string) => {
    const skillKey =
      skillName.toLowerCase().split("/")[0] || skillName.toLowerCase();
    const relatedProjects = RESUME_DATA.projects.filter((p) =>
      p.techStack.some((tech) => tech.toLowerCase().includes(skillKey))
    );
    setViewingProjects(relatedProjects);
  }, []);

  // Event Listener for 3D/External clicks
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
      {/* Section Header */}
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

      <div className="mb-8">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search 50+ skills..."
            value={search}
            onChange={(e) => {
              const query = e.target.value.toLowerCase();
              setSearch(query);

              if (query) {
                const allSkills = [
                  ...RESUME_DATA.skills[0].items,
                  ...RESUME_DATA.skills[1].items,
                ];
                const filtered = allSkills.filter((skill) =>
                  skill.toLowerCase().includes(query)
                );
                setSearchResults(filtered);
              } else {
                setSearchResults([]);
              }
            }}
            className="focus:ring-accent w-full rounded-xl border border-white/20 bg-white/5 py-4 pr-6 pl-12 backdrop-blur-sm focus:ring-2 focus:outline-none"
          />
        </div>

        {/* Search results dropdown */}
        {search && (
          <div className="mt-4 rounded-xl border border-white/20 bg-black/50 p-4">
            <p className="text-muted-foreground mb-2 text-sm">
              Found {searchResults.length} skills
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {searchResults.map((skill) => {
                return (
                  <button
                    key={skill}
                    onClick={() => handleSkillClick(skill)}
                    className="bg-accent/20 hover:bg-accent/30 flex-shrink-0 rounded-lg px-3 py-1 text-sm whitespace-nowrap"
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Software Engineering Card */}
        <SpotlightCard className="overflow-hidden p-6 md:p-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="from-accent/20 rounded-xl bg-gradient-to-br to-blue-500/20 p-3">
              <Code2 className="text-accent h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Software Engineering</h3>
              <p className="text-muted-foreground text-sm">
                Click skills for details
              </p>
            </div>
          </div>

          <div className="mask-linear-fade flex gap-3 overflow-x-auto pt-1 pb-4">
            {RESUME_DATA.skills[0].items.map((skill) => {
              const detail = SKILL_DETAILS[skill];
              const isHovered = hoveredSkill === skill;

              return (
                <motion.button
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSkillClick(skill)}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`group relative min-w-[120px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border p-3 text-center transition-all duration-300 ${
                    isHovered
                      ? "border-accent bg-accent/10 shadow-accent/20 shadow-lg"
                      : "border-border bg-card hover:border-accent/50 hover:bg-accent/5"
                  }`}
                >
                  <div className="group-hover:text-accent relative z-10 w-full font-mono text-xs font-medium transition-colors">
                    {skill}
                  </div>

                  <motion.div
                    className="via-accent/10 absolute inset-0 bg-gradient-to-r from-transparent to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: isHovered ? "100%" : "-100%" }}
                    transition={{ duration: 0.6 }}
                  />

                  {detail && (
                    <Info className="text-accent/50 group-hover:text-accent absolute top-1 right-1 h-3 w-3" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </SpotlightCard>

        {/* Data Science & AI Card */}
        <SpotlightCard className="overflow-hidden p-6 md:p-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-3">
              <BrainCircuit className="h-7 w-7 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Data Science & AI</h3>
              <p className="text-muted-foreground text-sm">
                Click skills for details
              </p>
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto pt-1 pb-4">
            {RESUME_DATA.skills[1].items.map((skill) => {
              const detail = SKILL_DETAILS[skill];
              const isHovered = hoveredSkill === skill;

              return (
                <motion.button
                  key={skill}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSkillClick(skill)}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  className={`group relative min-w-[120px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border p-3 text-center transition-all duration-300 ${
                    isHovered
                      ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                      : "border-border bg-card hover:border-blue-500/50 hover:bg-blue-500/5"
                  }`}
                >
                  <div className="relative z-10 w-full font-mono text-xs font-medium transition-colors group-hover:text-blue-500">
                    {skill}
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: isHovered ? "100%" : "-100%" }}
                    transition={{ duration: 0.6 }}
                  />

                  {detail && (
                    <Info className="absolute top-1 right-1 h-3 w-3 text-blue-500/50 group-hover:text-blue-500" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </SpotlightCard>
      </div>

      {/* Related Projects Modal */}
      <AnimatePresence mode="wait">
        {selectedSkill && isMounted.current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-gray-900 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">
                    {selectedSkill.name}
                  </h3>
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <p className="mb-8 leading-relaxed text-gray-300">
                  {selectedSkill.description}
                </p>

                <div className="mb-8 grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                      Experience
                    </span>
                    <p className="font-medium text-white">
                      {selectedSkill.years} Years
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                      Projects
                    </span>
                    <p className="font-medium text-white">
                      {selectedSkill.projects}+ Completed
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      if (selectedSkill) {
                        const skillName = selectedSkill.name;
                        setSelectedSkill(null);
                        setTimeout(() => viewRelatedProjects(skillName), 300);
                      }
                    }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-500"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Related Projects (
                    {
                      RESUME_DATA.projects.filter((p) =>
                        p.techStack.some((tech) =>
                          tech
                            .toLowerCase()
                            .includes(
                              selectedSkill.name.toLowerCase().split("/")[0] ||
                                selectedSkill.name.toLowerCase()
                            )
                        )
                      ).length
                    }
                    )
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-muted-foreground mt-8 text-center text-sm">
        <p className="flex items-center justify-center gap-2">
          <span className="bg-accent inline-flex h-2 w-2 rounded-full" />
          Click any skill for detailed experience and project history
        </p>
      </div>
    </section>
  );
};
