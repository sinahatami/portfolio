import { Mic, MicOff, X, Eye } from "@/lib/icons";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface VoiceButtonProps {
  permissionError: boolean;
  isListening: boolean;
  toggleListening: () => void;
  showCommands: boolean;
  setShowCommands: (show: boolean) => void;
}

export function VoiceButton({
  permissionError,
  isListening,
  toggleListening,
  showCommands,
  setShowCommands,
}: VoiceButtonProps) {
  return (
    <>
      <Button
        size="icon"
        onClick={toggleListening}
        className={cn(
          "relative h-12 w-12 rounded-full shadow-2xl transition-all duration-300 md:h-14 md:w-14",
          permissionError
            ? "bg-muted text-muted-foreground"
            : isListening
              ? "scale-105 bg-red-500 text-white hover:bg-red-600"
              : "bg-accent hover:bg-accent/90"
        )}
        aria-label="Toggle voice listening"
      >
        {permissionError ? (
          <X className="h-5 w-5 md:h-6 md:w-6" />
        ) : isListening ? (
          <MicOff className="h-5 w-5 md:h-6 md:w-6" />
        ) : (
          <Mic className="h-5 w-5 md:h-6 md:w-6" />
        )}

        {isListening && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="absolute h-full w-full animate-ping rounded-full bg-red-500/20" />
          </span>
        )}
      </Button>

      {/* Show Commands Button */}
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
    </>
  );
}
