import type { AppCommand } from "./types";

const normalize = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Finds the command whose voice phrase appears in the transcript. When several
 * match ("go to projects" also contains "projects"), the longest phrase wins,
 * because it is the most specific.
 */
export function matchVoiceCommand(
  transcript: string,
  commands: AppCommand[]
): AppCommand | null {
  const spoken = ` ${normalize(transcript)} `;
  let best: { command: AppCommand; length: number } | null = null;

  for (const command of commands) {
    for (const phrase of command.voicePhrases) {
      const normalized = normalize(phrase);
      if (!normalized || !spoken.includes(` ${normalized} `)) continue;
      if (!best || normalized.length > best.length) {
        best = { command, length: normalized.length };
      }
    }
  }

  return best?.command ?? null;
}
