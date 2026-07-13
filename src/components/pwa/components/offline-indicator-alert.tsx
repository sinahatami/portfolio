import { WifiOff } from "@/lib/icons";
import { cn } from "@/lib/utils";

export function OfflineIndicatorAlert() {
  return (
    <div
      className={cn(
        "fixed top-4 left-1/2 z-50 -translate-x-1/2",
        "animate-in slide-in-from-top-4 fade-in fill-mode-both duration-300"
      )}
    >
      <div className="flex items-center gap-2 rounded-lg bg-yellow-500/90 px-4 py-2 text-yellow-900 shadow-lg backdrop-blur-sm">
        <WifiOff className="h-4 w-4" />
        <span className="text-sm font-medium">
          You are offline. Some features may be limited.
        </span>
      </div>
    </div>
  );
}
