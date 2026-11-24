import type { GitHubProfileSummary, Repo } from "@/domain/github";
import {
  GitHubActivityService,
  selectOriginalRepos,
  summarizeLanguages,
} from "@/server/github/github-activity";
import {
  GitHubRestClient,
  type GitHubClient,
} from "@/server/github/github-client";

const repo = (overrides: Partial<Repo>): Repo => ({
  name: "repo",
  description: null,
  url: "https://github.com/x/repo",
  language: "TypeScript",
  stars: 0,
  forks: 0,
  topics: [],
  updatedAt: "2026-01-01T00:00:00Z",
  isFork: false,
  ...overrides,
});

describe("summarizeLanguages", () => {
  it("computes shares, sorted by repository count", () => {
    const repos = [
      ...Array(5).fill({ language: "TypeScript" }),
      ...Array(3).fill({ language: "Python" }),
      ...Array(2).fill({ language: "JavaScript" }),
      { language: null },
    ];
    expect(summarizeLanguages(repos)).toEqual([
      { name: "TypeScript", repos: 5, percentage: 50 },
      { name: "Python", repos: 3, percentage: 30 },
      { name: "JavaScript", repos: 2, percentage: 20 },
    ]);
  });

  it("returns an empty list without languages and respects the limit", () => {
    expect(summarizeLanguages([])).toEqual([]);
    const many = ["A", "B", "C", "D", "E", "F", "G"].map((language) => ({
      language,
    }));
    expect(summarizeLanguages(many, 5)).toHaveLength(5);
  });
});

describe("selectOriginalRepos", () => {
  it("excludes the profile README repository", () => {
    const result = selectOriginalRepos(
      [repo({ name: "Octo" }), repo({ name: "tool" })],
      "octo"
    );
    expect(result.map((r) => r.name)).toEqual(["tool"]);
  });

  it("excludes forks and sorts newest first", () => {
    const result = selectOriginalRepos([
      repo({ name: "old", updatedAt: "2024-01-01T00:00:00Z" }),
      repo({ name: "fork", updatedAt: "2026-06-01T00:00:00Z", isFork: true }),
      repo({ name: "new", updatedAt: "2026-05-01T00:00:00Z" }),
    ]);
    expect(result.map((r) => r.name)).toEqual(["new", "old"]);
  });
});

describe("GitHubActivityService", () => {
  const profile: GitHubProfileSummary = {
    login: "octo",
    url: "https://github.com/octo",
    followers: 10,
    publicRepos: 3,
    memberSince: 2018,
  };

  it("aggregates data from the injected client", async () => {
    const client: GitHubClient = {
      getProfile: async () => profile,
      listRepos: async () => [
        repo({ name: "a", stars: 5 }),
        repo({ name: "b", stars: 3, language: "Python" }),
        repo({ name: "c", stars: 100, isFork: true }),
      ],
    };
    const activity = await new GitHubActivityService(client).getActivity();

    expect(activity?.profile).toEqual(profile);
    expect(activity?.languages.map((l) => l.name)).toEqual([
      "Python",
      "TypeScript",
    ]);
    expect(activity?.repos.map((r) => r.name)).toEqual(["a", "b"]);
  });

  it("returns null and logs when the client fails", async () => {
    const logger = { error: vi.fn() };
    const client: GitHubClient = {
      getProfile: async () => {
        throw new Error("rate limited");
      },
      listRepos: async () => [],
    };
    const activity = await new GitHubActivityService(client, {
      logger,
    }).getActivity();
    expect(activity).toBeNull();
    expect(logger.error).toHaveBeenCalled();
  });
});

describe("GitHubRestClient", () => {
  const ok = (body: unknown) =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: async () => body,
    } as Response);

  it("maps API payloads and only sends a token when configured", async () => {
    const fetcher = vi.fn().mockReturnValueOnce(
      ok([
        {
          name: "x",
          description: "d",
          html_url: "u",
          language: "Go",
          stargazers_count: 2,
          forks_count: 1,
          updated_at: "2025-01-01",
          pushed_at: "2025-02-01",
          fork: false,
        },
      ])
    );
    const client = new GitHubRestClient({ username: "octo", fetcher });
    const repos = await client.listRepos();

    expect(repos[0]).toMatchObject({
      name: "x",
      stars: 2,
      updatedAt: "2025-02-01",
      topics: [],
    });
    const [, init] = fetcher.mock.calls[0]!;
    expect(init.headers.Authorization).toBeUndefined();
  });

  it("reads the account creation year", async () => {
    const fetcher = vi.fn().mockReturnValueOnce(
      ok({
        login: "octo",
        html_url: "https://github.com/octo",
        followers: 1,
        public_repos: 2,
        created_at: "2018-03-01T23:07:24Z",
      })
    );
    const client = new GitHubRestClient({ username: "octo", fetcher });
    await expect(client.getProfile()).resolves.toMatchObject({
      memberSince: 2018,
      publicRepos: 2,
    });
  });

  it("throws a typed error for failed requests", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValue({ ok: false, status: 403 } as Response);
    const client = new GitHubRestClient({
      username: "octo",
      token: "t",
      fetcher,
    });
    await expect(client.getProfile()).rejects.toThrow(/status 403/);
    expect(fetcher.mock.calls[0]![1].headers.Authorization).toBe("Bearer t");
  });
});
