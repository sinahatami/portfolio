"use client";

import { useOfflineStatus } from "./hooks/use-offline-status";
import { OfflineIndicatorAlert } from "./components/offline-indicator-alert";

export function OfflineIndicator() {
  const isOffline = useOfflineStatus();

  if (!isOffline) return null;

  return <OfflineIndicatorAlert />;
}
