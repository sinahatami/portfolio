import { RESUME_DATA } from "@/data/resume-data";
import { Github, Linkedin } from "@/lib/icons";
import { LucideIcon } from "lucide-react";

const SocialIcons: Record<string, LucideIcon> = {
  github: Github as LucideIcon,
  linkedin: Linkedin as LucideIcon,
};

export function FooterSocial() {
  return (
    <div className="flex gap-6">
      {Object.entries(RESUME_DATA.contact.social).map(([name, platform]) => {
        const Icon = SocialIcons[platform.iconName] || Github;
        return (
          <a
            key={name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={platform.name}
            className="group text-muted-foreground hover:bg-accent/10 hover:text-accent flex items-center justify-center rounded-full p-2 transition-all duration-300 hover:-translate-y-1"
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}
