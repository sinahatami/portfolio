"use client";

import { useVoiceCommands } from "@/hooks/use-voice-commands";
import { VoiceCommandsList } from "./voice-commands-list";
import { VoiceTranscript } from "@/components/molecules/voice/voice-transcript";
import { VoiceButton } from "@/components/molecules/voice/voice-button";
import { ShowCommandsButton } from "@/components/molecules/voice/show-commands-button";

export function VoiceCommands() {
  const {
    isListening,
    transcript,
    showCommands,
    setShowCommands,
    permissionError,
    toggleListening,
    commands,
  } = useVoiceCommands();

  return (
    <div className="fixed bottom-4 left-4 z-50 md:bottom-14 md:left-8">
      <div className="relative">
        <VoiceCommandsList
          showCommands={showCommands}
          setShowCommands={setShowCommands}
          commands={commands}
        />

        <div className="flex flex-col items-start gap-3">
          <VoiceTranscript transcript={transcript} />

          <VoiceButton
            permissionError={permissionError}
            isListening={isListening}
            toggleListening={toggleListening}
          />

          <ShowCommandsButton
            showCommands={showCommands}
            setShowCommands={setShowCommands}
          />
        </div>
      </div>
    </div>
  );
}
