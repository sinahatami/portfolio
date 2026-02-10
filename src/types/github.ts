export interface GitHubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
  forks_count: number;
}

export interface GitHubUser {
  followers: number;
  following: number;
  public_repos: number;
  login: string;
  avatar_url: string;
}

export interface GitHubStats {
  user: GitHubUser;
  repos: GitHubRepo[];
  languages: Record<string, number>;
  totalStars: number;
  recentCommits: number;
}
