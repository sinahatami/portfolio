import { RESUME_DATA } from "@/data/resume-data";
import { SpotlightCard } from "../ui/spotlight-card";
import { BrainCircuit, Code2 } from "lucide-react";

export const SkillSelection = () => {
  return (
    <section id="skills" className="container mx-auto max-w-5xl px-6 py-12">
      {/* Section Header to match Education style */}
      <h2 className="mb-12 flex items-center gap-4 text-3xl font-bold tracking-tight">
        Skills <span className="bg-border h-px flex-1"></span>
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Software Engineering Card */}
        <SpotlightCard className="flex flex-col gap-6 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-accent/10 text-accent rounded-xl p-3">
              <Code2 size={28} />
            </div>
            <h3 className="text-xl font-bold tracking-tight">
              Software Engineering
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {RESUME_DATA.skills[0].items.map((skill) => (
              <div
                key={skill}
                className="bg-muted/50 border-border/50 hover:border-accent/50 cursor-default rounded-md border px-3 py-1.5 font-mono text-xs shadow-sm transition-colors"
              >
                {skill}
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* Data Science & AI Card */}
        <SpotlightCard className="flex flex-col gap-6 p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
              <BrainCircuit size={28} />
            </div>
            <h3 className="text-xl font-bold tracking-tight">
              Data Science & AI
            </h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {RESUME_DATA.skills[1].items.map((skill) => (
              <div
                key={skill}
                className="bg-muted/50 border-border/50 cursor-default rounded-md border px-3 py-1.5 font-mono text-xs shadow-sm transition-colors hover:border-blue-500/50"
              >
                {skill}
              </div>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};
