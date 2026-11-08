import { Mic, MicOff, X } from "@/lib/icons";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface VoiceButtonProps {
  permissionError: boolean;
  isListening: boolean;
  toggleListening: () => void;
}

export function VoiceButton({
  permissionError,
  isListening,
  toggleListening,
}: VoiceButtonProps) {
  return (
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
  );
}
