import { test, expect } from "@playwright/test";

test.describe("Dashboard Layout", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("LAY-001: Desktop layout should respect 1/3 - 2/3 split", async ({
    page,
  }) => {
    // Default viewport is usually 1280x720 in Playwright, set explicitly to be safe
    await page.setViewportSize({ width: 1200, height: 800 });

    const leftPanel = page.locator(".user-bookmarks-container");
    const rightPanel = page.locator(".bookmark-carousel");

    const leftBox = await leftPanel.boundingBox();
    const rightBox = await rightPanel.boundingBox();

    // Check if elements exist and have dimensions
    expect(leftBox).not.toBeNull();
    expect(rightBox).not.toBeNull();

    const totalWidth = leftBox.width + rightBox.width; // Ignoring gap for ratio check between the two columns relative to each other
    // Ratio of Left vs Right width should be 0.5 (1/2) since 1fr / 2fr
    // Or Left / TotalContentWidth = 1/3 (~0.33)

    const leftRatio = leftBox.width / (leftBox.width + rightBox.width);

    // 1fr + 2fr = 3 parts. Left is 1 part. 1/3 = 0.333...
    expect(leftRatio).toBeCloseTo(0.33, 1); // 1 decimal point precision is enough (0.3)
  });

  test("LAY-002: Sections should have equal height on desktop", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });

    const leftPanel = page.locator(".user-bookmarks-container");
    const rightPanel = page.locator(".bookmark-carousel");

    const leftBox = await leftPanel.boundingBox();
    const rightBox = await rightPanel.boundingBox();

    // They should be equal height due to grid stretch behavior
    expect(leftBox.height).toBeCloseTo(rightBox.height, 0);

    // And should be at least the fixed height we set (340px)
    expect(leftBox.height).toBeGreaterThanOrEqual(340);
  });

  test("LAY-003: Mobile layout should stack vertically", async ({ page }) => {
    // Mobile viewport
    await page.setViewportSize({ width: 500, height: 800 });

    const leftPanel = page.locator(".user-bookmarks-container");
    const rightPanel = page.locator(".bookmark-carousel");

    const leftBox = await leftPanel.boundingBox();
    const rightBox = await rightPanel.boundingBox();

    // Left (My Bookmarks) is first in HTML, so it should be visually above Right (Carousel)
    // Check Y coordinates: Left Bottom <= Right Top (plus margin/gap)
    expect(leftBox.y + leftBox.height).toBeLessThanOrEqual(rightBox.y + 10); // tolerance

    // Widths should be roughly full width (e.g. > 400 on 500px screen with paddings)
    expect(leftBox.width).toBeGreaterThan(400);
    expect(rightBox.width).toBeGreaterThan(400);
  });

  test("LAY-004: Layout split persists even with overflowing carousel content", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1200, height: 800 });

    // Inject massive content to force overflow in the carousel
    await page.evaluate(() => {
      const bookmarks = [];
      for (let i = 0; i < 50; i++) {
        bookmarks.push({
          name: `Very Long Bookmark Name Item ${i}`,
          url: "#",
          icon: "fa-link",
        });
      }
      bookmarkData.folders.push({
        id: "huge-layout-test",
        name: "Huge Layout Test",
        icon: "fa-hdd",
        bookmarks: bookmarks,
      });
      renderRootView();
    });

    // Open the huge folder which triggers grid-view and overflow
    await page.locator("[data-folder-id='huge-layout-test']").click();

    const leftPanel = page.locator(".user-bookmarks-container");
    const container = page.locator(".main-layout");

    const leftBox = await leftPanel.boundingBox();
    const containerBox = await container.boundingBox();

    // If min-width: 0 is missing, the carousel (2fr) might blow out and shrink the left panel (1fr) or overflow the container
    // Left panel should still maintain approx 1/3 of the container width
    const ratio = leftBox.width / containerBox.width;

    // 1fr / 3fr total (approx) -> 0.33
    // Allow some margin for gap/padding
    expect(ratio).toBeGreaterThan(0.25);
    expect(ratio).toBeLessThan(0.4);
  });
});
