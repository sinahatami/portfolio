import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogRepository, Post, PostSummary } from "@/domain/blog";
import { readingMinutes } from "@/lib/text";

const SLUG_PATTERN = /^[a-z0-9-]+$/;

/** Repository over Markdown files with front matter. */
export class FileSystemBlogRepository implements BlogRepository {
  constructor(private readonly directory: string) {}

  list(): PostSummary[] {
    if (!fs.existsSync(this.directory)) return [];

    return fs
      .readdirSync(this.directory)
      .filter((file) => file.endsWith(".md"))
      .map((file) => this.read(file.replace(/\.md$/, "")))
      .filter((post): post is Post => post !== null)
      .map(({ content: _content, ...summary }) => summary)
      .sort((a, b) => b.date.localeCompare(a.date));
  }

  findBySlug(slug: string): Post | null {
    // Guard against path traversal: slugs come from the URL.
    if (!SLUG_PATTERN.test(slug)) return null;
    return this.read(slug);
  }

  private read(slug: string): Post | null {
    const filePath = path.join(this.directory, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;

    const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
    return {
      slug,
      title: String(data["title"] ?? slug),
      description: String(data["description"] ?? ""),
      date: String(data["date"] ?? ""),
      tags: Array.isArray(data["tags"]) ? data["tags"].map(String) : [],
      readingMinutes: readingMinutes(content),
      content,
    };
  }
}
