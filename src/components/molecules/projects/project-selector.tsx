import { Button } from "@/components/ui";
import { RESUME_DATA } from "@/data/resume-data";

interface ProjectSelectorProps {
  activeProject: number;
  setActiveProject: (index: number) => void;
}

export function ProjectSelector({
  activeProject,
  setActiveProject,
}: ProjectSelectorProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {RESUME_DATA.projects.map((proj, index) => (
        <Button
          key={proj.title}
          variant={activeProject === index ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveProject(index)}
          className="relative overflow-hidden transition-colors"
        >
          <span className="relative z-10">{proj.title.split(" ")[0]}</span>
          {activeProject === index && (
            <div className="bg-accent/20 absolute inset-0 rounded-md transition-all duration-300 ease-out" />
          )}
        </Button>
      ))}
    </div>
  );
}
