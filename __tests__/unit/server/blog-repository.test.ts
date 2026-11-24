import path from "node:path";
import { FileSystemBlogRepository } from "@/server/blog/file-system-blog-repository";

const repository = new FileSystemBlogRepository(
  path.join(process.cwd(), "src", "content", "posts")
);

describe("FileSystemBlogRepository", () => {
  it("lists posts newest first without their bodies", () => {
    const posts = repository.list();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts).toEqual(
      [...posts].sort((a, b) => b.date.localeCompare(a.date))
    );
    expect(posts[0]).not.toHaveProperty("content");
    expect(posts[0]?.readingMinutes).toBeGreaterThan(0);
  });

  it("finds a post by slug and rejects unsafe slugs", () => {
    const [first] = repository.list();
    expect(repository.findBySlug(first!.slug)?.content.length).toBeGreaterThan(
      0
    );
    expect(repository.findBySlug("../../package")).toBeNull();
    expect(repository.findBySlug("does-not-exist")).toBeNull();
  });

  it("returns an empty list for a missing directory", () => {
    expect(new FileSystemBlogRepository("/nonexistent").list()).toEqual([]);
  });
});
