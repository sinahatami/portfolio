// src/config/github.ts
import { z } from "zod";

const githubConfigSchema = z.object({
  token: z.string().min(1, "GitHub token is required."),
});

const githubConfig = {
  token: process.env["GITHUB_TOKEN"],
};

const validatedGithubConfig = githubConfigSchema.safeParse(githubConfig);

if (!validatedGithubConfig.success) {
  console.error(
    "Invalid GitHub configuration:",
    validatedGithubConfig.error.flatten().fieldErrors
  );
  throw new Error(
    "Invalid GitHub configuration. Please check your environment variables."
  );
}

export const GITHUB_CONFIG = validatedGithubConfig.data;
