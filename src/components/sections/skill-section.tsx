import { RESUME_DATA } from "@/data/resume-data";
import { SpotlightCard } from "../ui/spotlight-card";
import { BrainCircuit, Code2, Layers, Database } from "lucide-react";

export const SkillSelection = () => {
  return (
    <section
      id="skills"
      className="container mx-auto max-w-5xl px-6 py-12 md:py-20"
    >
      {/* Section Header */}
      <div className="mb-12 md:mb-16">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Technical Expertise
          </h2>
          <span className="bg-border h-px flex-1"></span>
        </div>
        <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
          Technologies and tools I use to build scalable, performant
          applications
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Software Engineering Card */}
        <SpotlightCard className="p-6 md:p-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="from-accent/20 rounded-xl bg-gradient-to-br to-blue-500/20 p-3">
              <Code2 className="text-accent h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Frontend & Full-Stack</h3>
              <p className="text-muted-foreground text-sm">
                Modern web development
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {RESUME_DATA.skills[0].items.map((skill) => (
              <div
                key={skill}
                className="group bg-card hover:border-accent/50 hover:bg-accent/5 relative cursor-default overflow-hidden rounded-lg border p-3 text-center transition-all"
              >
                <div className="group-hover:text-accent font-mono text-xs font-medium transition-colors">
                  {skill}
                </div>
                {/* Hover effect */}
                <div className="via-accent/5 absolute inset-0 bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* Data Science & AI Card */}
        <SpotlightCard className="p-6 md:p-8">
          <div className="mb-6 flex items-center gap-4">
            <div className="rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-3">
              <BrainCircuit className="h-7 w-7 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Data Science & AI</h3>
              <p className="text-muted-foreground text-sm">
                Machine Learning & Analytics
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {RESUME_DATA.skills[1].items.map((skill) => (
              <div
                key={skill}
                className="group bg-card relative cursor-default overflow-hidden rounded-lg border p-3 text-center transition-all hover:border-blue-500/50 hover:bg-blue-500/5"
              >
                <div className="font-mono text-xs font-medium transition-colors group-hover:text-blue-500">
                  {skill}
                </div>
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};
