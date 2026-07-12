import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ErrorBoundary } from "@/components/common";
import { HeroSection } from "@/components/sections";

// 2. Lazy load non-critical CLIENT UI sections to reduce initial bundle size
const ExperienceSection = dynamic(() =>
  import("@/components/sections/experience-section").then(
    (mod) => mod.ExperienceSection
  )
);

const EducationSection = dynamic(() =>
  import("@/components/sections/education-section").then(
    (mod) => mod.EducationSection
  )
);

const LatestPosts = dynamic(() =>
  import("@/components/sections/latest-posts").then((mod) => mod.LatestPosts)
);

const ContactSection = dynamic(() =>
  import("@/components/sections/contact-section").then(
    (mod) => mod.ContactSection
  )
);

const GitHubActivitySection = dynamic(
  () => import("@/components/sections/github-activity-section")
);

const ProjectsSection = dynamic(() =>
  import("@/components/sections/projects-section").then(
    (mod) => mod.ProjectsSection
  )
);

const SkillSelection = dynamic(() =>
  import("@/components/sections/skill-section").then(
    (mod) => mod.SkillSelection
  )
);

const TestimonialsSection = dynamic(() =>
  import("@/components/sections/testimonials-section").then(
    (mod) => mod.TestimonialsSection
  )
);

const VoiceCommands = dynamic(() =>
  import("@/components/features/voice-commands").then(
    (mod) => mod.VoiceCommands
  )
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

        <Suspense fallback={<SectionSkeleton height="800px" />}>
          <ExperienceSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="600px" />}>
          <ProjectsSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="600px" />}>
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

        <Suspense fallback={<SectionSkeleton height="400px" />}>
          <LatestPosts />
        </Suspense>

        <Suspense fallback={<SectionSkeleton height="600px" />}>
          <ContactSection />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <VoiceCommands />
      </Suspense>
    </div>
  );
}
