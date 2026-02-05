import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "**/*.spec.js",
  // Exclude Vitest test directories
  testIgnore: ["**/tests/unit/**", "**/tests/integration/**"],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    trace: "on-first-retry",
  },
  // Only start web server if running against local
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npx serve . -p 3000",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
      },
  projects: [
    {
      name: "chromium",
      use: {
        launchOptions: {
          executablePath: "/usr/bin/chromium",
        },
        headless: true,
      },
    },
  ],
});
