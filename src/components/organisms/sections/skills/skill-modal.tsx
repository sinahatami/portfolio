import { ExternalLink } from "@/lib/icons";

interface SkillModalProps {
  selectedSkill: any;
  onClose: () => void;
  onViewProjects: (skillName: string) => void;
}

export const SkillModal = ({
  selectedSkill,
  onClose,
  onViewProjects,
}: SkillModalProps) => {
  if (!selectedSkill) return null;

  return (
    <div
      className="bg-background/80 animate-in fade-in fixed inset-0 z-[1000] flex items-center justify-center p-4 backdrop-blur-md duration-200"
      onClick={onClose}
    >
      <div
        className="border-border bg-card animate-in zoom-in-95 slide-in-from-bottom-5 relative w-full max-w-lg overflow-hidden rounded-2xl border shadow-2xl duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-2xl font-bold">{selectedSkill.name}</h3>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            {selectedSkill.description}
          </p>

          <div className="mb-8 grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                Experience
              </span>
              <p className="font-medium">{selectedSkill.years} Years</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                Projects
              </span>
              <p className="font-medium">{selectedSkill.projects}+ Completed</p>
            </div>
          </div>

          <button
            onClick={() => {
              const skillName = selectedSkill.name;
              onClose();
              setTimeout(() => onViewProjects(skillName), 300);
            }}
            className="bg-accent text-accent-foreground flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-medium transition-opacity hover:opacity-90"
          >
            <ExternalLink className="h-4 w-4" />
            View Related Projects
          </button>
        </div>
      </div>
    </div>
  );
};
