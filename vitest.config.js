import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "unit",
    // Exclude Playwright tests and build outputs
    exclude: [
      "**/e2e/**",
      "**/tests/e2e/**",
      "**/playwright-report/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/*.spec.js", // Playwright tests
    ],
    // Use happy-dom for DOM simulation (faster than jsdom)
    environment: "happy-dom",
    // Enable coverage reporting
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "tests/",
        "**/*.spec.js",
        "**/playwright-report/**",
        "**/.lighthouseci/**",
      ],
    },
    // Run tests in parallel (Vitest 4+ syntax)
    fileParallelism: true,
    // Global test timeout
    testTimeout: 5000,
    // Hook timeout
    hookTimeout: 10000,
    // Enable globals (describe, test, expect)
    globals: true,
  },
});
