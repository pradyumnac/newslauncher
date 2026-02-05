import { test, expect } from "@playwright/test";

test.describe("Unit Logic (Browser Context)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for JS to load
    await page.waitForLoadState("domcontentloaded");
  });

  test("fetchQuotesData should return quotes (Mocked)", async ({ page }) => {
    // Mock the network request for quotes
    await page.route("**/data/quotes.db.ascii.json", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([{ id: 1, q: "Test Quote", a: "Test Author" }]),
      });
    });

    // Execute function in browser context
    const quotes = await page.evaluate(async () => {
      // Ensure the function is exposed (it is in global scope in quotes.js)
      return await window.fetchQuotesData();
    });

    expect(quotes).toHaveLength(1);
    expect(quotes[0].q).toBe("Test Quote");
  });

  test("IndexedDB should initialize", async ({ page }) => {
    const dbExists = await page.evaluate(async () => {
      const dbName = "QuotesDB";
      return new Promise((resolve) => {
        const req = indexedDB.open(dbName);
        req.onsuccess = () => {
          req.result.close();
          resolve(true);
        };
        req.onerror = () => resolve(false);
      });
    });
    expect(dbExists).toBe(true);
  });

  test("fetchLatestVersion should return version string", async ({ page }) => {
    await page.route("**/data/quotes-version.json", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ version: "1.0.TEST" }),
      });
    });

    const version = await page.evaluate(async () => {
      return await window.fetchLatestVersion();
    });
    expect(version).toBe("1.0.TEST");
  });

  test("getRandomQuote should return null if DB is empty", async ({ page }) => {
    // Clear DB first
    await page.evaluate(async () => {
      await window.clearQuotesDB();
    });

    const quote = await page.evaluate(async () => {
      return await window.getRandomQuote();
    });
    expect(quote).toBeNull();
  });

  test("searchQuotes should return empty array for empty search", async ({
    page,
  }) => {
    const results = await page.evaluate(async () => {
      return await window.searchQuotes("   ");
    });
    expect(results).toEqual([]);
  });

  test("clearQuotesDB should clear the store", async ({ page }) => {
    // Populate first (manually via openQuotesDB to avoid network dependency in this specific test if desired,
    // but reusing logic is fine)
    await page.evaluate(async () => {
      const { db, store } = await window.openQuotesDB();
      // We can't easily write via openQuotesDB helper as it returns {db, store} but transaction might be committed or closed.
      // Actually openQuotesDB creates a tx. Let's use it.
      const tx = db.transaction("quotes", "readwrite");
      const storeWrite = tx.objectStore("quotes");
      storeWrite.put({ id: 999, q: "To be cleared", a: "Me" });
      return new Promise((resolve) => {
        tx.oncomplete = () => resolve();
      });
    });

    // Verify it is there
    const countBefore = await page.evaluate(async () => {
      const { db, store } = await window.openQuotesDB();
      const req = store.count();
      return new Promise((resolve) => {
        req.onsuccess = () => resolve(req.result);
      });
    });
    expect(countBefore).toBeGreaterThan(0);

    // Clear
    await page.evaluate(async () => {
      await window.clearQuotesDB();
    });

    // Verify empty
    const countAfter = await page.evaluate(async () => {
      const { db, store } = await window.openQuotesDB();
      const req = store.count();
      return new Promise((resolve) => {
        req.onsuccess = () => resolve(req.result);
      });
    });
    expect(countAfter).toBe(0);
  });

  test.describe("Bookmark Data Structure Validation", () => {
    test("should validate no nested folders in bookmark data", async ({
      page,
    }) => {
      const isValid = await page.evaluate(() => {
        try {
          return bookmarkData.validateNoNestedFolders();
        } catch (e) {
          return false;
        }
      });
      expect(isValid).toBe(true);
    });

    test("should throw error when nested folder is detected", async ({
      page,
    }) => {
      // Temporarily inject invalid data with nested folder
      const errorMessage = await page.evaluate(() => {
        const originalData = JSON.parse(JSON.stringify(bookmarkData.folders));

        // Inject invalid nested folder
        bookmarkData.folders[0].bookmarks.push({
          id: "nested",
          name: "Invalid Nested",
          folders: [{ id: "nested2", name: "Deep Nested" }],
        });

        try {
          bookmarkData.validateNoNestedFolders();
          return null;
        } catch (e) {
          return e.message;
        } finally {
          // Restore original data
          bookmarkData.folders = originalData;
        }
      });

      expect(errorMessage).toContain("2nd level nesting is not allowed");
    });

    test("should throw error when nested bookmarks property exists", async ({
      page,
    }) => {
      const errorMessage = await page.evaluate(() => {
        const originalData = JSON.parse(JSON.stringify(bookmarkData.folders));

        // Inject invalid data with bookmarks property (not in a folder)
        bookmarkData.folders[0].bookmarks.push({
          id: "nested",
          name: "Invalid Nested",
          bookmarks: [{ name: "Deep Bookmark", url: "http://example.com" }],
        });

        try {
          bookmarkData.validateNoNestedFolders();
          return null;
        } catch (e) {
          return e.message;
        } finally {
          // Restore original data
          bookmarkData.folders = originalData;
        }
      });

      expect(errorMessage).toContain("2nd level nesting is not allowed");
    });
  });
});
