"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "react-toastify";
import { HOME_SECTIONS } from "@/config/navigation";
import { PROFILE } from "@/content/profile";
import {
  buildCommands,
  matchVoiceCommand,
  type AppCommand,
  type CommandEnvironment,
} from "@/lib/commands";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";

interface CommandCenterValue {
  commands: AppCommand[];
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  /** Close the palette, then run the command once focus has returned. */
  runFromPalette: (command: AppCommand) => void;
  voice: {
    supported: boolean;
    listening: boolean;
    transcript: string;
    stop: () => void;
  };
}

const CommandCenterContext = createContext<CommandCenterValue | null>(null);

export function useCommandCenter(): CommandCenterValue {
  const context = useContext(CommandCenterContext);
  if (!context) {
    throw new Error(
      "useCommandCenter must be used inside CommandCenterProvider"
    );
  }
  return context;
}

/**
 * Owns the command registry and its two invokers (palette and voice).
 * Side effects live in the `CommandEnvironment` built here; the commands
 * themselves are plain data from `lib/commands`.
 */
export function CommandCenterProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const commandsRef = useRef<AppCommand[]>([]);

  const speech = useSpeechRecognition({
    onFinalTranscript: (transcript) => {
      const command = matchVoiceCommand(transcript, commandsRef.current);
      if (command) {
        toast.success(`${command.label}`, { autoClose: 2000 });
        command.run();
      } else {
        toast.info(
          `No command matches “${transcript}”. Try “show projects” or “toggle theme”.`
        );
      }
    },
    onError: (error) => {
      if (error === "not-allowed") {
        toast.error(
          "Microphone access is blocked. Allow it in your browser's site settings to use voice control."
        );
      } else if (error === "unsupported") {
        toast.error("This browser doesn't support voice control.");
      }
    },
  });

  const navigate = useCallback(
    (href: string) => {
      const [path, hash] = href.split("#");
      const target = hash ? document.getElementById(hash) : null;
      if (target && (path === "" || path === pathname)) {
        target.scrollIntoView({ block: "start" });
        window.history.pushState(null, "", `#${hash}`);
        return;
      }
      router.push(href);
    },
    [pathname, router]
  );

  const commands = useMemo(() => {
    const isDarkTheme = resolvedTheme === "dark";
    const env: CommandEnvironment = {
      navigate,
      openExternal: (url) => {
        if (url.startsWith("mailto:")) window.location.href = url;
        else window.open(url, "_blank", "noopener,noreferrer");
      },
      copyText: (text, confirmation) => {
        navigator.clipboard
          .writeText(text)
          .then(() => toast.success(confirmation, { autoClose: 2000 }))
          .catch(() => toast.error(`Copy failed. The address is ${text}.`));
      },
      print: () => window.setTimeout(() => window.print(), 150),
      toggleTheme: () => setTheme(isDarkTheme ? "light" : "dark"),
      toggleVoice: speech.toggle,
      isDarkTheme,
      isListening: speech.listening,
      voiceSupported: speech.supported,
    };
    return buildCommands(env, { sections: HOME_SECTIONS, profile: PROFILE });
  }, [
    navigate,
    resolvedTheme,
    setTheme,
    speech.listening,
    speech.supported,
    speech.toggle,
  ]);

  useEffect(() => {
    commandsRef.current = commands;
  }, [commands]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const runFromPalette = useCallback((command: AppCommand) => {
    setPaletteOpen(false);
    window.setTimeout(command.run, 0);
  }, []);

  const value = useMemo<CommandCenterValue>(
    () => ({
      commands,
      paletteOpen,
      setPaletteOpen,
      runFromPalette,
      voice: {
        supported: speech.supported,
        listening: speech.listening,
        transcript: speech.transcript,
        stop: speech.stop,
      },
    }),
    [
      commands,
      paletteOpen,
      runFromPalette,
      speech.supported,
      speech.listening,
      speech.transcript,
      speech.stop,
    ]
  );

  return (
    <CommandCenterContext.Provider value={value}>
      {children}
    </CommandCenterContext.Provider>
  );
}
