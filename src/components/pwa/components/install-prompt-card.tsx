import { Button } from "@/components";
import { Download, X } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface InstallPromptCardProps {
  handleInstallClick: () => void;
  handleDismiss: () => void;
}

export function InstallPromptCard({
  handleInstallClick,
  handleDismiss,
}: InstallPromptCardProps) {
  return (
    <div
      className={cn(
        "fixed bottom-6 left-1/2 z-50 -translate-x-1/2",
        "animate-in slide-in-from-bottom-24 fade-in fill-mode-both duration-500"
      )}
    >
      <div className="max-w-md rounded-2xl border border-white/20 bg-gradient-to-r from-gray-900 to-black p-4 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="bg-accent/20 rounded-xl p-3">
            <Download className="text-accent h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white">Install Portfolio App</h3>
            <p className="text-sm text-gray-300">
              Install for faster access and offline usage
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleInstallClick}
              className="bg-accent hover:bg-accent/90"
            >
              Install
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
