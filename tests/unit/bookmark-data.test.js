import { describe, test, expect } from "vitest";
import { bookmarkData } from "../../src/bookmark-data.js";
import {
  invalidNestedFolder,
  invalidNestedBookmarks,
  invalidDeepNesting,
} from "../fixtures/bookmarks.js";

describe("Data Structure Validation", () => {
  test("DV-001: valid flat structure returns true", () => {
    expect(bookmarkData.validateNoNestedFolders()).toBe(true);
  });

  test("DV-002: nested folder detected throws Error", () => {
    expect(() => {
      invalidNestedFolder.validateNoNestedFolders();
    }).toThrow("2nd level nesting is not allowed");
  });

  test("DV-003: nested bookmarks property throws Error", () => {
    expect(() => {
      invalidNestedBookmarks.validateNoNestedFolders();
    }).toThrow("2nd level nesting is not allowed");
  });

  test("DV-004: empty folders array returns true", () => {
    const emptyData = {
      folders: [],
      validateNoNestedFolders: bookmarkData.validateNoNestedFolders,
    };
    expect(emptyData.validateNoNestedFolders()).toBe(true);
  });

  test("DV-005: empty bookmarks array returns true", () => {
    const emptyBookmarksData = {
      folders: [
        {
          id: "test",
          name: "Test",
          bookmarks: [],
        },
      ],
      validateNoNestedFolders: bookmarkData.validateNoNestedFolders,
    };
    expect(emptyBookmarksData.validateNoNestedFolders()).toBe(true);
  });

  test("DV-006: deep nested folder (3 levels) throws Error", () => {
    expect(() => {
      invalidDeepNesting.validateNoNestedFolders();
    }).toThrow("2nd level nesting is not allowed");
  });

  test("DV-007: mixed valid and invalid throws Error", () => {
    const mixedData = {
      folders: [
        {
          id: "valid",
          name: "Valid",
          bookmarks: [{ name: "OK", url: "https://ok.com" }],
        },
        {
          id: "invalid",
          name: "Invalid",
          bookmarks: [
            {
              name: "Nested",
              url: "https://nested.com",
              folders: [{}],
            },
          ],
        },
      ],
      validateNoNestedFolders: bookmarkData.validateNoNestedFolders,
    };

    expect(() => {
      mixedData.validateNoNestedFolders();
    }).toThrow("2nd level nesting is not allowed");
  });

  test("DV-008: null bookmarks returns true", () => {
    const nullBookmarksData = {
      folders: [
        {
          id: "test",
          name: "Test",
          bookmarks: null,
        },
      ],
      validateNoNestedFolders: bookmarkData.validateNoNestedFolders,
    };
    expect(nullBookmarksData.validateNoNestedFolders()).toBe(true);
  });

  test("DV-009: bookmark with only id and name returns true", () => {
    const partialBookmarkData = {
      folders: [
        {
          id: "test",
          name: "Test",
          bookmarks: [{ id: "1", name: "test" }],
        },
      ],
      validateNoNestedFolders: bookmarkData.validateNoNestedFolders,
    };
    expect(partialBookmarkData.validateNoNestedFolders()).toBe(true);
  });

  test("DV-010: multiple folders with nested throws Error", () => {
    const multipleInvalidData = {
      folders: [
        {
          id: "invalid1",
          name: "Invalid1",
          bookmarks: [
            { name: "Nested", url: "https://nested.com", folders: [] },
          ],
        },
        {
          id: "invalid2",
          name: "Invalid2",
          bookmarks: [
            { name: "Nested2", url: "https://nested2.com", folders: [] },
          ],
        },
      ],
      validateNoNestedFolders: bookmarkData.validateNoNestedFolders,
    };

    expect(() => {
      multipleInvalidData.validateNoNestedFolders();
    }).toThrow("2nd level nesting is not allowed");
  });
});

describe("Bookmark Data Structure", () => {
  test("has 3 folders defined", () => {
    expect(bookmarkData.folders).toHaveLength(3);
  });

  test("has News folder with correct properties", () => {
    const newsFolder = bookmarkData.folders.find((f) => f.id === "news");
    expect(newsFolder).toBeDefined();
    expect(newsFolder.name).toBe("News");
    expect(newsFolder.icon).toBe("fa-newspaper");
    expect(newsFolder.bookmarks.length).toBeGreaterThan(0);
  });

  test("has Tools folder with correct properties", () => {
    const toolsFolder = bookmarkData.folders.find((f) => f.id === "tools");
    expect(toolsFolder).toBeDefined();
    expect(toolsFolder.name).toBe("Tools");
    expect(toolsFolder.icon).toBe("fa-toolbox");
    expect(toolsFolder.bookmarks.length).toBeGreaterThan(0);
  });

  test("has Content folder with correct properties", () => {
    const contentFolder = bookmarkData.folders.find((f) => f.id === "content");
    expect(contentFolder).toBeDefined();
    expect(contentFolder.name).toBe("Content");
    expect(contentFolder.icon).toBe("fa-book-open");
    expect(contentFolder.bookmarks.length).toBeGreaterThan(0);
  });

  test("stickyBookmarks array exists and is empty", () => {
    expect(Array.isArray(bookmarkData.stickyBookmarks)).toBe(true);
    expect(bookmarkData.stickyBookmarks).toHaveLength(0);
  });

  test("each bookmark has required properties", () => {
    bookmarkData.folders.forEach((folder) => {
      folder.bookmarks.forEach((bookmark) => {
        expect(bookmark).toHaveProperty("name");
        expect(bookmark).toHaveProperty("url");
        expect(bookmark).toHaveProperty("icon");
      });
    });
  });

  test("no bookmark has nested folders or bookmarks", () => {
    // This validates the actual data structure
    bookmarkData.folders.forEach((folder) => {
      folder.bookmarks.forEach((bookmark) => {
        expect(bookmark).not.toHaveProperty("folders");
        expect(bookmark).not.toHaveProperty("bookmarks");
      });
    });
  });
});
