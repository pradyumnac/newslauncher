import { test, expect } from "@playwright/test";

test.describe("Horizontal Scroll & Layout Logic", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("SCROLL-001: Small folder should disable scroll arrows and use grid layout", async ({
    page,
  }) => {
    // 1. Inject a small folder (3 items)
    await page.evaluate(() => {
      bookmarkData.folders.push({
        id: "small-test",
        name: "Small Test",
        icon: "fa-vial",
        bookmarks: [
          { name: "Item 1", url: "#", icon: "fa-link" },
          { name: "Item 2", url: "#", icon: "fa-link" },
          { name: "Item 3", url: "#", icon: "fa-link" },
        ],
      });
      // Re-render to show new folder
      renderRootView();
    });

    // 2. Open the small folder
    await page.locator("[data-folder-id='small-test']").click();

    // 3. Check layout class
    const section = page.locator(".bookmark-section");
    await expect(section).toHaveClass(/grid-view/);

    // 4. Check arrows are disabled (no overflow)
    const leftArrow = page.locator(".carousel-arrow-left");
    const rightArrow = page.locator(".carousel-arrow-right");

    await expect(leftArrow).toBeDisabled();
    await expect(rightArrow).toBeDisabled();
  });

  test("SCROLL-002: Big folder should enable scroll arrows and scroll content", async ({
    page,
  }) => {
    // 1. Inject a big folder (100 items)
    await page.evaluate(() => {
      const bookmarks = [];
      for (let i = 1; i <= 100; i++) {
        bookmarks.push({
          name: `Long Name Item ${i}`,
          url: "#",
          icon: "fa-link",
        });
      }
      bookmarkData.folders.push({
        id: "big-test",
        name: "Big Test",
        icon: "fa-flask",
        bookmarks: bookmarks,
      });
      renderRootView();
    });

    // 2. Open the big folder
    await page.locator("[data-folder-id='big-test']").click();

    // 3. Check arrows initial state
    const leftArrow = page.locator(".carousel-arrow-left");
    const rightArrow = page.locator(".carousel-arrow-right");
    const section = page.locator(".bookmark-section");

    // Check if scrollWidth > clientWidth first to be sure
    const scrollState = await section.evaluate((el) => ({
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
    }));
    console.log("Scroll State:", scrollState);
    expect(scrollState.scrollWidth).toBeGreaterThan(scrollState.clientWidth);

    // Left should be disabled (start), Right enabled
    await expect(leftArrow).toBeDisabled();
    await expect(rightArrow).not.toBeDisabled();

    // 4. Click Right Arrow
    await rightArrow.click();

    // Wait for scroll (debounced update or scroll end)
    await expect
      .poll(
        async () => {
          return await section.evaluate((el) => el.scrollLeft);
        },
        {
          timeout: 5000,
        }
      )
      .toBeGreaterThan(0);

    // 5. Verify Left arrow becomes enabled
    await expect(leftArrow).not.toBeDisabled();
  });

  test("SCROLL-003: Root view should not use grid layout", async ({ page }) => {
    const section = page.locator(".bookmark-section");
    await expect(section).not.toHaveClass(/grid-view/);
  });

  test("SCROLL-004: Navigating back from folder removes grid layout", async ({
    page,
  }) => {
    // Open any folder
    await page.locator("[data-folder-id='news']").click();
    const section = page.locator(".bookmark-section");
    await expect(section).toHaveClass(/grid-view/);

    // Go back
    await page.locator("#back-button").click();
    await expect(section).not.toHaveClass(/grid-view/);
  });
});
