import { Play, Code } from "@/lib/icons";
import { Button } from "@/components/ui";

interface ProjectDemoVisualProps {
  setShowModal: (show: boolean) => void;
  projectLinkHref: string;
}

export function ProjectDemoVisual({
  setShowModal,
  projectLinkHref,
}: ProjectDemoVisualProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-gray-900 to-black">
      <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20" />

      {/* Demo Controls */}
      <div className="absolute right-4 bottom-4 left-4 flex gap-2">
        <Button
          size="sm"
          className="flex-1 bg-white/10 backdrop-blur-sm hover:bg-white/20"
          onClick={() => setShowModal(true)}
        >
          <Play className="mr-2 h-4 w-4" />
          Live Demo
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="bg-black/50 backdrop-blur-sm"
          asChild
        >
          <a href={projectLinkHref} target="_blank">
            <Code className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
}
