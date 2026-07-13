// --- FILE: ./src/components/ui/static-wrapper.tsx ---
"use client";

interface StaticWrapperProps {
  children: React.ReactNode;
  className?: string;
  initial?: any;
  animate?: any;
  transition?: any;
  whileInView?: any;
  viewport?: any;
}

export function StaticWrapper({
  children,
  className,
  initial,
  animate,
  transition,
  whileInView,
  viewport,
  ...props
}: StaticWrapperProps) {
  // Static version - ignore all animation props
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}
