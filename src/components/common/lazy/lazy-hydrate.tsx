"use client";
import { useState, useEffect, useRef, ReactNode } from "react";

export const LazyHydrate = ({
  children,
  height = "500px",
}: {
  children: ReactNode;
  height?: string;
}) => {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {mounted ? children : <div style={{ height }} className="w-full" />}
    </div>
  );
};
