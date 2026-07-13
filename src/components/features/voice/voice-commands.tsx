"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Mic, MicOff, Volume2, Command, Eye, X } from "@/lib/icons";
import { Button, toast } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface VoiceCommand {
  command: string;
  description: string;
  action: () => void;
}

export function VoiceCommands() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [showCommands, setShowCommands] = useState(false);
  const [permissionError, setPermissionError] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const { theme, setTheme } = useTheme();

  const commands = useMemo<VoiceCommand[]>(
    () => [
      {
        command: "go to about",
        description: "Scroll to About section",
        action: () =>
          document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        command: "show experience",
        description: "Scroll to Experience section",
        action: () =>
          document
            .getElementById("experience")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        command: "view projects",
        description: "Scroll to Projects section",
        action: () =>
          document
            .getElementById("projects")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        command: "show skills",
        description: "Scroll to Skills section",
        action: () =>
          document
            .getElementById("skills")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        command: "contact me",
        description: "Scroll to Contact section",
        action: () =>
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" }),
      },
      {
        command: "open github",
        description: "Open GitHub profile",
        action: () => window.open("https://github.com/sinahatami", "_blank"),
      },
      {
        command: "print resume",
        description: "Print the resume",
        action: () => window.print(),
      },
      {
        command: "toggle theme",
        description: "Toggle dark/light mode",
        action: () => setTheme(theme === "dark" ? "light" : "dark"),
      },
    ],
    [theme, setTheme]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = true;
        recog.interimResults = true;
        recog.lang = "en-US";

        recog.onresult = (event: any) => {
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              const result = event.results[i][0].transcript.toLowerCase();
              setTranscript(result);

              const matchedCommand = commands.find((cmd) =>
                result.includes(cmd.command.toLowerCase())
              );
              if (matchedCommand) {
                matchedCommand.action();
                toast.success(`Executing: ${matchedCommand.command}`);
              }
            }
          }
        };

        recog.onerror = (event: any) => {
          if (event.error === "not-allowed") {
            setPermissionError(true);
            toast.error("Microphone access denied");
          }
          setIsListening(false);
        };

        recog.onend = () => setIsListening(false);
        setRecognition(recog);
      }
    }
  }, [commands]);

  useEffect(() => {
    const handleClickOutside = () => setShowCommands(false);
    if (showCommands) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showCommands]);

  const toggleListening = useCallback(async () => {
    if (!recognition) {
      toast.error("Speech recognition not supported in this browser");
      return;
    }

    if (isListening) {
      recognition.stop();
      return;
    }

    if (permissionError) {
      toast.error(
        "Microphone access is permanently denied. Please check your browser settings."
      );
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setPermissionError(false);
      recognition.start();
      setIsListening(true);
      setTranscript("");
    } catch (err) {
      setPermissionError(true);
      toast.error("Please enable microphone access");
    }
  }, [recognition, isListening]);

  return (
    <div className="fixed bottom-4 left-4 z-50 md:bottom-14 md:left-8">
      <div className="relative">
        {/* Commands List - Aligned to the right of the buttons */}
        {showCommands && (
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
                  <div className="text-primary text-xs font-bold">
                    {cmd.command}
                  </div>
                  <div className="text-muted-foreground text-[10px] leading-tight">
                    {cmd.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col items-start gap-3">
          {/* Transcript Display */}
          {transcript && (
            <div className="border-border bg-background/80 animate-in slide-in-from-left-4 fade-in absolute top-2 left-16 flex max-w-[60vw] items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm duration-300 md:max-w-xs">
              <Volume2 className="text-primary h-3 w-3 shrink-0" />
              <span className="truncate text-xs font-medium italic">
                {transcript}
              </span>
            </div>
          )}

          {/* Voice Button Content */}
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
        </div>
      </div>
    </div>
  );
}
