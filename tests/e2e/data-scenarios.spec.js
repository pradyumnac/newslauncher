import { test, expect } from "@playwright/test";

test.describe("Data Scenarios & Icon Sizing", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // Helper to inject data
  const injectData = async (page, data) => {
    await page.evaluate((newData) => {
      // Clear existing
      bookmarkData.folders = newData.folders || [];
      bookmarkData.stickyBookmarks = newData.stickyBookmarks || [];
      renderRootView();
    }, data);
  };

  const generateBookmarks = (count, prefix = "Item") => {
    return Array.from({ length: count }, (_, i) => ({
      name: `${prefix} ${i + 1}`,
      url: "#",
      icon: "fa-link",
    }));
  };

  test("SCENARIO-001: Folder with > 100 bookmarks (Grid Uniformity & Back Button Size)", async ({
    page,
  }) => {
    await injectData(page, {
      folders: [
        {
          id: "huge-folder",
          name: "Huge Folder",
          icon: "fa-folder",
          bookmarks: generateBookmarks(120),
        },
      ],
    });

    // Open folder
    await page.locator("[data-folder-id='huge-folder']").click();

    // 1. Verify Grid Layout
    const section = page.locator(".bookmark-section");
    await expect(section).toHaveClass(/grid-view/);

    // 2. Verify Back Button Icon Size == Bookmark Icon Size
    const backIconSize = await page
      .locator("#back-button i")
      .evaluate((el) => window.getComputedStyle(el).fontSize);

    const bookmarkIconSize = await page
      .locator(".icon-link i")
      .first()
      .evaluate((el) => window.getComputedStyle(el).fontSize);

    expect(backIconSize).toBe(bookmarkIconSize);

    // 3. Verify Grid Icons Uniformity (Check first 5 and last 5)
    // Note: Back button is now .icon-link too, so count is 120 + 1
    const icons = page.locator(".icon-link i");
    const count = await icons.count();
    expect(count).toBe(121);

    // Index 0 is Back Button. Index 1 is first bookmark.
    for (let i of [0, 1, 2, 119, 120]) {
      const size = await icons
        .nth(i)
        .evaluate((el) => window.getComputedStyle(el).fontSize);
      expect(size).toBe(bookmarkIconSize);
    }
  });

  test("SCENARIO-002: Folder with < 10 bookmarks", async ({ page }) => {
    await injectData(page, {
      folders: [
        {
          id: "tiny-folder",
          name: "Tiny Folder",
          icon: "fa-folder",
          bookmarks: generateBookmarks(5),
        },
      ],
    });

    await page.locator("[data-folder-id='tiny-folder']").click();
    // 5 bookmarks + 1 back button
    await expect(page.locator(".icon-link")).toHaveCount(6);

    // Layout check: Should still be grid view
    await expect(page.locator(".bookmark-section")).toHaveClass(/grid-view/);
  });

  test("SCENARIO-003: Mix of small and large folders (Folder Icon Size Check)", async ({
    page,
  }) => {
    await injectData(page, {
      folders: [
        {
          id: "small",
          name: "Small",
          icon: "fa-compress",
          bookmarks: generateBookmarks(3),
        },
        {
          id: "large",
          name: "Large",
          icon: "fa-expand",
          bookmarks: generateBookmarks(50),
        },
      ],
    });

    // In Root View: Verify Folder Icons are BIGGER than Bookmark Icons
    // We need a bookmark to compare against. Let's add a sticky bookmark or assume bookmark size constant.
    // Or we can check computed style > 16px (1rem).

    const folderIconSize = await page
      .locator("[data-folder-id='small'] .folder-header i")
      .evaluate((el) => parseFloat(window.getComputedStyle(el).fontSize));

    // Standard bookmark size is 1rem (16px)
    // Folder icon size was set to 1.5rem (24px)
    expect(folderIconSize).toBeGreaterThan(16);
    expect(folderIconSize).toBeCloseTo(24, 1);

    // Verify both folders have same icon size
    const largeFolderIconSize = await page
      .locator("[data-folder-id='large'] .folder-header i")
      .evaluate((el) => parseFloat(window.getComputedStyle(el).fontSize));

    expect(largeFolderIconSize).toBe(folderIconSize);
  });

  test("SCENARIO-004: Top level folder + sticky bookmarks", async ({
    page,
  }) => {
    await injectData(page, {
      folders: [
        {
          id: "f1",
          name: "F1",
          bookmarks: [],
        },
      ],
      stickyBookmarks: generateBookmarks(3, "Sticky"),
    });

    // Should see sticky bookmarks AND folder card
    // Back button is NOT present in root view
    await expect(page.locator(".icon-link")).toHaveCount(3); // Sticky
    await expect(page.locator(".folder-card")).toHaveCount(1); // Folder

    // Verify Sticky Bookmark Icon Size (Should be 1rem)
    const stickyIconSize = await page
      .locator(".icon-link i")
      .first()
      .evaluate((el) => parseFloat(window.getComputedStyle(el).fontSize));

    expect(stickyIconSize).toBe(16);

    // Verify Folder Icon Size (Should be 1.5rem)
    const folderIconSize = await page
      .locator(".folder-card .folder-header i")
      .evaluate((el) => parseFloat(window.getComputedStyle(el).fontSize));

    expect(folderIconSize).toBe(24);

    // Explicit check: Folder > Bookmark
    expect(folderIconSize).toBeGreaterThan(stickyIconSize);
  });
});
