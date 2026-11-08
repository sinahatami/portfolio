import { Github, Globe } from "@/lib/icons";
import { Button } from "@/components/ui";

interface ProjectDetailsTextProps {
  project: any;
  projectLink: { href: string; hrefLive?: string };
}

export function ProjectDetailsText({
  project,
  projectLink,
}: ProjectDetailsTextProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">{project?.title}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {project?.techStack.map((tech: string) => (
            <span
              key={tech}
              className="bg-accent/10 text-accent rounded-full px-3 py-1 text-xs font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <p className="text-muted-foreground leading-relaxed">
        {project?.description}
      </p>

      <div className="flex gap-4">
        <Button asChild className="flex-1">
          <a href={projectLink?.href} target="_blank">
            <Github className="mr-2 h-4 w-4" />
            View Code
          </a>
        </Button>
        {projectLink?.hrefLive && (
          <Button variant="outline" asChild>
            <a href={projectLink.hrefLive} target="_blank">
              <Globe className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
