import dynamic from "next/dynamic";

import { HeroSection } from "@/components/sections/hero/hero-section";
import { ExperienceSection } from "@/components/sections/experience/experience-section";
import { EducationSection } from "@/components/sections/education/education-section";
import { ContactSection } from "@/components/sections/contact/contact-section";

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
    import("@/components/sections/skills/skill-section").then(
      (mod) => mod.SkillSelection
    ),
  { loading: () => <SectionSkeleton height="600px" /> }
);

const ProjectsSection = dynamic(
  () =>
    import("@/components/sections/projects/projects-section").then(
      (mod) => mod.ProjectsSection
    ),
  { loading: () => <SectionSkeleton height="800px" /> }
);

const GitHubActivitySection = dynamic(
  () =>
    import("@/components/sections/github/github-activity-section").then(
      (mod) => mod.default
    ),
  { loading: () => <SectionSkeleton height="600px" /> }
);

const TestimonialsSection = dynamic(
  () =>
    import("@/components/sections/testimonials/testimonials-section").then(
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

        <ContactSection />
      </main>
    </div>
  );
}
