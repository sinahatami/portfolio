"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";
import { Command as CommandIcon } from "@/lib/icons";
import { useTheme } from "next-themes";
import { CommandActions, CommandLinks } from "./command-groups";

export const CommandMenu = () => {
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const { theme, setTheme } = useTheme();

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

      {/* Mobile Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="border-border bg-background hover:bg-accent hover:text-accent-foreground fixed right-16 bottom-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border shadow-2xl transition-all md:hidden"
        aria-label="Open command menu"
      >
        <CommandIcon className="h-4 w-4" />
      </button>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="animate-in fade-in fixed inset-0 z-50 bg-black/50 backdrop-blur-sm duration-200" />

          <Dialog.Content className="bg-background animate-in zoom-in-95 fixed top-16 left-[50%] z-50 w-[95vw] max-w-lg translate-x-[-50%] overflow-hidden rounded-xl border p-0 shadow-lg duration-200 sm:w-full sm:rounded-lg md:top-[50%] md:translate-y-[-50%]">
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

                <CommandActions
                  runCommand={runCommand}
                  theme={theme}
                  setTheme={setTheme}
                />
                <CommandSeparator className="bg-border -mx-1 my-2 h-px" />
                <CommandLinks runCommand={runCommand} />
              </CommandList>
            </Command>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};
