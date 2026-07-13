import { Command } from "@/lib/icons";
import { toast } from "@/components/ui";

interface VoiceCommand {
  command: string;
  description: string;
  action: () => void;
}

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
          <div
            key={cmd.command}
            onClick={() => {
              cmd.action();
              toast.success(`Executing: ${cmd.command}`);
              setShowCommands(false);
            }}
            className="bg-accent/10 hover:border-accent/20 hover:bg-accent/20 cursor-pointer rounded-lg border border-transparent p-2 transition-colors"
          >
            <div className="text-primary text-xs font-bold">{cmd.command}</div>
            <div className="text-muted-foreground text-[10px] leading-tight">
              {cmd.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
