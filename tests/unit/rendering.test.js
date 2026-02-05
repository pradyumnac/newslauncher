import { describe, test, expect } from "vitest";
import {
  renderBookmarkItem,
  renderFolderCard,
  renderBackButton,
} from "../../src/bookmark-rendering.js";
import {
  standardBookmark,
  bookmarkWithoutIcon,
  bookmarkWithEmptyIcon,
  mockFolders,
  emptyFolder,
  expectedPatterns,
} from "../fixtures/bookmarks.js";

describe("Rendering Functions", () => {
  describe("renderBookmarkItem", () => {
    test("RI-001: renders bookmark with icon correctly", () => {
      const html = renderBookmarkItem(standardBookmark);
      expect(html).toContain("fa-github");
      expect(html).toContain(standardBookmark.name);
      expect(html).toContain(standardBookmark.url);
    });

    test("RI-002: uses default icon when not provided", () => {
      const html = renderBookmarkItem(bookmarkWithoutIcon);
      expect(html).toContain("fa-link");
      expect(html).toContain(bookmarkWithoutIcon.name);
    });

    test("RI-004: uses default icon when empty string provided", () => {
      const html = renderBookmarkItem(bookmarkWithEmptyIcon);
      expect(html).toContain("fa-link");
    });

    test("RI-010: renders complete bookmark with all properties", () => {
      const html = renderBookmarkItem(standardBookmark);
      expect(html).toContain('class="icon-link"');
      expect(html).toContain('target="_blank"');
      expect(html).toContain("fa-solid");
    });
  });

  describe("renderFolderCard", () => {
    test("FC-001: renders folder with icon correctly", () => {
      const folder = mockFolders.news;
      const html = renderFolderCard(folder);
      expect(html).toContain(`data-folder-id="${folder.id}"`);
      expect(html).toContain("fa-newspaper");
      expect(html).toContain(folder.name);
      expect(html).toContain(`aria-label="${folder.name}"`);
    });

    test("FC-002: uses default icon when not provided", () => {
      const folderWithoutIcon = {
        id: "test",
        name: "Test Folder",
      };
      const html = renderFolderCard(folderWithoutIcon);
      expect(html).toContain("fa-folder");
      expect(html).toContain("Test Folder");
    });

    test("FC-003: uses default icon when empty string provided", () => {
      const html = renderFolderCard(emptyFolder);
      expect(html).toContain("fa-folder");
    });

    test("FC-006: handles missing id gracefully", () => {
      const folderWithoutId = {
        name: "No ID Folder",
        icon: "fa-test",
      };
      const html = renderFolderCard(folderWithoutId);
      expect(html).toContain('data-folder-id="undefined"');
    });

    test("FC-007: handles missing name gracefully", () => {
      const folderWithoutName = {
        id: "no-name",
        icon: "fa-test",
      };
      const html = renderFolderCard(folderWithoutName);
      expect(html).toContain("undefined");
    });
  });

  describe("renderBackButton", () => {
    test("BB-001: renders back button with correct structure", () => {
      const html = renderBackButton();
      expect(html).toContain('id="back-button"');
      expect(html).toContain("fa-arrow-left");
      expect(html).toContain("Back");
    });

    test("BB-002: contains Back text", () => {
      const html = renderBackButton();
      expect(html).toContain("Back");
    });

    test("BB-003: has correct classes", () => {
      const html = renderBackButton();
      expect(html).toContain("bookmark-group");
      expect(html).toContain("back-card");
    });

    test("BB-004: has aria-label", () => {
      const html = renderBackButton();
      expect(html).toContain('aria-label="Go Back"');
    });

    test("BB-005: back button structure is complete", () => {
      const html = renderBackButton();
      expectedPatterns.backButton.contains.forEach((pattern) => {
        expect(html).toContain(pattern);
      });
    });
  });
});
