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

### Completed Implementation

#### Testing Infrastructure ✅

**Status:** Complete - Vitest + Playwright parallel setup working

##### Setup & Configuration

- [x] **Setup:** Install Vitest, @vitest/coverage-v8, happy-dom
- [x] **Config:** Create vitest.config.js with happy-dom environment
- [x] **Config:** Update playwright.config.js with new paths
- [x] **Scripts:** Add npm scripts for all test commands
- [x] **Structure:** Create tests/unit/, tests/e2e/, tests/fixtures/ directories

##### Source Code Extraction

- [x] **Module:** Create src/bookmark-data.js (bookmarkData + validation)
- [x] **Module:** Create src/bookmark-utils.js (escapeHtml, generateKeySeq)
- [x] **Module:** Create src/bookmark-rendering.js (render functions)

##### Test Fixtures

- [x] **Fixtures:** Create tests/fixtures/bookmarks.js with comprehensive test data
  - [x] Mock folders (news, tools, content)
  - [x] Mock bookmarks (standard, edge cases)
  - [x] Invalid data fixtures for error testing
  - [x] Keybinding test names and combinations
  - [x] State fixtures and user flow scenarios

##### Mise Tasks

- [x] **Tasks:** Update mise.toml with new testing tasks
  - [x] test-unit: Run unit tests (Vitest)
  - [x] test-unit-watch: Run unit tests in watch mode
  - [x] test-unit-coverage: Run unit tests with coverage
  - [x] test-e2e: Run E2E tests (Playwright)
  - [x] test-e2e-ui: Run E2E tests with UI
  - [x] test-e2e-debug: Run E2E tests in debug mode

#### Testing - Phase 1: Critical Path ✅ (55 tests implemented)

**Status:** Complete - All Phase 1 tests passing

##### Data Structure Validation (10 tests)

- [x] **Test:** DV-001 - Valid flat structure returns true
- [x] **Test:** DV-002 - Nested folder detected throws Error
- [x] **Test:** DV-003 - Nested bookmarks property throws Error
- [x] **Test:** DV-004 - Empty folders array returns true
- [x] **Test:** DV-005 - Empty bookmarks array returns true
- [x] **Test:** DV-006 - Deep nested folder (3 levels) throws Error
- [x] **Test:** DV-007 - Mixed valid and invalid throws Error
- [x] **Test:** DV-008 - Null bookmarks returns true
- [x] **Test:** DV-009 - Bookmark with only id and name returns true
- [x] **Test:** DV-010 - Multiple folders with nested throws Error

##### Rendering Functions (10 tests)

- [x] **Test:** RI-001 - Valid bookmark with icon renders correctly
- [x] **Test:** RI-002 - Bookmark without icon uses default
- [x] **Test:** RI-004 - Bookmark with empty icon uses default
- [x] **Test:** RI-010 - Bookmark with all properties renders correctly
- [x] **Test:** FC-001 - Valid folder with icon renders correctly
- [x] **Test:** FC-002 - Folder without icon uses default
- [x] **Test:** FC-003 - Folder with empty icon uses default
- [x] **Test:** FC-006 - Folder missing id handles gracefully
- [x] **Test:** FC-007 - Folder missing name handles gracefully
- [x] **Test:** BB-001 to BB-005 - Back button renders correctly

##### Keybinding Generation (14 tests)

- [x] **Test:** KG-001 - Simple name "Github" generates "gi"
- [x] **Test:** KG-002 - Name with spaces generates correct key
- [x] **Test:** KG-003 - Already used combo generates next available
- [x] **Test:** KG-004 - Short name (1 char) returns null
- [x] **Test:** KG-005 - Empty name returns null
- [x] **Test:** KG-006 - Name with numbers generates correctly
- [x] **Test:** KG-007 - Name with special chars skips them
- [x] **Test:** KG-008 - All pairs used returns null
- [x] **Test:** KG-009 - Mixed case lowercased
- [x] **Test:** KG-011 - Leading spaces trimmed
- [x] **Test:** KG-012 - Internal spaces removed
- [x] **Test:** KG-013 - Numbers only generates "12"
- [x] **Test:** KG-014 - Name starting with number generates "1p"
- [x] **Test:** KG-015 - Single valid pair returns correctly
- [x] **Test:** KG-016 - Adds to usedCombos set

##### Helper Functions (10 tests)

- [x] **Test:** EH-001 - Escape ampersand correctly
- [x] **Test:** EH-002 - Escape less than correctly
- [x] **Test:** EH-003 - Escape double quote correctly
- [x] **Test:** EH-004 - Escape single quote correctly
- [x] **Test:** EH-005 - Escape all special chars
- [x] **Test:** EH-006 - No special chars unchanged
- [x] **Test:** EH-007 - Empty string returns empty
- [x] **Test:** EH-008 - Only special chars all escaped
- [x] **Test:** EH-009 - Multiple occurrences escaped

##### Data Structure Tests (7 additional tests)

- [x] **Test:** Bookmark data has 3 folders
- [x] **Test:** Each folder has correct properties
- [x] **Test:** Sticky bookmarks array exists
- [x] **Test:** Each bookmark has required properties
- [x] **Test:** No bookmark has nested properties

#### Test Results

| Test Type  | Tool       | Count  | Status             | Speed     |
| ---------- | ---------- | ------ | ------------------ | --------- |
| Unit Tests | Vitest     | 55     | ✅ Passing         | ~290ms    |
| E2E Tests  | Playwright | 14     | ✅ Passing         | ~3.9s     |
| **Total**  |            | **69** | **✅ All Passing** | **~4.2s** |

### Pending Implementation

#### Testing - Phase 2: Important Tests (45 remaining)

**Status:** Planned in TESTING.md, implement as needed

##### State Management (6 tests)

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
- [x] **Docs**: Update README with new folder features
- [x] **Docs**: Create comprehensive CONTEXT.md with architecture and conventions
- [x] **Docs**: Add documentation index to README and CONTEXT.md

---

## Current Sprint Focus

### This Week ✅ COMPLETE

1. **Testing Infrastructure** - ✅ Setup Vitest with happy-dom
2. **Phase 1 Tests** - ✅ Implemented 55 unit tests (exceeded 40 target!)
3. **Run All Tests** - ✅ All 69 tests passing
4. **Test Fixtures** - ✅ Created comprehensive fixture library
5. **Source Extraction** - ✅ Moved functions to src/ modules

### Next Week

1. **Phase 2 Tests** - Implement state management and keybinding assignment tests
2. **Coverage Report** - Generate and review coverage report
3. **Integration Tests** - Add integration test scenarios
4. **Documentation** - Add JSDoc comments to all functions

### Backlog

- Sticky bookmarks feature
- Homelab bookmarks (waiting for input)
- Configuration unification
- PWA path fixes
- Performance optimizations

---

## Test Execution Status

| Category                   | Total   | Implemented | Passing | Coverage    |
| -------------------------- | ------- | ----------- | ------- | ----------- |
| **Unit Tests (Vitest)**    | 132     | 55          | 55      | ~42%        |
| Phase 1                    | 40      | 40          | 40      | -           |
| Phase 2                    | 60      | 15          | 15      | -           |
| Phase 3                    | 10      | 0           | 0       | -           |
| Data Validation            | 10      | 10          | 10      | -           |
| **E2E Tests (Playwright)** | 15      | 14          | 14      | -           |
| **Total**                  | **147** | **69**      | **69**  | **✅ 100%** |

**Next Action:** Continue Phase 2 tests (state management, keybinding assignment)

---

## Quick Commands

### Using npm

```bash
# Run all tests
npm test

# Run only unit tests (Vitest - fast!)
npm run test:unit              # 290ms
npm run test:unit:watch        # Watch mode
npm run test:unit:coverage     # With coverage report

# Run only E2E tests (Playwright)
npm run test:e2e               # 3.9s
npm run test:e2e:ui            # With UI
npm run test:e2e:debug         # Debug mode

# Run specific test file
npm run test:unit -- helpers.test.js
npx playwright test tests/e2e/e2e.spec.js --grep "folder"
```

### Using mise (recommended)

```bash
# Run all tests
mise run test

# Run only unit tests (Vitest - fast!)
mise run test-unit              # 290ms
mise run test-unit-watch        # Watch mode
mise run test-unit-coverage     # With coverage report

# Run only E2E tests (Playwright)
mise run test-e2e               # 3.9s
mise run test-e2e-ui            # With UI
mise run test-e2e-debug         # Debug mode

# Other useful tasks
mise run check                  # Run all static analysis
mise run ci                     # Full CI pipeline
mise run lighthouse             # Performance audit
```

### Available Mise Tasks

```bash
# List all tasks
mise tasks

# Development
mise run start                  # Start development server
mise run install                # Install dependencies

# Testing
mise run test                   # All tests
mise run test-unit              # Unit tests only
mise run test-e2e               # E2E tests only

# Code Quality
mise run lint                   # Lint JavaScript
mise run format                 # Format all files
mise run check                  # All static checks
mise run check-format           # Check formatting
mise run check-spelling         # Check spelling
mise run validate-html          # Validate HTML

# CI/CD
mise run ci                     # Full CI pipeline
mise run lighthouse             # Lighthouse audit
mise run deploy                 # Deploy to GitHub Pages
```

---

**Last Updated:** February 5, 2026  
**Status:** 69 tests passing (55 unit + 14 E2E), Vitest + Playwright setup complete
