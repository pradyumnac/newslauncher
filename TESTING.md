# Unit Test Coverage Plan - Bookmark Folder System

## Overview

This document outlines comprehensive unit test coverage for the newly implemented bookmark folder system. Tests are organized by functional area with specific test cases, inputs, expected outputs, and priority levels.

---

## Test Categories

### 1. Data Structure Validation Tests

#### Test Suite: `validateNoNestedFolders()`

**Purpose:** Ensure data integrity by preventing 2nd level folder nesting

| Test ID | Description                    | Input                                                      | Expected Output       | Priority |
| ------- | ------------------------------ | ---------------------------------------------------------- | --------------------- | -------- |
| DV-001  | Valid flat structure           | `folders: [{id: "a", bookmarks: [{name: "b", url: "c"}]}]` | `true`                | High     |
| DV-002  | Nested folder detected         | `folders: [{bookmarks: [{folders: [{}]}]}]`                | Throws Error          | High     |
| DV-003  | Nested bookmarks property      | `folders: [{bookmarks: [{bookmarks: [{}]}]}]`              | Throws Error          | High     |
| DV-004  | Empty folders array            | `folders: []`                                              | `true`                | Medium   |
| DV-005  | Empty bookmarks array          | `folders: [{bookmarks: []}]`                               | `true`                | Medium   |
| DV-006  | Deep nested folder (3 levels)  | `folders: [{bookmarks: [{folders: [{bookmarks: []}]}]}]`   | Throws Error          | Medium   |
| DV-007  | Mixed valid and invalid        | One folder valid, one with nested                          | Throws Error          | High     |
| DV-008  | Null/undefined bookmarks       | `folders: [{bookmarks: null}]`                             | `true` (no iteration) | Medium   |
| DV-009  | Bookmark with only id and name | `bookmarks: [{id: "1", name: "test"}]`                     | `true`                | Low      |
| DV-010  | Multiple folders with nested   | All folders have nested bookmarks                          | Throws Error          | High     |

---

### 2. State Management Tests

#### Test Suite: `openFolder(folderId)`

**Purpose:** Verify folder opening updates state and triggers rendering

| Test ID | Description           | Input                    | Expected State                                   | Expected Calls                                     | Priority |
| ------- | --------------------- | ------------------------ | ------------------------------------------------ | -------------------------------------------------- | -------- |
| SM-001  | Open valid folder     | `"news"`                 | `currentView: "folder"`, `activeFolder: "news"`  | `renderFolderView("news")`, `assignHotkeys()`      | High     |
| SM-002  | Open different folder | `"tools"`                | `currentView: "folder"`, `activeFolder: "tools"` | `renderFolderView("tools")`, `assignHotkeys()`     | High     |
| SM-003  | Open invalid folder   | `"invalid"`              | State changes still occur                        | `renderFolderView("invalid")` (handles gracefully) | Medium   |
| SM-004  | Consecutive opens     | Open "news" then "tools" | Final: `activeFolder: "tools"`                   | Both render functions called                       | Medium   |
| SM-005  | Open from root state  | `currentView: "root"`    | Transitions to `"folder"`                        | All expected calls                                 | High     |
| SM-006  | Reopen same folder    | Open "news" twice        | State unchanged 2nd time                         | Render called twice                                | Low      |

#### Test Suite: `goBack()`

**Purpose:** Verify navigation back to root or modal closing

| Test ID | Description               | Initial State                                   | Expected State                              | Expected Calls                                    | Priority |
| ------- | ------------------------- | ----------------------------------------------- | ------------------------------------------- | ------------------------------------------------- | -------- |
| GB-001  | Back from folder          | `currentView: "folder"`, `activeFolder: "news"` | `currentView: "root"`, `activeFolder: null` | `renderRootView()`, `assignHotkeys()`             | High     |
| GB-002  | Back from root            | `currentView: "root"`                           | No change                                   | `hideHotkeyModal()`                               | High     |
| GB-003  | Multiple back calls       | Called twice from folder                        | Final: root state                           | `renderRootView()` once, then `hideHotkeyModal()` | Medium   |
| GB-004  | Back clears active folder | `activeFolder: "tools"`                         | `activeFolder: null`                        | `renderRootView()`                                | High     |

---

### 3. Rendering Function Tests

#### Test Suite: `renderBookmarkItem(bookmark)`

**Purpose:** Verify HTML generation for bookmark items

| Test ID | Description                         | Input                                                             | Expected Output                         | Priority |
| ------- | ----------------------------------- | ----------------------------------------------------------------- | --------------------------------------- | -------- |
| RI-001  | Valid bookmark with icon            | `{name: "Github", url: "https://github.com", icon: "fa-github"}`  | HTML string with fa-github icon         | High     |
| RI-002  | Bookmark without icon               | `{name: "Test", url: "https://test.com"}`                         | HTML string with fa-link (default)      | High     |
| RI-003  | Bookmark with special chars in name | `{name: "Test <script>", url: "https://test.com"}`                | HTML with name as-is (no escaping here) | Medium   |
| RI-004  | Bookmark with empty icon            | `{name: "Test", url: "https://test.com", icon: ""}`               | HTML with fa-link (falsy check)         | Medium   |
| RI-005  | Long name                           | `{name: "Very Long Bookmark Name Here", url: "https://test.com"}` | HTML with full name                     | Low      |
| RI-006  | URL with special chars              | `{name: "Test", url: "https://test.com?foo=bar&baz=qux"}`         | HTML with URL preserved                 | Medium   |
| RI-007  | Missing name                        | `{url: "https://test.com"}`                                       | HTML with "undefined" or empty          | Low      |
| RI-008  | Missing url                         | `{name: "Test"}`                                                  | HTML with href="undefined"              | Low      |
| RI-009  | Null/undefined bookmark             | `null`                                                            | Would throw (should handle)             | Medium   |
| RI-010  | Bookmark with all properties        | Complete bookmark object                                          | Correct HTML structure                  | High     |

#### Test Suite: `renderFolderCard(folder)`

**Purpose:** Verify HTML generation for folder cards

| Test ID | Description             | Input                                              | Expected Output                               | Priority |
| ------- | ----------------------- | -------------------------------------------------- | --------------------------------------------- | -------- |
| FC-001  | Valid folder with icon  | `{id: "news", name: "News", icon: "fa-newspaper"}` | HTML with data-folder-id="news", fa-newspaper | High     |
| FC-002  | Folder without icon     | `{id: "tools", name: "Tools"}`                     | HTML with fa-folder (default)                 | High     |
| FC-003  | Folder with empty icon  | `{id: "content", name: "Content", icon: ""}`       | HTML with fa-folder                           | Medium   |
| FC-004  | Long folder name        | `{id: "long", name: "Very Long Folder Name"}`      | HTML with full name                           | Low      |
| FC-005  | Special chars in name   | `{id: "special", name: "News & Updates"}`          | HTML with name preserved                      | Medium   |
| FC-006  | Missing id              | `{name: "Test"}`                                   | HTML without data-folder-id                   | Low      |
| FC-007  | Missing name            | `{id: "test"}`                                     | HTML with "undefined"                         | Low      |
| FC-008  | Single char folder name | `{id: "x", name: "X"}`                             | Valid HTML                                    | Low      |

#### Test Suite: `renderBackButton()`

**Purpose:** Verify static back button HTML

| Test ID | Description         | Expected Output                                  | Priority |
| ------- | ------------------- | ------------------------------------------------ | -------- |
| BB-001  | Basic render        | HTML string with id="back-button", fa-arrow-left | High     |
| BB-002  | Contains Back text  | HTML includes "Back" text                        | High     |
| BB-003  | Has correct classes | Has bookmark-group and back-card classes         | Medium   |
| BB-004  | Has aria-label      | Contains aria-label="Go Back"                    | Medium   |

---

### 4. Keybinding Generation Tests

#### Test Suite: `generateKeySeq(name, usedCombos)`

**Purpose:** Verify 2-character keybinding generation

| Test ID | Description               | Input Name            | Input Set                             | Expected Output                    | Priority |
| ------- | ------------------------- | --------------------- | ------------------------------------- | ---------------------------------- | -------- |
| KG-001  | Simple name               | `"Github"`            | `new Set()`                           | `"gi"`                             | High     |
| KG-002  | Name with spaces          | `"Business Standard"` | `new Set()`                           | `"bu"`                             | High     |
| KG-003  | Already used combo        | `"Github"`            | `new Set(["gi"])`                     | `"it"` (next available)            | High     |
| KG-004  | Short name (1 char)       | `"X"`                 | `new Set()`                           | `null`                             | High     |
| KG-005  | Empty name                | `""`                  | `new Set()`                           | `null`                             | High     |
| KG-006  | Name with numbers         | `"123test"`           | `new Set()`                           | `"12"`                             | Medium   |
| KG-007  | Name with special chars   | `"Test-Name"`         | `new Set()`                           | `"te"` (skips special)             | Medium   |
| KG-008  | All pairs used            | `"Github"`            | `new Set(["gi","it","th","hu","ub"])` | `null`                             | Medium   |
| KG-009  | Mixed case                | `"GiThUb"`            | `new Set()`                           | `"gi"` (lowercased)                | Medium   |
| KG-010  | Unicode chars             | `"日本語"`            | `new Set()`                           | `null` (no alphanumeric)           | Low      |
| KG-011  | Leading spaces            | `"  Github"`          | `new Set()`                           | `"gi"` (trimmed)                   | Medium   |
| KG-012  | Internal spaces           | `"G it"`              | `new Set()`                           | `"gi"` (spaces removed)            | Medium   |
| KG-013  | Numbers only              | `"12345"`             | `new Set()`                           | `"12"`                             | Medium   |
| KG-014  | Name starting with number | `"1Password"`         | `new Set()`                           | `"1p"`                             | Medium   |
| KG-015  | Single valid pair         | `"ab"`                | `new Set()`                           | `"ab"`                             | High     |
| KG-016  | Add to used set           | `"Github"`            | `new Set()`                           | `"gi"` AND usedCombos now has "gi" | High     |

---

### 5. Keybinding Assignment Tests

#### Test Suite: `assignHotkeys()` - Root View

**Purpose:** Verify keybinding assignment at root level

| Test ID | Description                  | Setup                       | Expected hotkeyMap2         | Expected hotkeyDetails | Priority |
| ------- | ---------------------------- | --------------------------- | --------------------------- | ---------------------- | -------- |
| AR-001  | Assign to single folder      | 1 folder                    | `{folderKey: folderAction}` | Array with 1 item      | High     |
| AR-002  | Assign to multiple folders   | 3 folders                   | 3 folder entries            | Array with 3 items     | High     |
| AR-003  | Assign with sticky bookmarks | 2 folders + 2 sticky        | 4 entries total             | Array with 4 items     | Medium   |
| AR-004  | No collision between folders | Folders: "News", "New York" | Different keys assigned     | No duplicates          | High     |
| AR-005  | Folder with no valid key     | Folder name: "X"            | No entry for that folder    | Array without it       | Medium   |
| AR-006  | Empty folders array          | `folders: []`               | Empty object                | Empty array            | Medium   |
| AR-007  | Empty sticky bookmarks       | `stickyBookmarks: []`       | Only folder entries         | Only folders in array  | Low      |
| AR-008  | Updates modal list           | Modal exists in DOM         | List populated              | Correct HTML           | Medium   |
| AR-009  | Clears previous state        | Pre-existing hotkeyMap2     | Old entries cleared         | Old details cleared    | High     |
| AR-010  | DOM elements not found       | Folder in data but not DOM  | Skips that folder           | Array without it       | Medium   |

#### Test Suite: `assignHotkeys()` - Folder View

**Purpose:** Verify keybinding assignment inside folder

| Test ID | Description                    | Setup                      | Expected hotkeyMap2        | Priority |
| ------- | ------------------------------ | -------------------------- | -------------------------- | -------- |
| AF-001  | Assign to back button          | In folder view             | `{backKey: backAction}`    | High     |
| AF-002  | Assign to bookmarks            | Folder with 5 bookmarks    | Back + 5 bookmark entries  | High     |
| AF-003  | Empty folder                   | Folder with 0 bookmarks    | Only back button entry     | Medium   |
| AF-004  | Bookmark with no valid key     | Bookmark name: "A"         | No entry for that bookmark | Medium   |
| AF-005  | No collision between bookmarks | Bookmarks: "Git", "Github" | Different keys             | High     |
| AF-006  | Invalid active folder          | `activeFolder: "invalid"`  | Only back button           | Medium   |

---

### 6. Action Execution Tests

#### Test Suite: `openLinkByKeySeq(seq)`

**Purpose:** Verify key sequence triggers correct action

| Test ID | Description      | hotkeyMap2 State                       | Input Seq    | Expected Action                   | Priority |
| ------- | ---------------- | -------------------------------------- | ------------ | --------------------------------- | -------- |
| LA-001  | Open folder      | `{"ne": {type: "folder", id: "news"}}` | `"ne"`       | `openFolder("news")` called       | High     |
| LA-002  | Open link        | `{"gi": {type: "link", href: "url"}}`  | `"gi"`       | `window.open("url", "_blank")`    | High     |
| LA-003  | Go back          | `{"ba": {type: "back"}}`               | `"ba"`       | `goBack()` called                 | High     |
| LA-004  | Invalid sequence | `{"ne": folderAction}`                 | `"xx"`       | No action, no error               | High     |
| LA-005  | Case insensitive | `{"ne": folderAction}`                 | `"NE"`       | `openFolder("news")` (lowercased) | Medium   |
| LA-006  | Resets buffer    | Any valid action                       | `"gi"`       | `inputBuffer` becomes `""`        | High     |
| LA-007  | Empty map        | `{}`                                   | `"ne"`       | No action                         | Medium   |
| LA-008  | Multiple calls   | Valid action                           | Called twice | Action executed twice             | Low      |

---

### 7. Helper Function Tests

#### Test Suite: `escapeHtml(unsafe)`

**Purpose:** Verify HTML escaping for security

| Test ID | Description          | Input                             | Expected Output                    | Priority |
| ------- | -------------------- | --------------------------------- | ---------------------------------- | -------- |
| EH-001  | Ampersand            | `"Tom & Jerry"`                   | `"Tom &amp; Jerry"`                | High     |
| EH-002  | Less than            | `"5 < 10"`                        | `"5 &lt; 10"`                      | High     |
| EH-003  | Double quote         | `"He said \"Hi\""`                | `"He said &quot;Hi&quot;"`         | High     |
| EH-004  | Single quote         | `"It's fine"`                     | `"It&#039;s fine"`                 | High     |
| EH-005  | All special chars    | `'<script>alert("XSS")</script>'` | Escaped version                    | High     |
| EH-006  | No special chars     | `"Hello World"`                   | `"Hello World"`                    | Medium   |
| EH-007  | Empty string         | `""`                              | `""`                               | Medium   |
| EH-008  | Only special chars   | `&<"'`                            | `&amp;&lt;&quot;&#039;`            | Medium   |
| EH-009  | Multiple occurrences | `"A & B & C"`                     | `"A &amp; B &amp; C"`              | Medium   |
| EH-010  | Already escaped      | `"Test &amp;"`                    | `"Test &amp;amp;"` (double escape) | Low      |

---

### 8. Bookmark Management Tests

#### Test Suite: `addBookmark()`

**Purpose:** Verify custom bookmark creation

| Test ID | Description            | Input Values                              | localStorage After         | Expected Result | Priority |
| ------- | ---------------------- | ----------------------------------------- | -------------------------- | --------------- | -------- |
| AB-001  | Add valid bookmark     | Name: "Reddit", URL: "https://reddit.com" | Array with 1 item          | Success         | High     |
| AB-002  | Add multiple bookmarks | 3 different bookmarks                     | Array with 3 items         | All saved       | High     |
| AB-003  | Empty name             | Name: "", URL: "https://test.com"         | Unchanged                  | Early return    | High     |
| AB-004  | Empty URL              | Name: "Test", URL: ""                     | Unchanged                  | Early return    | High     |
| AB-005  | Both empty             | Name: "", URL: ""                         | Unchanged                  | Early return    | High     |
| AB-006  | Whitespace only        | Name: " ", URL: " "                       | Unchanged                  | Early return    | Medium   |
| AB-007  | HTML in name           | Name: "<script>", URL: "test"             | Escaped name               | XSS prevented   | High     |
| AB-008  | HTML in URL            | Name: "Test", URL: "<script>"             | Escaped URL                | XSS prevented   | High     |
| AB-009  | Trims whitespace       | Name: " Test ", URL: " url "              | Trimmed values stored      | Medium          |
| AB-010  | Duplicate bookmark     | Same name and URL                         | Two entries (allows dupes) | Medium          |
| AB-011  | Very long name         | 500 character name                        | Stored as-is               | Low             |
| AB-012  | Special URL chars      | URL with query params                     | Preserved correctly        | Medium          |

#### Test Suite: `loadUserBookmarks()`

**Purpose:** Verify custom bookmark loading

| Test ID | Description             | localStorage Value             | DOM Result                | Priority |
| ------- | ----------------------- | ------------------------------ | ------------------------- | -------- |
| LB-001  | Load single bookmark    | `[{name: "Test", url: "url"}]` | 1 link element            | High     |
| LB-002  | Load multiple bookmarks | 5 bookmarks                    | 5 link elements           | High     |
| LB-003  | Empty bookmarks         | `[]`                           | Empty container           | Medium   |
| LB-004  | No localStorage key     | `null`                         | Empty container           | Medium   |
| LB-005  | Invalid JSON            | `"not json"`                   | Should handle (try-catch) | High     |
| LB-006  | Malformed bookmark      | `[{name: "Test"}]` (no url)    | Link with undefined href  | Medium   |
| LB-007  | Clears existing         | Pre-existing DOM elements      | Old cleared, new loaded   | Medium   |
| LB-008  | Missing container       | `#user-links` not in DOM       | Returns early             | Medium   |

---

### 9. Integration Test Scenarios

#### Test Suite: End-to-End Bookmark Flows

| Test ID | Scenario               | Steps                                                           | Expected Outcome             | Priority |
| ------- | ---------------------- | --------------------------------------------------------------- | ---------------------------- | -------- |
| INT-001 | Full folder navigation | 1. Root view → 2. Open folder → 3. Click bookmark               | Bookmark opens               | High     |
| INT-002 | Keyboard navigation    | Type folder key → Type bookmark key                             | Bookmark opens               | High     |
| INT-003 | Round trip             | Open folder → Go back → Open different folder                   | Second folder opens          | High     |
| INT-004 | Keybinding persistence | Root → Folder (check bindings) → Back (check bindings)          | Different bindings each view | High     |
| INT-005 | Add and access custom  | Add bookmark → Navigate to folder → Should not appear           | Custom in separate section   | Medium   |
| INT-006 | Modal with context     | Root: press ? → Check list → Open folder → Press ? → Check list | Different lists per context  | Medium   |
| INT-007 | Rapid navigation       | Open/Close folder 10 times quickly                              | No errors, state correct     | Medium   |
| INT-008 | Mixed interactions     | Click folder → ESC back → Type folder key → Click back          | All navigation works         | Medium   |

---

### 10. Edge Cases and Error Handling

#### Test Suite: Robustness Tests

| Test ID | Description               | Condition                                | Expected Behavior             | Priority |
| ------- | ------------------------- | ---------------------------------------- | ----------------------------- | -------- |
| ERR-001 | DOM not ready             | Functions called before DOMContentLoaded | Graceful failure              | Medium   |
| ERR-002 | Missing container element | `.bookmark-section` not found            | Error or graceful handling    | Medium   |
| ERR-003 | localStorage disabled     | Browser blocks localStorage              | No errors, features disabled  | Low      |
| ERR-004 | Corrupted localStorage    | Invalid JSON structure                   | Reset or error handling       | Medium   |
| ERR-005 | Very large bookmark data  | 1000+ bookmarks                          | Performance acceptable        | Low      |
| ERR-006 | Unicode folder names      | Emoji or non-Latin characters            | Handles gracefully            | Low      |
| ERR-007 | Concurrent modifications  | localStorage changed externally          | Uses latest on next load      | Low      |
| ERR-008 | Rapid key presses         | 50 keys in 1 second                      | Buffer handles correctly      | Medium   |
| ERR-009 | Window.open blocked       | Popup blocker enabled                    | Silent failure or warning     | Low      |
| ERR-010 | Event listener conflicts  | Multiple keydown handlers                | No conflicts, works correctly | Medium   |

---

## Test Implementation Priority

### Phase 1: Critical Path (Must Have)

- DV-001 through DV-003 (Validation)
- SM-001, SM-002, GB-001 (State management)
- RI-001, RI-002, FC-001, FC-002 (Rendering)
- KG-001 through KG-006 (Key generation)
- AR-001, AR-002, AF-001, AF-002 (Key assignment)
- LA-001 through LA-003 (Action execution)
- EH-001 through EH-008 (Escaping)
- AB-001 through AB-004, AB-007 (Adding bookmarks)
- INT-001, INT-002 (Integration)

**Estimated: 40 tests**

### Phase 2: Important (Should Have)

- Remaining validation tests (DV-004 through DV-010)
- All state management edge cases (SM-003 through SM-006, GB-002 through GB-004)
- Rendering edge cases (RI-003 through RI-010, FC-003 through FC-008)
- Key generation edge cases (KG-007 through KG-016)
- Key assignment edge cases (AR-003 through AR-010, AF-003 through AF-006)
- Action execution edge cases (LA-004 through LA-008)
- Escaping edge cases (EH-009, EH-010)
- Loading edge cases (LB-001 through LB-008)
- Integration scenarios (INT-003 through INT-008)

**Estimated: 60 tests**

### Phase 3: Nice to Have

- Error handling tests (ERR-001 through ERR-010)
- Performance tests (large datasets, rapid actions)
- Accessibility tests
- Browser compatibility tests

**Estimated: 20+ tests**

---

## Test File Structure Recommendation

```
tests/
├── unit/
│   ├── bookmark-data.test.js        # DV tests
│   ├── state-management.test.js     # SM, GB tests
│   ├── rendering.test.js            # RI, FC, BB tests
│   ├── keybinding-generation.test.js # KG tests
│   ├── keybinding-assignment.test.js # AR, AF tests
│   ├── action-execution.test.js     # LA tests
│   ├── helpers.test.js              # EH tests
│   ├── bookmark-management.test.js  # AB, LB tests
│   └── edge-cases.test.js           # ERR tests
├── integration/
│   └── bookmark-flows.test.js       # INT tests
└── e2e/
    └── (existing e2e.spec.js)
```

---

## Testing Framework Recommendations

### Option 1: Vitest (Recommended)

- Fast, modern, ESM-first
- Built-in mocking and coverage
- Similar API to Jest
- Works well with Playwright for E2E

### Option 2: Jest with jsdom

- Industry standard
- Good ecosystem support
- jsdom for DOM manipulation testing

### Option 3: Node.js Test Runner (Built-in)

- No dependencies
- Native support
- Less feature-rich

### DOM Testing Strategy

Since functions manipulate DOM directly, use:

- `jsdom` environment for DOM-less testing
- Or `happy-dom` for faster DOM simulation
- Or create a minimal test HTML fixture

### Mocking Requirements

- `localStorage`: Mock with in-memory store
- `window.open`: Mock function
- `document.*`: Use jsdom or minimal fixtures
- `console`: Mock for error tests

---

## Coverage Goals

| Category                   | Target Coverage |
| -------------------------- | --------------- |
| Data Validation            | 100%            |
| State Management           | 100%            |
| Rendering (pure functions) | 100%            |
| Keybinding Generation      | 100%            |
| Keybinding Assignment      | 90%+            |
| Action Execution           | 90%+            |
| Helpers                    | 100%            |
| Bookmark Management        | 90%+            |
| Edge Cases                 | 80%+            |
| **Overall**                | **90%+**        |

---

## Notes for Implementation

1. **Test Isolation**: Each test should be independent; reset state between tests
2. **DOM Cleanup**: Clean up DOM elements after each test
3. **Mock Reset**: Reset all mocks between tests
4. **Async Handling**: Some functions are synchronous but trigger async DOM updates
5. **Browser API Mocks**: Mock `window`, `document`, `localStorage` appropriately
6. **Test Data**: Create reusable test fixtures for bookmarks and folders
7. **Snapshot Testing**: Consider for HTML output validation

## Current Test Status

✅ **Already Implemented (from analysis):**

- Basic data validation (DV-001, DV-002, DV-003)
- Basic E2E navigation tests

❌ **Not Yet Implemented:**

- All unit tests for functions
- State management tests
- Rendering tests
- Keybinding tests
- Edge case tests
- Integration scenarios

**Next Step**: Set up testing framework and implement Phase 1 critical tests.

---

## Summary Statistics

| Category              | Tests         | Priority |
| --------------------- | ------------- | -------- |
| Data Validation       | 10            | High     |
| State Management      | 10            | High     |
| Rendering             | 24            | High     |
| Keybinding Generation | 16            | High     |
| Keybinding Assignment | 16            | High     |
| Action Execution      | 8             | High     |
| Helpers               | 10            | Medium   |
| Bookmark Management   | 20            | Medium   |
| Integration           | 8             | Medium   |
| Edge Cases            | 10            | Low      |
| **TOTAL**             | **132 tests** |          |

---

**Last Updated:** February 5, 2026
**Status:** Planning Complete - Ready for Implementation
