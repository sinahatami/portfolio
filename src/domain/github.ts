/** Shape of a repository as the rest of the app needs it (not GitHub's DTO). */
export interface Repo {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  updatedAt: string;
  isFork: boolean;
}

export interface GitHubProfileSummary {
  login: string;
  url: string;
  followers: number;
  publicRepos: number;
  /** Year the account was created. */
  memberSince: number;
}

export interface LanguageShare {
  name: string;
  /** Number of repositories whose primary language is `name`. */
  repos: number;
  /** Rounded share of all repositories, 0–100. */
  percentage: number;
}

export interface GitHubActivity {
  profile: GitHubProfileSummary;
  languages: LanguageShare[];
  /** Original repositories (no forks, no profile README), newest first. */
  repos: Repo[];
}
