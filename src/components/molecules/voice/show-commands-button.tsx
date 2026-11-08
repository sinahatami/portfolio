import { Eye } from "@/lib/icons";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface ShowCommandsButtonProps {
  showCommands: boolean;
  setShowCommands: (show: boolean) => void;
}

export function ShowCommandsButton({
  showCommands,
  setShowCommands,
}: ShowCommandsButtonProps) {
  return (
    <Button
      size="icon"
      variant="outline"
      onClick={(e) => {
        e.stopPropagation();
        setShowCommands(!showCommands);
      }}
      className={cn(
        "border-border bg-background/50 h-8 w-8 rounded-full backdrop-blur-sm transition-colors md:h-10 md:w-10",
        showCommands ? "bg-accent text-accent-foreground" : ""
      )}
      aria-label="Show available voice commands"
    >
      <Eye className="h-3 w-3 md:h-4 md:w-4" />
    </Button>
  );
}
