"use client";

import { Button, Icon } from "@/components/atoms";
import { useCommandCenter } from "@/components/providers/command-center-provider";

/** Opens the command menu from inside a page, e.g. on the 404. */
export function SiteSearchButton() {
  const { setPaletteOpen } = useCommandCenter();
  return (
    <Button
      variant="secondary"
      size="lg"
      onClick={() => setPaletteOpen(true)}
      aria-keyshortcuts="Meta+K Control+K"
    >
      <Icon name="search" />
      Search the site
    </Button>
  );
}
