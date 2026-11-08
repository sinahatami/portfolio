import dynamic from "next/dynamic";
import { HeroSection } from "@/components/organisms/sections/hero/hero-section";
import { ExperienceSection } from "@/components/organisms/sections/experience/experience-section";
import { EducationSection } from "@/components/organisms/sections/education/education-section";
import { ContactSection } from "@/components/organisms/sections/contact/contact-section";
import { Skeleton } from "@/components/ui";

const SkillSelection = dynamic(
  () =>
    import("@/components/organisms/sections/skills/skill-section").then(
      (mod) => mod.SkillSelection
    ),
  {
    loading: () => (
      <Skeleton className="flex h-[600px] w-full items-center justify-center">
        <Skeleton className="h-10 w-40 rounded-full" />
      </Skeleton>
    ),
  }
);

const ProjectsSection = dynamic(
  () =>
    import("@/components/organisms/sections/projects/projects-section").then(
      (mod) => mod.ProjectsSection
    ),
  {
    loading: () => (
      <Skeleton className="flex h-[800px] w-full items-center justify-center">
        <Skeleton className="h-10 w-40 rounded-full" />
      </Skeleton>
    ),
  }
);

const GitHubActivitySection = dynamic(
  () =>
    import("@/components/organisms/sections/github/github-activity-section").then(
      (mod) => mod.default
    ),
  {
    loading: () => (
      <Skeleton className="flex h-[600px] w-full items-center justify-center">
        <Skeleton className="h-10 w-40 rounded-full" />
      </Skeleton>
    ),
  }
);

const TestimonialsSection = dynamic(
  () =>
    import("@/components/organisms/sections/testimonials/testimonials-section").then(
      (mod) => mod.TestimonialsSection
    ),
  {
    loading: () => (
      <Skeleton className="flex h-[400px] w-full items-center justify-center">
        <Skeleton className="h-10 w-40 rounded-full" />
      </Skeleton>
    ),
  }
);

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
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
