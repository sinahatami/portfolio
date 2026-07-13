import Link from "next/link";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail, ChevronRight } from "@/lib/icons";
import { Button } from "@/components/ui";
import { RESUME_DATA } from "@/data/resume-data";

interface MobileNavProps {
  isOpen: boolean;
  navLinks: Array<{ name: string; href: string; icon: React.ReactNode }>;
  activeSection: string;
  onLinkClick: () => void;
}

export const MobileNav = ({
  isOpen,
  navLinks,
  activeSection,
  onLinkClick,
}: MobileNavProps) => {
  if (!isOpen) return null;

  const isLinkActive = (href: string) => {
    if (href === "/blog") return activeSection === "blog";
    return activeSection === href.substring(2);
  };

  return (
    <div className="bg-background/95 animate-in slide-in-from-top-2 fixed inset-x-0 top-16 z-40 border-b backdrop-blur-xl duration-300 md:hidden">
      <div className="container px-6 py-4">
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all",
                isLinkActive(link.href)
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
              onClick={onLinkClick}
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.name}</span>
              <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
            </Link>
          ))}

          <div className="mt-4 flex gap-2 border-t pt-4">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <a
                href={RESUME_DATA.contact.social.github.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <a
                href={RESUME_DATA.contact.social.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </a>
            </Button>
          </div>

          <Button className="mt-2 w-full" asChild>
            <a href={`mailto:${RESUME_DATA.contact.email}`}>
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </a>
          </Button>
        </nav>
      </div>
    </div>
  );
};
