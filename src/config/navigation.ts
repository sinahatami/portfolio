/**
 * Single source of truth for the page structure. The header, scroll spy,
 * command palette and voice control all derive from these lists, so adding a
 * section means editing data here rather than touching each consumer (OCP).
 */
export interface SectionLink {
  id: string;
  label: string;
  /** Extra phrases for the command palette search and voice control. */
  aliases: string[];
}

export const HOME_SECTIONS = [
  { id: "about", label: "About", aliases: ["home", "top", "intro", "map"] },
  {
    id: "experience",
    label: "Experience",
    aliases: ["work", "jobs", "route", "education", "degree", "university"],
  },
  {
    id: "projects",
    label: "Projects",
    aliases: ["portfolio", "open source", "github", "repositories"],
  },
  { id: "skills", label: "Skills", aliases: ["stack", "technologies"] },
  {
    id: "recommendations",
    label: "References",
    aliases: ["recommendations", "testimonials", "letters"],
  },
  { id: "contact", label: "Contact", aliases: ["email", "message"] },
] as const satisfies readonly SectionLink[];

export type HomeSectionId = (typeof HOME_SECTIONS)[number]["id"];

export interface NavItem {
  label: string;
  href: string;
  /** Section id used for scroll-spy highlighting, if any. */
  sectionId?: HomeSectionId;
}

export const PRIMARY_NAV: NavItem[] = [
  { label: "Experience", href: "/#experience", sectionId: "experience" },
  { label: "Projects", href: "/#projects", sectionId: "projects" },
  { label: "Skills", href: "/#skills", sectionId: "skills" },
  { label: "Writing", href: "/blog" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];
