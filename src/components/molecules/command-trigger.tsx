"use client";

import { Button, Icon, Kbd } from "@/components/atoms";
import { usePlatformModifier } from "@/hooks/use-platform-modifier";

interface CommandTriggerProps {
  onOpen: () => void;
}

/** Opens the command palette; shows the keyboard shortcut on wide screens. */
export function CommandTrigger({ onOpen }: CommandTriggerProps) {
  const modifier = usePlatformModifier();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onOpen}
      aria-label="Open command menu"
      aria-keyshortcuts="Meta+K Control+K"
      className="border-border hover:border-foreground/40 gap-2 border font-sans font-normal max-sm:size-10 max-sm:px-0"
    >
      <Icon name="search" />
      <span className="max-sm:hidden">Search</span>
      <span className="flex gap-0.5 max-sm:hidden" aria-hidden>
        <Kbd>{modifier}</Kbd>
        <Kbd>K</Kbd>
      </span>
    </Button>
  );
}
