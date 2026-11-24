import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

const isApplePlatform = () =>
  /Mac|iPhone|iPad|iPod/.test(
    (navigator as Navigator & { userAgentData?: { platform?: string } })
      .userAgentData?.platform ?? navigator.platform
  );

/** "⌘" on Apple platforms, "Ctrl" elsewhere (and during SSR). */
export function usePlatformModifier(): "⌘" | "Ctrl" {
  return useSyncExternalStore(
    subscribe,
    () => (isApplePlatform() ? "⌘" : "Ctrl"),
    () => "Ctrl"
  );
}
