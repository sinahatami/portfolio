import type { Profile } from "@/domain/portfolio";
import type { SectionLink } from "@/config/navigation";
import type { AppCommand, CommandEnvironment } from "./types";

interface CommandSources {
  sections: readonly SectionLink[];
  profile: Profile;
}

/** Factory that assembles the full command registry for an environment. */
export function buildCommands(
  env: CommandEnvironment,
  { sections, profile }: CommandSources
): AppCommand[] {
  const navigation: AppCommand[] = sections.map((section) => ({
    id: `go-${section.id}`,
    label: section.label,
    group: "Go to",
    icon: "hash",
    keywords: [...section.aliases],
    voicePhrases: [section.label, ...section.aliases].flatMap((phrase) => [
      phrase,
      `go to ${phrase}`,
      `show ${phrase}`,
      `view ${phrase}`,
    ]),
    run: () => env.navigate(`/#${section.id}`),
  }));

  const actions: AppCommand[] = [
    {
      id: "read-writing",
      label: "Read the blog",
      group: "Go to",
      icon: "book",
      keywords: ["articles", "writing", "posts"],
      voicePhrases: ["open blog", "go to blog", "show articles"],
      run: () => env.navigate("/blog"),
    },
    {
      id: "copy-email",
      label: "Copy email address",
      group: "Actions",
      icon: "copy",
      keywords: ["contact", "mail", profile.email],
      voicePhrases: ["copy email"],
      run: () => env.copyText(profile.email, "Email address copied"),
    },
    {
      id: "send-email",
      label: "Send an email",
      group: "Actions",
      icon: "mail",
      keywords: ["contact", "write", "hire"],
      voicePhrases: ["send email", "write an email"],
      run: () => env.openExternal(`mailto:${profile.email}`),
    },
    {
      id: "toggle-theme",
      label: env.isDarkTheme ? "Switch to light theme" : "Switch to dark theme",
      group: "Actions",
      icon: env.isDarkTheme ? "sun" : "moon",
      keywords: ["theme", "dark", "light", "appearance"],
      voicePhrases: ["toggle theme", "dark mode", "light mode"],
      run: env.toggleTheme,
    },
    {
      id: "print",
      label: "Print resume",
      group: "Actions",
      icon: "printer",
      keywords: ["cv", "pdf", "resume", "print"],
      voicePhrases: ["print resume", "print"],
      run: env.print,
    },
  ];

  if (env.voiceSupported) {
    actions.push({
      id: "toggle-voice",
      label: env.isListening ? "Stop voice control" : "Start voice control",
      group: "Actions",
      icon: env.isListening ? "mic-off" : "mic",
      keywords: ["voice", "speech", "microphone"],
      voicePhrases: ["stop listening", "stop voice"],
      run: env.toggleVoice,
    });
  }

  const links: AppCommand[] = profile.socials.map((social) => ({
    id: `open-${social.id}`,
    label: `Open ${social.label}`,
    group: "Links",
    icon: social.id,
    keywords: [social.handle],
    voicePhrases: [`open ${social.label}`],
    run: () => env.openExternal(social.url),
  }));

  return [...navigation, ...actions, ...links];
}
