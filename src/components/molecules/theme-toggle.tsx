"use client";

import { useTheme } from "next-themes";
import { Button, Icon } from "@/components/atoms";
import { useMounted } from "@/hooks/use-mounted";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
    >
      {/* Render a stable icon until mounted to avoid a hydration mismatch. */}
      <Icon name={isDark ? "sun" : "moon"} />
    </Button>
  );
}
