import { HeroSection } from "@/components/sections/hero-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { EducationSection } from "@/components/sections/education-section";
import { SkillSelection } from "@/components/sections/skill-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ErrorBoundary } from "@/components/error-boundary";

export default function Page() {
  return (
    <div className="selection:bg-accent/30 relative overflow-hidden">
      {/* GLOBAL BACKGROUND */}
      <div className="bg-background fixed inset-0 -z-10 h-full w-full">
        <div className="absolute top-0 right-0 left-0 h-[500px] bg-[radial-gradient(circle_800px_at_50%_-100px,#10b98115,transparent)]"></div>
        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] bg-[radial-gradient(circle_800px_at_100%_200px,#3b82f610,transparent)]"></div>
      </div>

      <main id="main-content" tabIndex={-1}>
        <ErrorBoundary>
          <HeroSection />
        </ErrorBoundary>

        <ErrorBoundary>
          <ExperienceSection />
        </ErrorBoundary>

        <ProjectsSection />

        <EducationSection />

        <SkillSelection />

        <TestimonialsSection />

        <ContactSection />
      </main>
    </div>
  );
}
