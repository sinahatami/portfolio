"use client";

import { useTheme } from "next-themes";
import { ToastContainer } from "react-toastify";

export function Toaster() {
  const { resolvedTheme } = useTheme();
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={4000}
      hideProgressBar
      closeOnClick
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
