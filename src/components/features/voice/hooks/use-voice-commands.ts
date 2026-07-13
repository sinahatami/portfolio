import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "@/components/ui";
import { useTheme } from "next-themes";

export interface VoiceCommand {
  command: string;
  description: string;
  action: () => void;
}

export function useVoiceCommands() {
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
  }, [recognition, isListening, permissionError]);

  return {
    isListening,
    transcript,
    showCommands,
    setShowCommands,
    permissionError,
    toggleListening,
    commands,
  };
}
