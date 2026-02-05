"use client";

import { ToastContainer, toast } from "react-toastify";
// This line is the most important for visibility!
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "next-themes";

export function Toaster() {
  const { theme } = useTheme();

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      theme={theme === "dark" ? "dark" : "light"}
    />
  );
}

export { toast };
