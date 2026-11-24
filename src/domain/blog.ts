export interface PostSummary {
  slug: string;
  title: string;
  description: string;
  /** ISO date, e.g. `"2025-02-14"`. */
  date: string;
  tags: string[];
  readingMinutes: number;
}

export interface Post extends PostSummary {
  /** Markdown body without front matter. */
  content: string;
}

/**
 * Repository abstraction for articles. Pages depend on this interface, so the
 * storage (file system today, a CMS tomorrow) can change without touching UI.
 */
export interface BlogRepository {
  list(): PostSummary[];
  findBySlug(slug: string): Post | null;
}
