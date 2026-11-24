"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { Icon } from "@/components/atoms";
import { useCommandCenter } from "@/components/providers/command-center-provider";
import type { AppCommand, CommandGroup } from "@/lib/commands";

const GROUP_ORDER: CommandGroup[] = ["Go to", "Actions", "Links"];

/** Keyboard-first menu (⌘K / Ctrl+K) over the shared command registry. */
export function CommandPalette() {
  const { commands, paletteOpen, setPaletteOpen, runFromPalette } =
    useCommandCenter();

  const groups = GROUP_ORDER.map((group) => ({
    group,
    items: commands.filter((command) => command.group === group),
  })).filter(({ items }) => items.length > 0);

  return (
    <Dialog.Root open={paletteOpen} onOpenChange={setPaletteOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/35 backdrop-blur-[2px] dark:bg-black/60" />
        <Dialog.Content className="bg-surface border-border fixed top-[12vh] left-1/2 z-50 w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 overflow-hidden rounded-lg border shadow-2xl">
          <Dialog.Title className="sr-only">Command menu</Dialog.Title>
          <Dialog.Description className="sr-only">
            Search for a section, action or link, then press Enter.
          </Dialog.Description>
          <Command loop label="Command menu">
            <div className="border-border flex items-center gap-3 border-b px-4">
              <Icon name="search" className="text-muted-foreground size-4" />
              <Command.Input
                autoFocus
                placeholder="Search sections, actions and links"
                className="placeholder:text-muted-foreground h-12 flex-1 bg-transparent text-base outline-none"
              />
            </div>
            <Command.List className="max-h-[min(60vh,420px)] overflow-y-auto p-2">
              <Command.Empty className="text-muted-foreground px-3 py-8 text-center text-sm">
                Nothing matches. Try “projects”, “email” or “theme”.
              </Command.Empty>
              {groups.map(({ group, items }) => (
                <Command.Group
                  key={group}
                  heading={group}
                  className="[&_[cmdk-group-heading]]:text-muted-foreground mb-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:text-xs"
                >
                  {items.map((command) => (
                    <PaletteItem
                      key={command.id}
                      command={command}
                      onRun={runFromPalette}
                    />
                  ))}
                </Command.Group>
              ))}
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function PaletteItem({
  command,
  onRun,
}: {
  command: AppCommand;
  onRun: (command: AppCommand) => void;
}) {
  return (
    <Command.Item
      value={`${command.group} ${command.label}`}
      keywords={command.keywords}
      onSelect={() => onRun(command)}
      className="data-[selected=true]:bg-muted text-foreground flex h-10 cursor-pointer items-center gap-3 rounded-md px-3 text-sm"
    >
      <Icon name={command.icon} className="text-muted-foreground size-4" />
      {command.label}
    </Command.Item>
  );
}
