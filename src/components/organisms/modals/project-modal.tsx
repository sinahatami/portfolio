import { X, ExternalLink } from "@/lib/icons";
import { Button } from "@/components";

interface ProjectModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  project: any;
  projectLink: any;
}

export function ProjectModal({
  showModal,
  setShowModal,
  project,
  projectLink,
}: ProjectModalProps) {
  if (!showModal) return null;

  return (
    <div
      className="animate-in fade-in fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm duration-200"
      onClick={() => setShowModal(false)}
    >
      <div
        className="animate-in zoom-in-95 relative m-4 w-full max-w-4xl rounded-2xl bg-gray-900 p-1 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 z-10"
          onClick={() => setShowModal(false)}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20" />

        <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between rounded-lg bg-black/50 p-4 backdrop-blur-sm">
          <div>
            <div className="font-medium">{project?.title}</div>
            <div className="text-muted-foreground text-sm">
              Interactive Demo
            </div>
          </div>
          <Button asChild>
            <a
              href={projectLink?.hrefLive || projectLink?.href}
              target="_blank"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Open Full Demo
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
