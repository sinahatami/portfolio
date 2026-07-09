import { formatLanguageData, fetchGitHubStats } from "@/lib/github-api";

// Mock the global fetch function
global.fetch = jest.fn();

describe("GitHub API Utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Silence expected console errors during tests
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("formatLanguageData", () => {
    it("should calculate correct percentages and sort them descending", () => {
      const mockData = {
        TypeScript: 5,
        Python: 3,
        JavaScript: 2,
      };

      const result = formatLanguageData(mockData);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({ name: "TypeScript", percentage: 50 });
      expect(result[1]).toEqual({ name: "Python", percentage: 30 });
      expect(result[2]).toEqual({ name: "JavaScript", percentage: 20 });
    });

    it("should handle empty object", () => {
      expect(formatLanguageData({})).toEqual([]);
    });

    it("should limit to top 5 languages", () => {
      const mockData = {
        TypeScript: 10,
        Python: 9,
        JavaScript: 8,
        HTML: 7,
        CSS: 6,
        Shell: 5,
        Go: 4,
      };

      const result = formatLanguageData(mockData);

      expect(result).toHaveLength(5);
      expect(result[4].name).toBe("CSS"); // Shell and Go are excluded
    });
  });

  describe("fetchGitHubStats", () => {
    const originalEnv = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env = { ...originalEnv, GITHUB_TOKEN: "mock-token" };
    });

    afterAll(() => {
      process.env = originalEnv;
    });

    it("should return null if GITHUB_TOKEN is missing", async () => {
      delete process.env.GITHUB_TOKEN;
      const result = await fetchGitHubStats();
      expect(result).toBeNull();
    });

    it("should return null if user fetch fails", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      const result = await fetchGitHubStats();
      expect(result).toBeNull();
    });

    it("should process and return correct data on success", async () => {
      // Mock User Response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          followers: 10,
          following: 5,
          public_repos: 2,
          login: "sinahatami",
          avatar_url: "avatar.png",
        }),
      });

      // Mock Repos Response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [
          {
            name: "repo1",
            stargazers_count: 5,
            language: "TypeScript",
            updated_at: "2024-01-01",
          },
          {
            name: "repo2",
            stargazers_count: 3,
            language: "TypeScript",
            updated_at: "2024-01-02",
          },
        ],
      });

      // Mock Commits Response (optional inner fetch)
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
      });

      const result = await fetchGitHubStats();

      expect(result).not.toBeNull();
      expect(result?.user.followers).toBe(10);
      expect(result?.totalStars).toBe(8); // 5 + 3
      expect(result?.languages).toEqual({ TypeScript: 2 });
    });
  });
});
