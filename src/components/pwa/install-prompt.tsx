"use client";

import { useInstallPrompt } from "./hooks/use-install-prompt";
import { InstallPromptCard } from "./components/install-prompt-card";

export function InstallPrompt() {
  const { isInstalled, showPrompt, handleInstallClick, handleDismiss } =
    useInstallPrompt();

  if (isInstalled || !showPrompt) return null;

  return (
    <InstallPromptCard
      handleInstallClick={handleInstallClick}
      handleDismiss={handleDismiss}
    />
  );
}
