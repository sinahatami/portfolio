// --- FILE: ./src/components/ui/static-wrapper.tsx ---
"use client";

import { ENABLE_ANIMATIONS } from "@/config/animations";
import { motion } from "framer-motion";

interface StaticWrapperProps {
  children: React.ReactNode;
  className?: string;
  // Add other props that motion.div accepts
  initial?: any;
  animate?: any;
  transition?: any;
  whileInView?: any;
  viewport?: any;
  // ... other motion props
}

export function StaticWrapper({
  children,
  className,
  ...props
}: StaticWrapperProps) {
  if (ENABLE_ANIMATIONS) {
    return (
      <motion.div className={className} {...props}>
        {children}
      </motion.div>
    );
  }

  // Static version - ignore all animation props
  return <div className={className}>{children}</div>;
}
