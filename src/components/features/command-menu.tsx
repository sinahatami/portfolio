"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";
import { Mail, Github, Linkedin, FileText } from "@/lib/icons";
import { RESUME_DATA } from "@/data/resume-data";

export const CommandMenu = () => {
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    // Adding a tiny delay ensures the dialog starts closing
    // before the print/mailto window takes over focus
    setTimeout(() => {
      command();
    }, 100);
  }, []);

  return (
    <>
      {/* Keyboard Shortcut Hint */}
      <p className="border-t-muted bg-background/95 supports-[backdrop-filter]:bg-background/60 text-muted-foreground fixed right-0 bottom-0 left-0 z-50 hidden border-t p-2 text-center text-xs backdrop-blur md:block">
        Press{" "}
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-xs">{isMac ? "⌘" : "Ctrl"}</span>K
        </kbd>{" "}
        to open the command menu
      </p>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="animate-in fade-in fixed inset-0 z-50 bg-black/50 backdrop-blur-sm duration-200" />

          <Dialog.Content className="bg-background animate-in zoom-in-95 fixed top-[50%] left-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] overflow-hidden border p-0 shadow-lg duration-200 sm:rounded-lg">
            <Dialog.Title className="sr-only">Command Menu</Dialog.Title>
            <Dialog.Description className="sr-only">
              Quickly access links and actions
            </Dialog.Description>

            <Command className="bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden">
              <CommandInput
                autoFocus
                placeholder="Type a command or search..."
                className="placeholder:text-muted-foreground flex h-12 w-full border-b bg-transparent px-4 py-3 text-sm outline-none"
              />
              <CommandList className="max-h-[300px] overflow-x-hidden overflow-y-auto p-2">
                <CommandEmpty className="py-6 text-center text-sm">
                  No results found.
                </CommandEmpty>

                <CommandGroup
                  heading="Actions"
                  className="text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium"
                >
                  <CommandItem
                    value="print-resume"
                    onSelect={() => runCommand(() => window.print())}
                    // REPLACED cursor-default with cursor-pointer and removed data-[disabled] classes
                    className="aria-selected:bg-accent aria-selected:text-accent-foreground relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Print Resume</span>
                  </CommandItem>

                  <CommandItem
                    value="send-email"
                    onSelect={() =>
                      runCommand(() =>
                        window.open(
                          `mailto:${RESUME_DATA.contact.email}`,
                          "_self"
                        )
                      )
                    }
                    className="aria-selected:bg-accent aria-selected:text-accent-foreground relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Send Email</span>
                  </CommandItem>
                </CommandGroup>

                <CommandSeparator className="bg-border -mx-1 my-2 h-px" />

                <CommandGroup
                  heading="Links"
                  className="text-foreground [&_[cmdk-group-heading]]:text-muted-foreground overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium"
                >
                  <CommandItem
                    value="github"
                    onSelect={() =>
                      runCommand(() =>
                        window.open(
                          RESUME_DATA.contact.social.github.url,
                          "_blank"
                        )
                      )
                    }
                    className="aria-selected:bg-accent aria-selected:text-accent-foreground relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    <span>GitHub</span>
                  </CommandItem>
                  <CommandItem
                    value="linkedin"
                    onSelect={() =>
                      runCommand(() =>
                        window.open(
                          "https://www.linkedin.com/in/sina-hatami/",
                          "_blank"
                        )
                      )
                    }
                    className="aria-selected:bg-accent aria-selected:text-accent-foreground relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none"
                  >
                    <Linkedin className="mr-2 h-4 w-4" />
                    <span>LinkedIn</span>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
