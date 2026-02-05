"use client";

import * as React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "cmdk";
import { useEffect, useState } from "react";
import { Mail, Phone, Github, Linkedin, Laptop, FileText } from "lucide-react";

export const CommandMenu = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <p className="border-t-muted bg-background text-muted-foreground fixed right-0 bottom-0 left-0 hidden border-t p-2 text-center text-xs md:block">
        Press{" "}
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-xs">⌘</span>K
        </kbd>{" "}
        to open the command menu
      </p>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-popover text-popover-foreground animate-in fade-in zoom-in-95 w-full max-w-lg overflow-hidden rounded-xl border shadow-2xl duration-200">
            <CommandInput
              placeholder="Type a command or search..."
              className="placeholder:text-muted-foreground flex h-12 w-full rounded-md border-b bg-transparent px-4 py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
            <CommandList className="max-h-[300px] overflow-x-hidden overflow-y-auto px-2 py-2">
              <CommandEmpty className="py-6 text-center text-sm">
                No results found.
              </CommandEmpty>

              <CommandGroup heading="Actions">
                <CommandItem
                  onSelect={() => runCommand(() => window.print())}
                  className="aria-selected:bg-accent aria-selected:text-accent-foreground hover:bg-accent hover:text-accent-foreground relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Print Resume</span>
                </CommandItem>
                <CommandItem
                  onSelect={() =>
                    runCommand(() =>
                      window.open(`mailto:hatamisinaa@gmail.com`, "_self")
                    )
                  }
                  className="aria-selected:bg-accent aria-selected:text-accent-foreground hover:bg-accent hover:text-accent-foreground relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Send Email</span>
                </CommandItem>
              </CommandGroup>

              <CommandSeparator className="bg-border my-1 h-px" />

              <CommandGroup heading="Links">
                <CommandItem
                  onSelect={() =>
                    runCommand(() =>
                      window.open("https://github.com/sinahatami", "_blank")
                    )
                  }
                  className="aria-selected:bg-accent aria-selected:text-accent-foreground hover:bg-accent hover:text-accent-foreground relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none"
                >
                  <Github className="mr-2 h-4 w-4" />
                  <span>GitHub</span>
                </CommandItem>
                <CommandItem
                  onSelect={() =>
                    runCommand(() =>
                      window.open(
                        "https://www.linkedin.com/in/sina-hatami/",
                        "_blank"
                      )
                    )
                  }
                  className="aria-selected:bg-accent aria-selected:text-accent-foreground hover:bg-accent hover:text-accent-foreground relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none"
                >
                  <Linkedin className="mr-2 h-4 w-4" />
                  <span>LinkedIn</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </div>
        </div>
      </CommandDialog>
    </>
  );
};
