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
  { id: "about", label: "About", aliases: ["home", "top", "intro", "sources"] },
  {
    id: "experience",
    label: "Work",
    aliases: [
      "experience",
      "jobs",
      "career",
      "education",
      "degree",
      "university",
    ],
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
  /** What's there, in a few words, for lists of destinations (e.g. the 404). */
  summary: string;
  /** Section id used for scroll-spy highlighting, if any. */
  sectionId?: HomeSectionId;
}

export const PRIMARY_NAV: NavItem[] = [
  {
    label: "Work",
    href: "/#experience",
    sectionId: "experience",
    summary: "Roles and degrees, newest first",
  },
  {
    label: "Projects",
    href: "/#projects",
    sectionId: "projects",
    summary: "Every public repository, with live GitHub data",
  },
  {
    label: "Skills",
    href: "/#skills",
    sectionId: "skills",
    summary: "The roles and projects behind each skill",
  },
  {
    label: "Writing",
    href: "/blog",
    summary: "Notes on web performance, React and applied machine learning",
  },
  {
    label: "Contact",
    href: "/#contact",
    sectionId: "contact",
    summary: "Email, or send a message from the site",
  },
];
