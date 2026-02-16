export type ComponentPriority = "critical" | "high" | "medium" | "low";

export const componentPriorities: Record<string, ComponentPriority> = {
  HeroSection: "critical",
  Navbar: "critical",
  ThemeProvider: "critical",

  ExperienceSection: "high",
  ProjectsSection: "high",
  ContactSection: "high",

  SkillSelection: "medium",
  EducationSection: "medium",
  TestimonialsSection: "medium",

  TechSphere: "low",
  ARViewer: "low",
  VoiceCommands: "low",
  CommandMenu: "low",
  CustomCursor: "low",
  ParticlesBackground: "low",
};

export function getLoadStrategy(componentName: string): "eager" | "lazy" {
  const priority = componentPriorities[componentName] || "medium";

  if (priority === "critical" || priority === "high") {
    return "eager";
  }

  return "lazy";
}

export function shouldPreload(componentName: string): boolean {
  const priority = componentPriorities[componentName] || "medium";
  return priority === "critical" || priority === "high";
}
