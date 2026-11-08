import { CommandGroup, CommandItem } from "cmdk";
import { Mail, Github, Linkedin, FileText, Moon, Sun } from "@/lib/icons";
import { RESUME_DATA } from "@/data/resume-data";

interface CommandActionsProps {
  runCommand: (command: () => unknown) => void;
  theme: string | undefined;
  setTheme: (theme: string) => void;
}

export const CommandActions = ({
  runCommand,
  theme,
  setTheme,
}: CommandActionsProps) => {
  return (
    <CommandGroup
      heading="Actions"
      className="text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium"
    >
      <CommandItem
        value="print-resume"
        onSelect={() => runCommand(() => window.print())}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          runCommand(() => window.print());
        }}
        className="aria-selected:bg-accent aria-selected:text-accent-foreground relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none"
      >
        <FileText className="mr-2 h-4 w-4" />
        <span>Print Resume</span>
      </CommandItem>

      <CommandItem
        value="send-email"
        onSelect={() =>
          runCommand(() =>
            window.open(`mailto:${RESUME_DATA.contact.email}`, "_self")
          )
        }
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          runCommand(() =>
            window.open(`mailto:${RESUME_DATA.contact.email}`, "_self")
          );
        }}
        className="aria-selected:bg-accent aria-selected:text-accent-foreground relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none"
      >
        <Mail className="mr-2 h-4 w-4" />
        <span>Send Email</span>
      </CommandItem>

      <CommandItem
        value="toggle-theme"
        onSelect={() =>
          runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))
        }
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          runCommand(() => setTheme(theme === "dark" ? "light" : "dark"));
        }}
        className="aria-selected:bg-accent aria-selected:text-accent-foreground relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none"
      >
        {theme === "dark" ? (
          <Sun className="mr-2 h-4 w-4" />
        ) : (
          <Moon className="mr-2 h-4 w-4" />
        )}
        <span>Toggle Theme</span>
      </CommandItem>
    </CommandGroup>
  );
};

export const CommandLinks = ({
  runCommand,
}: {
  runCommand: (command: () => unknown) => void;
}) => {
  return (
    <CommandGroup
      heading="Links"
      className="text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium"
    >
      <CommandItem
        value="github"
        onSelect={() =>
          runCommand(() =>
            window.open(RESUME_DATA.contact.social.github.url, "_blank")
          )
        }
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          runCommand(() =>
            window.open(RESUME_DATA.contact.social.github.url, "_blank")
          );
        }}
        className="aria-selected:bg-accent aria-selected:text-accent-foreground relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none"
      >
        <Github className="mr-2 h-4 w-4" />
        <span>GitHub</span>
      </CommandItem>
      <CommandItem
        value="linkedin"
        onSelect={() =>
          runCommand(() =>
            window.open("https://www.linkedin.com/in/sina-hatami/", "_blank")
          )
        }
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          runCommand(() =>
            window.open("https://www.linkedin.com/in/sina-hatami/", "_blank")
          );
        }}
        className="aria-selected:bg-accent aria-selected:text-accent-foreground relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none"
      >
        <Linkedin className="mr-2 h-4 w-4" />
        <span>LinkedIn</span>
      </CommandItem>
    </CommandGroup>
  );
};
