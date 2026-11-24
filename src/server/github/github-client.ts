import type { GitHubProfileSummary, Repo } from "@/domain/github";

/** Port: what the app needs from GitHub, nothing more (ISP). */
export interface GitHubClient {
  getProfile(): Promise<GitHubProfileSummary>;
  listRepos(): Promise<Repo[]>;
}

/** Subset of the REST API payloads we consume. */
interface GitHubUserDto {
  login: string;
  html_url: string;
  followers: number;
  public_repos: number;
  created_at: string;
}

interface GitHubRepoDto {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  updated_at: string;
  pushed_at?: string;
  fork: boolean;
}

export class GitHubRequestError extends Error {
  constructor(
    readonly path: string,
    readonly status: number
  ) {
    super(`GitHub request to ${path} failed with status ${status}`);
    this.name = "GitHubRequestError";
  }
}

interface GitHubRestClientOptions {
  username: string;
  /** Optional: unauthenticated requests work, with a lower rate limit. */
  token?: string | undefined;
  revalidateSeconds?: number;
  fetcher?: typeof fetch;
}

/** Adapter from GitHub's REST API to the `GitHubClient` port. */
export class GitHubRestClient implements GitHubClient {
  private readonly baseUrl = "https://api.github.com";

  constructor(private readonly options: GitHubRestClientOptions) {}

  async getProfile(): Promise<GitHubProfileSummary> {
    const user = await this.request<GitHubUserDto>(
      `/users/${this.options.username}`
    );
    return {
      login: user.login,
      url: user.html_url,
      followers: user.followers,
      publicRepos: user.public_repos,
      memberSince: new Date(user.created_at).getUTCFullYear(),
    };
  }

  async listRepos(): Promise<Repo[]> {
    const repos = await this.request<GitHubRepoDto[]>(
      `/users/${this.options.username}/repos?per_page=100&sort=pushed`
    );
    return repos.map((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      topics: repo.topics ?? [],
      updatedAt: repo.pushed_at ?? repo.updated_at,
      isFork: repo.fork,
    }));
  }

  private async request<T>(path: string): Promise<T> {
    const fetcher = this.options.fetcher ?? fetch;
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (this.options.token) {
      headers["Authorization"] = `Bearer ${this.options.token}`;
    }

    const response = await fetcher(`${this.baseUrl}${path}`, {
      headers,
      next: { revalidate: this.options.revalidateSeconds ?? 3600 },
    });

    if (!response.ok) throw new GitHubRequestError(path, response.status);
    return (await response.json()) as T;
  }
}
