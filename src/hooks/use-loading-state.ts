"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export function useLoadingState() {
  const [loadingState, setLoadingState] = useState({
    isPageLoading: true,
    loadedComponents: new Set<string>(),
    progress: 0,
  });

  // Use ref to track previous values and prevent infinite updates
  const previousProgress = useRef(0);
  const loadedComponentsRef = useRef(new Set<string>());

  // Memoized function that only updates if actually needed
  const markComponentLoaded = useCallback((componentName: string) => {
    setLoadingState((prev) => {
      // Don't update if already loaded
      if (prev.loadedComponents.has(componentName)) {
        return prev;
      }

      const newLoaded = new Set(prev.loadedComponents);
      newLoaded.add(componentName);

      // Update ref
      loadedComponentsRef.current = newLoaded;

      // Calculate progress
      const totalComponents = 8; // Reduced for safety
      const progress = Math.min(100, (newLoaded.size / totalComponents) * 100);

      // Only update if progress actually changed
      if (Math.abs(progress - previousProgress.current) < 0.1) {
        return prev;
      }

      previousProgress.current = progress;

      return {
        ...prev,
        loadedComponents: newLoaded,
        progress,
        isPageLoading: progress < 100,
      };
    });
  }, []);

  // Initial progress - set immediately
  useEffect(() => {
    setLoadingState((prev) => ({
      ...prev,
      progress: 30,
    }));
  }, []);

  // Auto-complete after timeout to prevent hanging
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingState((prev) => ({
        ...prev,
        progress: 100,
        isPageLoading: false,
      }));
    }, 5000); // Max 5 seconds loading

    return () => clearTimeout(timer);
  }, []);

  return {
    ...loadingState,
    markComponentLoaded,
  };
}
