import { Github, Linkedin, Mail, Menu, X } from "@/lib/icons";
import { Button } from "@/components/ui";
import { RESUME_DATA } from "@/data/resume-data";
import { ThemeToggle } from "./theme-toggle";

interface NavbarActionsProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export const NavbarActions = ({
  isMenuOpen,
  onToggleMenu,
}: NavbarActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="hidden items-center gap-2 md:flex">
        <Button
          variant="ghost"
          size="icon"
          className="group relative overflow-hidden rounded-full"
          asChild
        >
          <a
            href={RESUME_DATA.contact.social.github.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
            <span className="from-accent/20 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="group relative overflow-hidden rounded-full"
          asChild
        >
          <a
            href={RESUME_DATA.contact.social.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
            <span className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </a>
        </Button>

        <Button
          size="sm"
          className="group from-accent relative overflow-hidden rounded-full bg-gradient-to-r to-blue-500 text-white shadow-lg hover:shadow-xl"
          asChild
        >
          <a href={`mailto:${RESUME_DATA.contact.email}`}>
            <Mail className="mr-2 h-4 w-4" />
            Contact
          </a>
        </Button>
      </div>

      <ThemeToggle />

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label="Toggle menu"
        onClick={onToggleMenu}
      >
        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </div>
  );
};
