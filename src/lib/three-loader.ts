let threeLoaded: any = null;
let dreiLoaded: any = null;

export async function loadThree() {
  if (typeof window === "undefined") return;

  if (!threeLoaded) {
    threeLoaded = await import("three");
  }
  return threeLoaded;
}

export async function loadDrei() {
  if (typeof window === "undefined") return;

  if (!dreiLoaded) {
    dreiLoaded = await import("@react-three/drei");
  }
  return dreiLoaded;
}

export async function loadThreeFiber() {
  if (typeof window === "undefined") return;

  const fiber = await import("@react-three/fiber");
  return fiber;
}

/**
 * Preload 3D libraries when user hovers over sections that might use them
 */
export function preloadThreeOnInteraction() {
  if (typeof window === "undefined") return;

  // Start loading when user hovers over skills section
  const skillsSection = document.getElementById("skills");
  if (skillsSection) {
    skillsSection.addEventListener(
      "mouseenter",
      () => {
        loadThree().catch(() => {}); // Silent fail
      },
      { once: true }
    );
  }

  // Start loading when user scrolls near 3D sections
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadThree().catch(() => {});
          loadDrei().catch(() => {});
        }
      });
    },
    { threshold: 0.1 }
  );

  const techSphere = document.querySelector("[data-3d-section]");
  if (techSphere) observer.observe(techSphere);
}
