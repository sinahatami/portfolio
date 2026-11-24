/**
 * Portfolio domain entities.
 *
 * These types describe *what* the portfolio is about, independently of how it
 * is stored (see `src/content`) or rendered (see `src/components`). Every layer
 * depends on these abstractions, never on each other's internals.
 */

/** Calendar month in ISO form, e.g. `"2021-06"`. */
export type YearMonth = `${number}-${number}`;

/** A span of time. A missing `end` means the period is ongoing. */
export interface Period {
  start: YearMonth;
  end?: YearMonth;
}

export interface SocialProfile {
  id: "github" | "linkedin";
  label: string;
  handle: string;
  url: string;
}

/**
 * The source behind a phrase in the headline, shown as a numbered note under
 * it. `after` is the exact headline text the note marker follows.
 */
export type ProofNote =
  | {
      kind: "fact";
      after: string;
      /** The source in a few words, for tight spaces such as the social image. */
      cite: string;
      title: string;
      body: string;
      link: { label: string; href: string };
    }
  | {
      kind: "reference";
      after: string;
      /** A `Recommendation.id`; the note quotes its highlight. */
      recommendationId: string;
    };

export interface Profile {
  name: string;
  initials: string;
  role: string;
  headline: string;
  /** Sources for the headline's claims, in reading order. */
  proof: ProofNote[];
  intro: string;
  /** Plain-text description used for SEO and social cards. */
  description: string;
  location: { label: string; mapUrl: string };
  availability: { open: boolean; label: string };
  yearsOfExperience: string;
  photo: { src: string; alt: string };
  website: string;
  sourceCode: string;
  email: string;
  socials: SocialProfile[];
}

export interface Experience {
  id: string;
  company: string;
  url?: string;
  logo?: string;
  role: string;
  period: Period;
  /** One line about the organisation itself. */
  companySummary: string;
  /** What I did there. */
  description: string;
  skills: string[];
}

export interface Education {
  id: string;
  school: string;
  url?: string;
  logo?: string;
  degree: string;
  focus: string;
  period: Period;
  thesis?: string;
  coursework: string[];
}

export type ProjectDomain = "web" | "ml" | "data" | "systems";

export interface Project {
  id: string;
  title: string;
  description: string;
  domains: ProjectDomain[];
  stack: string[];
  sourceUrl: string;
  liveUrl?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: string[];
}

export interface Recommendation {
  id: string;
  author: string;
  role: string;
  organization: string;
  /** A short verbatim excerpt that leads the card. */
  highlight: string;
  /** The full letter, verbatim. */
  letter: string;
  letterUrl?: string;
  authorUrl?: string;
  organizationUrl?: string;
}
