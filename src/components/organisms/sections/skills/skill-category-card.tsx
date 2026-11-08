import { SpotlightCard } from "@/components";
import { Info } from "@/lib/icons";
import { SKILL_DETAILS } from "@/data/skill-details";
import { cn } from "@/lib/utils";

interface SkillCategoryCardProps {
  title: string;
  icon: React.ReactNode;
  iconBgClass: string;
  skills: string[];
  hoveredSkill: string | null;
  onSkillHover: (skill: string | null) => void;
  onSkillClick: (skill: string) => void;
  themeClass?: "default" | "blue";
}

export const SkillCategoryCard = ({
  title,
  icon,
  iconBgClass,
  skills,
  hoveredSkill,
  onSkillHover,
  onSkillClick,
  themeClass = "default",
}: SkillCategoryCardProps) => {
  const isBlueTheme = themeClass === "blue";

  return (
    <SpotlightCard className="overflow-hidden p-6 md:p-8" hoverEffect="glow">
      <div className="mb-6 flex items-center gap-4">
        <div className={cn("rounded-xl p-3", iconBgClass)}>{icon}</div>
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-muted-foreground text-sm">
            Click skills for details
          </p>
        </div>
      </div>

      <div className="no-scrollbar grid grid-flow-col grid-rows-2 gap-3 overflow-x-auto p-1 pt-1 pb-4">
        {skills.map((skill) => {
          const detail = SKILL_DETAILS[skill];
          const isHovered = hoveredSkill === skill;

          return (
            <button
              key={skill}
              onClick={() => onSkillClick(skill)}
              onMouseEnter={() => onSkillHover(skill)}
              onMouseLeave={() => onSkillHover(null)}
              className={cn(
                "group relative min-w-[120px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border p-3 text-center transition-all duration-300 hover:scale-105 active:scale-95",
                isBlueTheme
                  ? isHovered
                    ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                    : "border-border bg-card hover:border-blue-500/50 hover:bg-blue-500/5"
                  : isHovered
                    ? "border-accent bg-accent/10 shadow-accent/20 shadow-lg"
                    : "border-border bg-card hover:border-accent/50 hover:bg-accent/5"
              )}
            >
              <div
                className={cn(
                  "relative z-10 w-full font-mono text-xs font-medium transition-colors",
                  isBlueTheme
                    ? "group-hover:text-blue-500"
                    : "group-hover:text-accent"
                )}
              >
                {skill}
              </div>
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-r transition-transform duration-500",
                  isBlueTheme
                    ? "from-transparent via-blue-500/10 to-transparent"
                    : "via-accent/10 from-transparent to-transparent",
                  isHovered ? "translate-x-full" : "-translate-x-full"
                )}
              />
              {detail && (
                <Info
                  className={cn(
                    "absolute top-1 right-1 h-3 w-3",
                    isBlueTheme
                      ? "text-blue-500/50 group-hover:text-blue-500"
                      : "text-accent/50 group-hover:text-accent"
                  )}
                />
              )}
            </button>
          );
        })}
      </div>
    </SpotlightCard>
  );
};
