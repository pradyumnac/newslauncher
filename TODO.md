# Project Tasks

## High Priority

### Infrastructure & Tooling

- [x] **Documentation**: Create `CONTEXT.MD` and `TODO.md`.
- [x] **Testing**: Add unit tests for `quotes.js` (logic validation) and E2E tests.
- [x] **Linting**: Add Prettier/ESLint/CSpell/HTML-Validate configuration.
- [x] **CI**: Consolidate tasks in `mise` and replace GitHub Actions with local checks.
- [x] **Git**: Migrate from Husky to plain Git hooks (`.git/hooks/pre-commit`).
- [x] **Architecture**: Adopt Single File Strategy (Keep CSS/JS inline for performance).
- [x] **Performance**: Integrate Lighthouse CI into CI pipeline.
- [ ] **Performance**: Replace Font Awesome with inline SVGs to eliminate the render-blocking CDN request.

---

## Features & Enhancements

### Completed

#### Bookmark Folder System

- [x] **Bookmarks**: Refactor bookmarks into a structured folder system (move existing flat structure to folders).
  - [x] Implemented 3 folders: News, Tools, Content
  - [x] Added state management (root/folder views)
  - [x] Dynamic keybinding system (folders at root, bookmarks in folder)
  - [x] Navigation: back button, ESC key, Left arrow key
  - [x] Data validation for nested folders (2nd level nesting blocked)
  - [x] Styling for folder cards and back button
  - [x] Click and keyboard event handlers

#### Documentation

- [x] **Documentation**: Create `UseCases.md` with all bookmark system use cases (17 use cases).
- [x] **Documentation**: Create `UserFlows.md` with navigation flows and state diagrams (14 flows).
- [x] **Documentation**: Create comprehensive unit test plan in `TESTING.md` (132 test cases).

#### Testing - E2E & Basic Unit

- [x] **Testing**: Add unit tests for bookmark data validation (no nested folders).
  - [x] Test valid flat structure passes
  - [x] Test nested folder throws error
  - [x] Test nested bookmarks property throws error
- [x] **Testing**: Add E2E tests for folder navigation (7 test cases).
  - [x] Display folders at root level
  - [x] Open folder on click
  - [x] Navigate back using back button
  - [x] Navigate back using Escape key
  - [x] Navigate back using Left Arrow key
  - [x] Open folder via keyboard shortcut
  - [x] Assign different keybindings inside folder

---

### Pending Implementation

#### Testing - Phase 1: Critical Path (40 tests)

**Status:** Planned in TESTING.md, needs implementation

##### Data Structure Validation

- [ ] **Test:** DV-001 - Valid flat structure returns true
- [ ] **Test:** DV-002 - Nested folder detected throws Error
- [ ] **Test:** DV-003 - Nested bookmarks property throws Error

##### State Management

- [ ] **Test:** SM-001 - Open valid folder updates state correctly
- [ ] **Test:** SM-002 - Open different folder updates activeFolder
- [ ] **Test:** GB-001 - Back from folder returns to root

##### Rendering Functions

- [ ] **Test:** RI-001 - Valid bookmark with icon renders correctly
- [ ] **Test:** RI-002 - Bookmark without icon uses default
- [ ] **Test:** FC-001 - Valid folder with icon renders correctly
- [ ] **Test:** FC-002 - Folder without icon uses default
- [ ] **Test:** BB-001 - Back button renders correctly

##### Keybinding Generation

- [ ] **Test:** KG-001 - Simple name "Github" generates "gi"
- [ ] **Test:** KG-002 - Name with spaces generates correct key
- [ ] **Test:** KG-003 - Already used combo generates next available
- [ ] **Test:** KG-004 - Short name (1 char) returns null
- [ ] **Test:** KG-005 - Empty name returns null
- [ ] **Test:** KG-006 - Name with numbers generates correctly

##### Keybinding Assignment

- [ ] **Test:** AR-001 - Assign to single folder at root
- [ ] **Test:** AR-002 - Assign to multiple folders at root
- [ ] **Test:** AF-001 - Assign to back button in folder
- [ ] **Test:** AF-002 - Assign to bookmarks in folder

##### Action Execution

- [ ] **Test:** LA-001 - Open folder via key sequence
- [ ] **Test:** LA-002 - Open link via key sequence
- [ ] **Test:** LA-003 - Go back via key sequence

##### Helper Functions

- [ ] **Test:** EH-001 - Escape ampersand correctly
- [ ] **Test:** EH-002 - Escape less than correctly
- [ ] **Test:** EH-003 - Escape double quote correctly
- [ ] **Test:** EH-004 - Escape single quote correctly
- [ ] **Test:** EH-005 - Escape all special chars
- [ ] **Test:** EH-006 - No special chars unchanged
- [ ] **Test:** EH-007 - Empty string returns empty
- [ ] **Test:** EH-008 - Only special chars all escaped

##### Bookmark Management

- [ ] **Test:** AB-001 - Add valid bookmark saves correctly
- [ ] **Test:** AB-002 - Add multiple bookmarks all saved
- [ ] **Test:** AB-003 - Empty name not added
- [ ] **Test:** AB-004 - Empty URL not added
- [ ] **Test:** AB-007 - HTML in name gets escaped
- [ ] **Test:** AB-008 - HTML in URL gets escaped

##### Integration

- [ ] **Test:** INT-001 - Full folder navigation flow
- [ ] **Test:** INT-002 - Keyboard navigation flow

---

#### Testing - Phase 2: Important Tests (60 tests)

**Status:** Planned in TESTING.md, implement after Phase 1

##### Data Structure Validation (remaining)

- [ ] **Test:** DV-004 through DV-010 - Edge cases and error conditions

##### State Management (remaining)

- [ ] **Test:** SM-003 through SM-006 - Invalid folders, consecutive opens
- [ ] **Test:** GB-002 through GB-004 - Back from root, multiple calls

##### Rendering Functions (remaining)

- [ ] **Test:** RI-003 through RI-010 - Special chars, missing properties
- [ ] **Test:** FC-003 through FC-008 - Edge cases

##### Keybinding Generation (remaining)

- [ ] **Test:** KG-007 through KG-016 - Special chars, Unicode, collisions

##### Keybinding Assignment (remaining)

- [ ] **Test:** AR-003 through AR-010 - Sticky bookmarks, collisions
- [ ] **Test:** AF-003 through AF-006 - Empty folders, invalid folders

##### Action Execution (remaining)

- [ ] **Test:** LA-004 through LA-008 - Invalid sequences, case insensitivity

##### Bookmark Management (remaining)

- [ ] **Test:** AB-005, AB-006, AB-009 through AB-012 - Edge cases
- [ ] **Test:** LB-001 through LB-008 - Load user bookmarks scenarios

##### Integration (remaining)

- [ ] **Test:** INT-003 through INT-008 - Round trips, modals, stress tests

---

#### Testing - Phase 3: Edge Cases (10+ tests)

**Status:** Planned in TESTING.md, implement last

##### Error Handling & Robustness

- [ ] **Test:** ERR-001 - DOM not ready handling
- [ ] **Test:** ERR-002 - Missing container element
- [ ] **Test:** ERR-003 - localStorage disabled
- [ ] **Test:** ERR-004 - Corrupted localStorage
- [ ] **Test:** ERR-005 - Very large bookmark data
- [ ] **Test:** ERR-006 - Unicode folder names
- [ ] **Test:** ERR-007 - Concurrent modifications
- [ ] **Test:** ERR-008 - Rapid key presses
- [ ] **Test:** ERR-009 - Window.open blocked
- [ ] **Test:** ERR-010 - Event listener conflicts

---

#### Testing Infrastructure

- [ ] **Setup:** Install and configure Vitest testing framework
- [ ] **Setup:** Configure jsdom or happy-dom for DOM testing
- [ ] **Setup:** Create test utilities and fixtures
- [ ] **Setup:** Add test coverage reporting (target: 90%+)
- [ ] **Setup:** Add npm script: `npm run test:unit`
- [ ] **Setup:** Update CI to run unit tests

---

### Features

#### Bookmarks

- [ ] **Bookmarks**: Add Homelab bookmarks (Waiting for user input).
  - [ ] Create new folder or add to existing
  - [ ] Collect URLs and icons for homelab services
  - [ ] Add to bookmarkData.folders array
  - [ ] Update tests if needed
- [ ] **Bookmarks**: Implement sticky bookmarks feature at root level.
  - [ ] Add bookmark to `stickyBookmarks` array
  - [ ] Render at root level alongside folders
  - [ ] Assign keybindings to sticky bookmarks
  - [ ] Allow configuration via code or localStorage
  - [ ] Add UI to manage sticky bookmarks

#### Configuration

- [ ] **Configuration**: Unify static (HTML) and dynamic (localStorage) bookmarks into a single data source/manager.
  - [ ] Design unified data structure
  - [ ] Migrate static bookmarks to use bookmarkData
  - [ ] Update localStorage integration
  - [ ] Add import/export functionality
  - [ ] Handle conflicts between sources

#### PWA

- [ ] **PWA**: Fix hardcoded paths in `service-worker.js` (`/newslauncher`) to support root deployments.
  - [ ] Detect base path dynamically
  - [ ] Update service worker registration
  - [ ] Test on different deployment paths

#### Automation

- [ ] **Automation**: Create a script to auto-update `quotes-version.json` when data changes.
  - [ ] Watch quotes data file
  - [ ] Generate hash/version on change
  - [ ] Update quotes-version.json
  - [ ] Can be git hook or build step

---

## Maintenance

- [x] **Assets**: Audit `manifest.json` for duplicate icon entries.

---

## Technical Debt / Improvements

### Code Quality

- [ ] **Code Quality**: Refactor bookmark rendering to use virtual DOM or template system.
  - [ ] Evaluate virtual DOM libraries (lit-html, snabbdom)
  - [ ] Or implement simple template system
  - [ ] Maintain current performance
  - [ ] Add tests for new system

### Accessibility

- [ ] **Accessibility**: Add ARIA labels and keyboard navigation improvements for folders.
  - [ ] Add aria-expanded for folders
  - [ ] Improve focus management
  - [ ] Add skip links
  - [ ] Test with screen reader

### Performance

- [ ] **Performance**: Lazy load bookmark data for large collections.
  - [ ] Implement virtual scrolling if needed
  - [ ] Load folders on demand
  - [ ] Cache rendered HTML
- [ ] **Performance**: Optimize keybinding assignment (debounce if needed)
- [ ] **Performance**: Minimize DOM manipulations during view switches

### Testing

- [ ] **Testing**: Add visual regression tests for folder open/close animations.
  - [ ] Capture screenshots
  - [ ] Compare with baseline
  - [ ] Run in CI
- [ ] **Testing**: Add performance benchmarks
- [ ] **Testing**: Add cross-browser testing

---

## Documentation

### Completed

- [x] README.md - Basic setup and usage
- [x] TODO.md - This file
- [x] UseCases.md - 17 bookmark system use cases
- [x] UserFlows.md - 14 user flow diagrams
- [x] TESTING.md - 132 unit test cases

### Pending

- [ ] **Docs**: Add JSDoc comments to all bookmark functions
- [ ] **Docs**: Create API documentation
- [ ] **Docs**: Add troubleshooting guide
- [ ] **Docs**: Document bookmark data structure
- [ ] **Docs**: Add contribution guidelines for adding bookmarks
- [ ] **Docs**: Update README with new folder features

---

## Current Sprint Focus

### This Week

1. **Testing Infrastructure** - Setup Vitest and jsdom
2. **Phase 1 Tests** - Implement 40 critical tests
3. **Run All Tests** - Ensure everything passes

### Next Week

1. **Phase 2 Tests** - Implement 60 important tests
2. **Coverage Report** - Achieve 90%+ coverage
3. **Documentation** - Add JSDoc comments

### Backlog

- Sticky bookmarks feature
- Homelab bookmarks (waiting for input)
- Configuration unification
- PWA path fixes
- Performance optimizations

---

## Test Execution Status

| Category        | Total   | Implemented | Passing | Coverage |
| --------------- | ------- | ----------- | ------- | -------- |
| E2E Tests       | 15      | 15          | 15      | -        |
| Data Validation | 3       | 3           | 3       | -        |
| **Unit Tests**  | **132** | **0**       | **0**   | **0%**   |
| **Phase 1**     | **40**  | **0**       | **0**   | **0%**   |
| **Phase 2**     | **60**  | **0**       | **0**   | **0%**   |
| **Phase 3**     | **10**  | **0**       | **0**   | **0%**   |

**Next Action:** Set up Vitest and start Phase 1 test implementation

---

## Quick Commands

```bash
# Run all tests
npm test

# Run only E2E tests
npx playwright test tests/e2e.spec.js

# Run only unit tests (once implemented)
npm run test:unit

# Run with coverage
npm run test:unit -- --coverage

# Run specific test file
npx playwright test tests/e2e.spec.js --grep "folder"
```

---

**Last Updated:** February 5, 2026  
**Status:** 18 tests passing, 132 unit tests planned, ready for implementation
