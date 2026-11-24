import { HOME_SECTIONS } from "@/config/navigation";
import { PROFILE } from "@/content/profile";
import {
  buildCommands,
  matchVoiceCommand,
  type CommandEnvironment,
} from "@/lib/commands";

function createEnv(
  overrides: Partial<CommandEnvironment> = {}
): CommandEnvironment {
  return {
    navigate: vi.fn(),
    openExternal: vi.fn(),
    copyText: vi.fn(),
    print: vi.fn(),
    toggleTheme: vi.fn(),
    toggleVoice: vi.fn(),
    isDarkTheme: false,
    isListening: false,
    voiceSupported: true,
    ...overrides,
  };
}

describe("buildCommands", () => {
  it("creates a navigation command for every home section", () => {
    const env = createEnv();
    const commands = buildCommands(env, {
      sections: HOME_SECTIONS,
      profile: PROFILE,
    });
    const goTo = commands.filter((command) => command.group === "Go to");
    expect(goTo.map((command) => command.id)).toEqual(
      expect.arrayContaining(HOME_SECTIONS.map((section) => `go-${section.id}`))
    );

    commands.find((command) => command.id === "go-projects")?.run();
    expect(env.navigate).toHaveBeenCalledWith("/#projects");
  });

  it("reflects environment state in labels and availability", () => {
    const dark = buildCommands(
      createEnv({ isDarkTheme: true, voiceSupported: false }),
      {
        sections: HOME_SECTIONS,
        profile: PROFILE,
      }
    );
    expect(dark.find((c) => c.id === "toggle-theme")?.label).toBe(
      "Switch to light theme"
    );
    expect(dark.some((c) => c.id === "toggle-voice")).toBe(false);
  });

  it("delegates side effects to the injected environment", () => {
    const env = createEnv();
    const commands = buildCommands(env, {
      sections: HOME_SECTIONS,
      profile: PROFILE,
    });
    commands.find((c) => c.id === "copy-email")?.run();
    expect(env.copyText).toHaveBeenCalledWith(
      PROFILE.email,
      expect.any(String)
    );
  });
});

describe("matchVoiceCommand", () => {
  const commands = buildCommands(createEnv(), {
    sections: HOME_SECTIONS,
    profile: PROFILE,
  });

  it.each([
    ["Show projects please", "go-projects"],
    ["go to experience", "go-experience"],
    ["contact me", "go-contact"],
    ["can you copy email", "copy-email"],
    ["Toggle theme!", "toggle-theme"],
    ["open GitHub", "open-github"],
  ])("“%s” → %s", (transcript, id) => {
    expect(matchVoiceCommand(transcript, commands)?.id).toBe(id);
  });

  it("returns null when nothing matches", () => {
    expect(matchVoiceCommand("make me a sandwich", commands)).toBeNull();
  });
});
