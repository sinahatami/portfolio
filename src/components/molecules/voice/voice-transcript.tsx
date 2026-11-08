import { Volume2 } from "@/lib/icons";

interface VoiceTranscriptProps {
  transcript: string;
}

export function VoiceTranscript({ transcript }: VoiceTranscriptProps) {
  if (!transcript) return null;

  return (
    <div className="border-border bg-background/80 animate-in slide-in-from-left-4 fade-in absolute top-2 left-16 flex max-w-[60vw] items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm duration-300 md:max-w-xs">
      <Volume2 className="text-primary h-3 w-3 shrink-0" />
      <span className="truncate text-xs font-medium italic">{transcript}</span>
    </div>
  );
}
