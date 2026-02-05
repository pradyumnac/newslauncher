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

    // First, navigate to Tools folder using "to" hotkey
    await page.locator("body").click({ position: { x: 0, y: 0 } });
    await page.keyboard.type("to", { delay: 100 });

    // Wait for folder to open (back button should appear)
    await expect(page.locator("#back-button")).toBeVisible();

    // Now type "gi" for Github with a delay
    await page.keyboard.type("gi", { delay: 100 });

    // Check if window.open was called with a github url
    const lastUrl = await page.evaluate(() => window.lastOpenedUrl);
    expect(lastUrl).toContain("github.com");
  });

  test("should have clickable bookmarks", async ({ page }) => {
    await page.goto("/");

    // Navigate to Tools folder first
    await page.locator("[data-folder-id='tools']").click();
    await expect(page.locator("#back-button")).toBeVisible();

    const githubLink = page.getByRole("link", { name: "Github" });

    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute("href", /github\.com/);
    await expect(githubLink).toHaveAttribute("target", "_blank");
  });

  test("should have matching icon sizes for bookmarks and folder headers", async ({
    page,
  }) => {
    await page.goto("/");

    // Open a folder to show bookmarks
    await page.locator("[data-folder-id='tools']").click();
    await expect(page.locator("#back-button")).toBeVisible();

    // Get font-size of bookmark icon
    const bookmarkIconSize = await page
      .locator(".icon-link i")
      .first()
      .evaluate((el) => {
        return window.getComputedStyle(el).fontSize;
      });

    // Get font-size of back button icon (folder header)
    const backIconSize = await page
      .locator("#back-button .fa-arrow-left")
      .evaluate((el) => {
        return window.getComputedStyle(el).fontSize;
      });

    // Both icons should have the same size
    expect(bookmarkIconSize).toBe(backIconSize);
  });

  test.describe("Folder Navigation", () => {
    test("should display folders at root level", async ({ page }) => {
      await page.goto("/");

      // Check that folders are visible
      await expect(page.locator(".folder-card")).toHaveCount(3);
      await expect(page.locator("[data-folder-id='news']")).toBeVisible();
      await expect(page.locator("[data-folder-id='tools']")).toBeVisible();
      await expect(page.locator("[data-folder-id='content']")).toBeVisible();
    });

    test("should open folder on click", async ({ page }) => {
      await page.goto("/");

      // Click on News folder
      await page.locator("[data-folder-id='news']").click();

      // Should show back button
      await expect(page.locator("#back-button")).toBeVisible();

      // Should show bookmarks from News folder (Business Standard is in News)
      await expect(
        page.locator(".icon-link a:has-text('Business Standard')")
      ).toBeVisible();

      // Should NOT show folder cards anymore
      await expect(page.locator(".folder-card")).toHaveCount(0);
    });

    test("should navigate back using back button", async ({ page }) => {
      await page.goto("/");

      // Open News folder
      await page.locator("[data-folder-id='news']").click();
      await expect(page.locator("#back-button")).toBeVisible();

      // Click back
      await page.locator("#back-button").click();

      // Should show folders again
      await expect(page.locator(".folder-card")).toHaveCount(3);
      await expect(page.locator("#back-button")).toHaveCount(0);
    });

    test("should navigate back using Escape key", async ({ page }) => {
      await page.goto("/");

      // Open News folder
      await page.locator("[data-folder-id='news']").click();
      await expect(page.locator("#back-button")).toBeVisible();

      // Press Escape
      await page.keyboard.press("Escape");

      // Should show folders again
      await expect(page.locator(".folder-card")).toHaveCount(3);
    });

    test("should navigate back using Left Arrow key", async ({ page }) => {
      await page.goto("/");

      // Open News folder
      await page.locator("[data-folder-id='news']").click();
      await expect(page.locator("#back-button")).toBeVisible();

      // Press Left Arrow
      await page.keyboard.press("ArrowLeft");

      // Should show folders again
      await expect(page.locator(".folder-card")).toHaveCount(3);
    });

    test("should open folder via keyboard shortcut", async ({ page }) => {
      await page.goto("/");

      // Mock window.open to track navigation
      await page.evaluate(() => {
        window.open = (url) => {
          window.lastOpenedUrl = url;
        };
      });

      // Focus body
      await page.locator("body").click({ position: { x: 0, y: 0 } });

      // Type "ne" for News folder with delay
      await page.keyboard.type("ne", { delay: 100 });

      // Should have opened News folder (check for back button)
      await expect(page.locator("#back-button")).toBeVisible();
    });

    test("should assign different keybindings inside folder", async ({
      page,
    }) => {
      await page.goto("/");

      // Mock window.open
      await page.evaluate(() => {
        window.open = (url) => {
          window.lastOpenedUrl = url;
        };
      });

      // Open Tools folder
      await page.locator("[data-folder-id='tools']").click();

      // Focus body
      await page.locator("body").click({ position: { x: 0, y: 0 } });

      // Type "gi" for Github with delay (Github is in Tools folder)
      await page.keyboard.type("gi", { delay: 100 });

      // Check if window.open was called with github url
      const lastUrl = await page.evaluate(() => window.lastOpenedUrl);
      expect(lastUrl).toContain("github.com");
    });
  });
});
