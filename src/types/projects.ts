export interface ProjectLink {
  href: string;
  hrefLive?: string;
  label?: string;
}

export interface Project {
  title: string;
  techStack: string[];
  description: string;
  slug?: string;
  link: ProjectLink;
}
