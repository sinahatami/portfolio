export interface SocialLink {
  name: string;
  url: string;
  iconName: "github" | "linkedin" | string;
}

export interface ContactInfo {
  email: string;
  tel: string;
  social: {
    github: SocialLink;
    linkedin: SocialLink;
    [key: string]: SocialLink;
  };
}

export interface Education {
  school: string;
  link: string;
  degree: string;
  start: string;
  end: string;
  logoUrl: string;
  notes: string;
}

export interface WorkExperience {
  company: string;
  link?: string;
  logoUrl?: string;
  badges: string[];
  title: string;
  start: string;
  end: string;
  summary?: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ProjectLink {
  label?: string;
  href: string;
  hrefLive?: string;
}

export interface Project {
  title: string;
  techStack: string[];
  description: string;
  link: ProjectLink;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl: string | null;
  fileUrl?: string;
  personalWebsite?: string;
  companyWebsite?: string;
}

export interface ResumeData {
  name: string;
  initials: string;
  location: string;
  locationLink: string;
  yearsExperience: string;
  position: string;
  numberOfProjects: string;
  about: string;
  summary: string;
  avatarUrl: string;
  personalWebsiteUrl: string;
  contact: ContactInfo;
  education: Education[];
  work: WorkExperience[];
  skills: SkillCategory[];
  projects: Project[];
  testimonials: Testimonial[];
}
