import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env["E2E_PORT"] ?? 3100);
const baseURL = process.env["E2E_BASE_URL"] ?? `http://localhost:${PORT}`;
const isCI = Boolean(process.env["CI"]);

/**
 * End-to-end tests run against the production build (`yarn build` first).
 * Set E2E_BASE_URL to test an already running or deployed site instead.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  ...(isCI ? { workers: 2 } : {}),
  reporter: isCI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  ...(process.env["E2E_BASE_URL"]
    ? {}
    : {
        webServer: {
          command: `yarn start --port ${PORT}`,
          url: baseURL,
          reuseExistingServer: !isCI,
          timeout: 60_000,
        },
      }),
});
