import { toast } from "@/components/ui";

interface VoiceCommand {
  command: string;
  description: string;
  action: () => void;
}

interface VoiceCommandItemProps {
  cmd: VoiceCommand;
  setShowCommands: (show: boolean) => void;
}

export function VoiceCommandItem({
  cmd,
  setShowCommands,
}: VoiceCommandItemProps) {
  return (
    <div
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
  );
}
