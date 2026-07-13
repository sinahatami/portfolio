import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
} from "@/components/ui";
import { X, Code, ExternalLink } from "@/lib/icons";
import type { ProjectModel } from "./project-model";

export function ProjectDetailsPanel({
  project,
  onClose,
}: {
  project: ProjectModel;
  onClose: () => void;
}) {
  return (
    <div className="absolute right-4 bottom-4 left-4">
      <Card className="border-white/20 bg-black/90 backdrop-blur-md">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{project.title}</CardTitle>
            <Button size="icon" variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 text-sm">
            {project.description}
          </p>
          <div className="mb-4 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="bg-accent/20 text-accent rounded-full px-3 py-1 text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
          {project.link && (
            <Button size="sm" variant="outline" className="w-full" asChild>
              <a href={project.link} target="_blank" rel="noreferrer">
                <Code className="mr-2 h-4 w-4" />
                View Project
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
