import { test, expect } from "@playwright/test";

test.describe("E2E & Console Safety", () => {
  test.beforeEach(async ({ page }) => {
    // Fail test on any console error
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        throw new Error(`Console Error: "${msg.text()}"`);
      }
    });
  });

  test("should load without console errors", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/NewsLauncher/);
  });

  test("should display search and bookmarks", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#googleSearchInput")).toBeVisible();
    // Use .first() because there are multiple bookmark groups
    await expect(page.locator(".bookmark-group").first()).toBeVisible();
  });

  test("should load themes", async ({ page }) => {
    await page.goto("/");
    const themeSelect = page.locator("#themeSelector");
    await expect(themeSelect).toBeVisible();
    await expect(themeSelect.locator("option")).not.toHaveCount(0);
  });

  test("should handle search functionality", async ({ page }) => {
    await page.goto("/");
    const searchInput = page.locator("#googleSearchInput");
    await searchInput.fill("playwright testing");
    await expect(searchInput).toHaveValue("playwright testing");

    // Verify form action
    const form = page.locator("form");
    await expect(form).toHaveAttribute(
      "action",
      "https://www.google.com/search"
    );
  });

  test("should switch themes correctly", async ({ page }) => {
    await page.goto("/");
    const body = page.locator("body");

    // Default theme might be sepia or based on system preference, let's switch to night
    await page.selectOption("#themeSelector", "night");
    await expect(body).toHaveClass(/theme-night/);

    // Verify localStorage
    const storedTheme = await page.evaluate(() =>
      localStorage.getItem("preferredTheme")
    );
    expect(storedTheme).toBe("night");

    // Switch to day
    await page.selectOption("#themeSelector", "day");
    await expect(body).toHaveClass(/theme-day/);
  });

  test("should trigger bookmarks via shortcuts", async ({ page }) => {
    await page.goto("/");

    // We need to mock window.open to verify the shortcut works without actually opening a popup
    await page.evaluate(() => {
      window.open = (url) => {
        window.lastOpenedUrl = url;
      };
    });

    // Ensure focus is not on input by clicking body
    await page.locator("body").click({ position: { x: 0, y: 0 } });

    // Type "gi" with a delay to mimic human typing and ensure buffer logic catches it
    await page.keyboard.type("gi", { delay: 100 });

    // Check if window.open was called with a github url
    const lastUrl = await page.evaluate(() => window.lastOpenedUrl);
    expect(lastUrl).toContain("github.com");
  });

  test("should have clickable bookmarks", async ({ page }) => {
    await page.goto("/");
    const githubLink = page.getByRole("link", { name: "Github" });

    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute("href", /github\.com/);
    await expect(githubLink).toHaveAttribute("target", "_blank");
  });
});
