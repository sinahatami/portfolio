export type SectionId =
  | "about"
  | "experience"
  | "projects"
  | "education"
  | "skills"
  | "contact"
  | "testimonials"
  | "github";

export interface NavItem {
  id: SectionId;
  name: string;
  href: string;
  icon: string;
}

export interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  fid?: number;
  cls?: number;
  tbt?: number;
}
