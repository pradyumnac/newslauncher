/**
 * Test Fixtures - Shared test data for bookmark tests
 * Centralized mock data to ensure consistency across unit and integration tests
 */

// ============================================================================
// FOLDER FIXTURES
// ============================================================================

/**
 * Standard folders for testing
 */
export const mockFolders = {
  news: {
    id: "news",
    name: "News",
    icon: "fa-newspaper",
    bookmarks: [
      {
        name: "Business Standard",
        url: "https://www.business-standard.com/",
        icon: "fa-briefcase",
      },
      {
        name: "Livemint",
        url: "https://www.livemint.com/news",
        icon: "fa-newspaper",
      },
      {
        name: "Economic Times",
        url: "https://economictimes.indiatimes.com/",
        icon: "fa-chart-line",
      },
    ],
  },
  tools: {
    id: "tools",
    name: "Tools",
    icon: "fa-toolbox",
    bookmarks: [
      { name: "Gmail", url: "https://mail.google.com/", icon: "fa-envelope" },
      { name: "ChatGPT", url: "https://chat.openai.com/", icon: "fa-robot" },
      { name: "Github", url: "https://github.com/", icon: "fa-github" },
    ],
  },
  content: {
    id: "content",
    name: "Content",
    icon: "fa-book-open",
    bookmarks: [
      {
        name: "VP Forum",
        url: "https://forum.valuepickr.com/",
        icon: "fa-users",
      },
      {
        name: "Finshots",
        url: "https://www.finshots.in/",
        icon: "fa-envelope-open-text",
      },
    ],
  },
};

/**
 * Minimal folder for edge case testing
 */
export const minimalFolder = {
  id: "minimal",
  name: "X",
  bookmarks: [],
};

/**
 * Empty folder for testing
 */
export const emptyFolder = {
  id: "empty",
  name: "Empty",
  icon: "fa-folder",
  bookmarks: [],
};

/**
 * Folder with special characters in name
 */
export const specialCharFolder = {
  id: "special",
  name: "News & Updates!",
  icon: "fa-star",
  bookmarks: [{ name: "Test", url: "https://test.com", icon: "fa-link" }],
};

// ============================================================================
// BOOKMARK FIXTURES
// ============================================================================

/**
 * Standard bookmark for testing
 */
export const standardBookmark = {
  name: "Github",
  url: "https://github.com",
  icon: "fa-github",
};

/**
 * Bookmark without icon (should use default)
 */
export const bookmarkWithoutIcon = {
  name: "Test Site",
  url: "https://test.com",
};

/**
 * Bookmark with empty icon
 */
export const bookmarkWithEmptyIcon = {
  name: "Empty Icon Site",
  url: "https://empty-icon.com",
  icon: "",
};

/**
 * Bookmark with special characters in name
 */
export const specialCharBookmark = {
  name: "Test <script>alert('xss')</script>",
  url: "https://test.com",
  icon: "fa-test",
};

/**
 * Bookmark with URL parameters
 */
export const bookmarkWithParams = {
  name: "Search",
  url: "https://search.com?q=test&page=1&filter=all",
  icon: "fa-search",
};

/**
 * Long name bookmark
 */
export const longNameBookmark = {
  name: "A".repeat(100),
  url: "https://long-name.com",
  icon: "fa-long",
};

/**
 * Unicode name bookmark
 */
export const unicodeBookmark = {
  name: "日本語サイト",
  url: "https://japanese-site.jp",
  icon: "fa-globe",
};

/**
 * Bookmark with numbers
 */
export const numberedBookmark = {
  name: "123 Test",
  url: "https://123test.com",
  icon: "fa-123",
};

// ============================================================================
// INVALID DATA FIXTURES (for error testing)
// ============================================================================

/**
 * Invalid: Nested folder in bookmark
 */
export const invalidNestedFolder = {
  folders: [
    {
      id: "invalid",
      name: "Invalid",
      bookmarks: [
        {
          name: "Nested",
          url: "https://nested.com",
          folders: [{ id: "nested", name: "Nested Folder" }],
        },
      ],
    },
  ],
  validateNoNestedFolders: function () {
    for (const folder of this.folders) {
      if (folder.bookmarks) {
        for (const bookmark of folder.bookmarks) {
          if (bookmark.folders || bookmark.bookmarks) {
            throw new Error(
              `Invalid data: Nested folder detected in "${folder.name}". 2nd level nesting is not allowed.`
            );
          }
        }
      }
    }
    return true;
  },
};

/**
 * Invalid: Nested bookmarks property
 */
export const invalidNestedBookmarks = {
  folders: [
    {
      id: "invalid",
      name: "Invalid",
      bookmarks: [
        {
          name: "Nested",
          url: "https://nested.com",
          bookmarks: [{ name: "Deep", url: "https://deep.com" }],
        },
      ],
    },
  ],
  validateNoNestedFolders: function () {
    for (const folder of this.folders) {
      if (folder.bookmarks) {
        for (const bookmark of folder.bookmarks) {
          if (bookmark.folders || bookmark.bookmarks) {
            throw new Error(
              `Invalid data: Nested folder detected in "${folder.name}". 2nd level nesting is not allowed.`
            );
          }
        }
      }
    }
    return true;
  },
};

/**
 * Invalid: Deep nesting (3 levels)
 */
export const invalidDeepNesting = {
  folders: [
    {
      id: "invalid",
      name: "Invalid",
      bookmarks: [
        {
          name: "Level1",
          url: "https://level1.com",
          folders: [
            {
              id: "level2",
              name: "Level2",
              bookmarks: [
                {
                  name: "Level3",
                  url: "https://level3.com",
                  folders: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  validateNoNestedFolders: function () {
    for (const folder of this.folders) {
      if (folder.bookmarks) {
        for (const bookmark of folder.bookmarks) {
          if (bookmark.folders || bookmark.bookmarks) {
            throw new Error(
              `Invalid data: Nested folder detected in "${folder.name}". 2nd level nesting is not allowed.`
            );
          }
        }
      }
    }
    return true;
  },
};

// ============================================================================
// KEYBINDING FIXTURES
// ============================================================================

/**
 * Used combinations set for testing
 */
export const usedCombosEmpty = new Set();

export const usedCombosWithGi = new Set(["gi"]);

export const usedCombosAllGithub = new Set(["gi", "it", "th", "hu", "ub"]);

/**
 * Names for keybinding generation tests
 */
export const keybindingTestNames = {
  simple: "Github",
  withSpaces: "Business Standard",
  short: "X",
  empty: "",
  numbers: "123test",
  specialChars: "Test-Name",
  mixedCase: "GiThUb",
  unicode: "日本語",
  leadingSpaces: "  Github",
  internalSpaces: "G it",
  numbersOnly: "12345",
  startsWithNumber: "1Password",
  minimal: "ab",
};

// ============================================================================
// RENDERING EXPECTATIONS
// ============================================================================

/**
 * Expected HTML patterns for rendering tests
 */
export const expectedPatterns = {
  bookmarkItem: {
    withIcon: (bookmark) => ({
      contains: [
        `href="${bookmark.url}"`,
        `fa-${bookmark.icon || "link"}`,
        bookmark.name,
      ],
    }),
  },
  folderCard: {
    standard: (folder) => ({
      contains: [
        `data-folder-id="${folder.id}"`,
        `fa-${folder.icon || "folder"}`,
        folder.name,
        `aria-label="${folder.name}"`,
      ],
    }),
  },
  backButton: {
    contains: [
      'id="back-button"',
      "fa-arrow-left",
      "Back",
      'aria-label="Go Back"',
      "bookmark-group",
      "back-card",
    ],
  },
};

// ============================================================================
// LOCALSTORAGE FIXTURES
// ============================================================================

/**
 * Mock localStorage data for bookmark management tests
 */
export const mockLocalStorage = {
  empty: "[]",
  single: JSON.stringify([{ name: "Test", url: "https://test.com" }]),
  multiple: JSON.stringify([
    { name: "Reddit", url: "https://reddit.com" },
    { name: "Twitter", url: "https://twitter.com" },
    { name: "GitHub", url: "https://github.com" },
  ]),
  malformed: "not valid json",
  noUrl: JSON.stringify([{ name: "Missing URL" }]),
  withHtml: JSON.stringify([
    { name: "<script>alert('xss')</script>", url: "https://test.com" },
  ]),
};

// ============================================================================
// STATE FIXTURES
// ============================================================================

/**
 * Initial app state
 */
export const initialState = {
  currentView: "root",
  activeFolder: null,
  currentHotkeys: {},
};

/**
 * State when in folder view
 */
export const folderViewState = {
  currentView: "folder",
  activeFolder: "news",
  currentHotkeys: {},
};

/**
 * State transitions for testing
 */
export const stateTransitions = {
  rootToFolder: {
    from: initialState,
    to: folderViewState,
    action: "openFolder",
    payload: "news",
  },
  folderToRoot: {
    from: folderViewState,
    to: initialState,
    action: "goBack",
  },
};

// ============================================================================
// INTEGRATION SCENARIOS
// ============================================================================

/**
 * Complete user flow scenarios for integration testing
 */
export const userFlows = {
  basicNavigation: {
    steps: [
      { action: "viewRoot", expected: "showFolders" },
      { action: "clickFolder", folder: "news", expected: "showBookmarks" },
      {
        action: "clickBookmark",
        bookmark: "Business Standard",
        expected: "openUrl",
      },
    ],
  },
  keyboardNavigation: {
    steps: [
      { action: "viewRoot", expected: "showFolders" },
      { action: "typeKeys", keys: "ne", expected: "openNewsFolder" },
      { action: "typeKeys", keys: "bu", expected: "openBusinessStandard" },
    ],
  },
  roundTrip: {
    steps: [
      { action: "viewRoot", expected: "showFolders" },
      {
        action: "clickFolder",
        folder: "tools",
        expected: "showToolsBookmarks",
      },
      { action: "clickBack", expected: "returnToRoot" },
      {
        action: "clickFolder",
        folder: "content",
        expected: "showContentBookmarks",
      },
    ],
  },
};

// ============================================================================
// EXPORT ALL FIXTURES
// ============================================================================

export default {
  folders: mockFolders,
  minimalFolder,
  emptyFolder,
  specialCharFolder,
  bookmarks: {
    standard: standardBookmark,
    withoutIcon: bookmarkWithoutIcon,
    withEmptyIcon: bookmarkWithEmptyIcon,
    specialChars: specialCharBookmark,
    withParams: bookmarkWithParams,
    longName: longNameBookmark,
    unicode: unicodeBookmark,
    numbered: numberedBookmark,
  },
  invalid: {
    nestedFolder: invalidNestedFolder,
    nestedBookmarks: invalidNestedBookmarks,
    deepNesting: invalidDeepNesting,
  },
  keybinding: {
    usedCombos: {
      empty: usedCombosEmpty,
      withGi: usedCombosWithGi,
      allGithub: usedCombosAllGithub,
    },
    testNames: keybindingTestNames,
  },
  rendering: expectedPatterns,
  localStorage: mockLocalStorage,
  state: {
    initial: initialState,
    folderView: folderViewState,
    transitions: stateTransitions,
  },
  userFlows,
};
