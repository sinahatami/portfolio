import { Suspense } from "react";
import dynamic from "next/dynamic";

import { HeroSection } from "@/components/sections/hero-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { EducationSection } from "@/components/sections/education-section";
import { ContactSection } from "@/components/sections/contact-section";
import { LatestPosts } from "@/components/sections/latest-posts";

// Reusable Skeleton Component for Suspense fallbacks
const SectionSkeleton = ({ height }: { height: string }) => (
  <div
    className={`bg-muted/10 w-full animate-pulse rounded-xl ${height} flex items-center justify-center`}
  >
    <div className="bg-muted/20 h-10 w-40 rounded-full" />
  </div>
);

const SkillSelection = dynamic(
  () =>
    import("@/components/sections/skill-section").then(
      (mod) => mod.SkillSelection
    ),
  { loading: () => <SectionSkeleton height="600px" /> }
);

const ProjectsSection = dynamic(
  () =>
    import("@/components/sections/projects-section").then(
      (mod) => mod.ProjectsSection
    ),
  { loading: () => <SectionSkeleton height="800px" /> }
);

const GitHubActivitySection = dynamic(
  () =>
    import("@/components/sections/github-activity-section").then(
      (mod) => mod.default
    ),
  { loading: () => <SectionSkeleton height="600px" /> }
);

const TestimonialsSection = dynamic(
  () =>
    import("@/components/sections/testimonials-section").then(
      (mod) => mod.TestimonialsSection
    ),
  { loading: () => <SectionSkeleton height="400px" /> }
);

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      {/* 
        MAIN CONTENT CONTAINER
      */}
      <main className="w-full flex-1">
        <HeroSection />

        <ExperienceSection />
        <EducationSection />
        <SkillSelection />
        <ProjectsSection />

        <GitHubActivitySection />

        <TestimonialsSection />

        <Suspense fallback={<SectionSkeleton height="800px" />}>
          <LatestPosts />
        </Suspense>

        <ContactSection />
      </main>
    </div>
  );
}
