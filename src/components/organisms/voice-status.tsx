"use client";

import { Button, Icon } from "@/components/atoms";
import { useCommandCenter } from "@/components/providers/command-center-provider";

/** Floating indicator while voice control is listening. */
export function VoiceStatus() {
  const { voice } = useCommandCenter();
  if (!voice.listening) return null;

  return (
    <div
      role="status"
      data-print="hide"
      className="bg-surface border-border fixed bottom-5 left-1/2 z-40 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-3 rounded-full border py-1.5 pr-1.5 pl-4 shadow-lg"
    >
      <span aria-hidden className="relative flex size-2.5">
        <span className="bg-destructive absolute inset-0 rounded-full opacity-60 motion-safe:animate-ping" />
        <span className="bg-destructive relative size-2.5 rounded-full" />
      </span>
      <span className="truncate text-sm">
        {voice.transcript
          ? `“${voice.transcript}”`
          : "Listening. Say “show projects”."}
      </span>
      <Button
        size="sm"
        variant="secondary"
        onClick={voice.stop}
        className="rounded-full"
      >
        <Icon name="mic-off" />
        Stop
      </Button>
    </div>
  );
}
