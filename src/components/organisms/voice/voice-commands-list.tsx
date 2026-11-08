import { Command } from "@/lib/icons";
import { VoiceCommandItem } from "@/components/molecules/voice/voice-command-item";
import type { VoiceCommand } from "@/hooks/use-voice-commands";

interface VoiceCommandsListProps {
  showCommands: boolean;
  setShowCommands: (show: boolean) => void;
  commands: VoiceCommand[];
}

export function VoiceCommandsList({
  showCommands,
  setShowCommands,
  commands,
}: VoiceCommandsListProps) {
  if (!showCommands) return null;

  return (
    <div
      className="border-border bg-background/95 animate-in slide-in-from-left-2 fade-in absolute bottom-0 left-full ml-4 w-64 rounded-2xl border p-4 shadow-2xl backdrop-blur-md duration-200"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <Command className="h-4 w-4" />
        Available Commands
      </h3>
      <div className="max-h-64 space-y-2 overflow-y-auto pr-2">
        {commands.map((cmd) => (
          <VoiceCommandItem
            key={cmd.command}
            cmd={cmd}
            setShowCommands={setShowCommands}
          />
        ))}
      </div>
    </div>
  );
}
