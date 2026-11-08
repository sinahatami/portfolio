import { Badge } from "@/components";

interface ExperienceRoleDetailsProps {
  title: string;
  description: string;
  badges: string[];
}

export const ExperienceRoleDetails = ({
  title,
  description,
  badges,
}: ExperienceRoleDetailsProps) => {
  return (
    <div className="border-border/50 flex flex-col gap-4 md:w-2/3 md:border-l md:pl-6 lg:w-3/4 lg:pl-8">
      <div>
        <p className="text-accent text-xl font-semibold">{title}</p>
      </div>

      <p className="text-muted-foreground leading-relaxed">{description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {badges.map((tech) => (
          <Badge
            key={tech}
            variant="outline"
            className="bg-secondary/30 hover:bg-accent/10 hover:text-accent hover:border-accent text-xs font-normal transition-all duration-200"
          >
            {tech}
          </Badge>
        ))}
      </div>
    </div>
  );
};
