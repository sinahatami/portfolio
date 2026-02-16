import { Suspense, lazy } from "react";
import { ErrorBoundary } from "@/components/common";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { HeroSection } from "@/components/sections/hero-section";

// 1. Critical Server Component: Import directly (No lazy loading for the GitHub fetcher)
import GitHubActivitySection from "@/components/sections/github-activity-section";

// 2. Lazy load non-critical UI sections to reduce initial bundle size
const EducationSection = lazy(() =>
  import("@/components/sections/education-section").then((mod) => ({
    default: mod.EducationSection,
  }))
);

const SkillSelection = lazy(() =>
  import("@/components/sections/skill-section").then((mod) => ({
    default: mod.SkillSelection,
  }))
);

const TestimonialsSection = lazy(() =>
  import("@/components/sections/testimonials-section").then((mod) => ({
    default: mod.TestimonialsSection,
  }))
);

const VoiceCommands = lazy(() =>
  import("@/components/features/voice-commands").then((mod) => ({
    default: mod.VoiceCommands,
  }))
);

// Reusable Skeleton Component for Suspense fallbacks
const SectionSkeleton = ({ height }: { height: string }) => (
  <section className="container mx-auto max-w-5xl px-6 py-12 md:py-20">
    <div
      className="animate-pulse rounded-2xl border border-white/5 bg-gray-800/20"
      style={{ height }}
    />
  </section>
);

export default function HomePage() {
  return (
    <div className="selection:bg-accent/30 relative overflow-hidden">
      {/* Global Background Elements */}
      <div className="bg-background fixed inset-0 -z-10 h-full w-full">
        <div className="absolute top-0 right-0 left-0 h-[500px] bg-[radial-gradient(circle_800px_at_50%_-100px,#3b82f615,transparent)]"></div>
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] bg-[radial-gradient(circle_600px_at_100%_100%,#10b98108,transparent)]"></div>
      </div>

      <main id="main-content" className="relative z-10">
        <ErrorBoundary>
          <HeroSection />
        </ErrorBoundary>

        <ErrorBoundary>
          <ExperienceSection />
        </ErrorBoundary>

        <ProjectsSection />

        <Suspense fallback={<SectionSkeleton height="300px" />}>
          <EducationSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="400px" />}>
          <SkillSelection />
        </Suspense>

        <ErrorBoundary>
          <Suspense fallback={<SectionSkeleton height="500px" />}>
            <GitHubActivitySection />
          </Suspense>
        </ErrorBoundary>

        <Suspense fallback={<SectionSkeleton height="300px" />}>
          <TestimonialsSection />
        </Suspense>

        <ContactSection />
      </main>

      <Suspense fallback={null}>
        <VoiceCommands />
      </Suspense>
    </div>
  );
}
