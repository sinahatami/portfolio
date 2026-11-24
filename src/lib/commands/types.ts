import type { IconName } from "@/lib/icons";

export type CommandGroup = "Go to" | "Actions" | "Links";

/**
 * Command pattern: every user intent is an object with a uniform `run`.
 * The command palette and voice control are just two invokers of the same
 * registry, so a new command is added once and both UIs pick it up.
 */
export interface AppCommand {
  id: string;
  label: string;
  group: CommandGroup;
  icon: IconName;
  /** Extra search terms for the palette. */
  keywords: string[];
  /** Phrases that trigger the command by voice. */
  voicePhrases: string[];
  run: () => void;
}

/**
 * The side effects commands may perform. Injected rather than imported, so
 * commands stay pure data + intent and can be tested without a browser.
 */
export interface CommandEnvironment {
  navigate(href: string): void;
  openExternal(url: string): void;
  copyText(text: string, confirmation: string): void;
  print(): void;
  toggleTheme(): void;
  toggleVoice(): void;
  isDarkTheme: boolean;
  isListening: boolean;
  voiceSupported: boolean;
}
