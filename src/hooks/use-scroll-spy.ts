"use client";

import { useEffect, useState } from "react";

/**
 * Observer pattern over IntersectionObserver: reports which section currently
 * crosses a band just below the header. No scroll listeners, no layout reads.
 */
export function useScrollSpy(ids: readonly string[], enabled = true) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    if (!enabled) {
      setActiveId(null);
      return;
    }
    const elements = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [key, enabled]);

  return activeId;
}
