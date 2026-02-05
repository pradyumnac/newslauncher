# Testing Strategy - Bookmark Folder System

## Dual Testing Approach: Vitest + Playwright

This document outlines our testing strategy using **both Vitest and Playwright in parallel** for comprehensive test coverage.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     TESTING STRATEGY                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌──────────────────┐        ┌──────────────────┐            │
│   │   VITEST         │        │   PLAYWRIGHT     │            │
│   │   (Unit Tests)   │        │   (E2E Tests)    │            │
│   ├──────────────────┤        ├──────────────────┤            │
│   │ • Pure functions │        │ • User flows     │            │
│   │ • State logic    │        │ • DOM interactions│           │
│   │ • Utilities      │        │ • Cross-browser  │            │
│   │ • Fast feedback  │        │ • Real browser   │            │
│   │ ~10-50ms/test    │        │ ~100-500ms/test  │            │
│   └──────────────────┘        └──────────────────┘            │
│                                                                 │
│   Location: tests/unit/         Location: tests/e2e/          │
│   Pattern: *.test.js            Pattern: *.spec.js            │
│   Environment: happy-dom        Environment: Chromium/FF/WebKit│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Why Both?

### Vitest Benefits (Unit Tests)

| Feature             | Benefit                                           |
| ------------------- | ------------------------------------------------- |
| **Speed**           | 10-100x faster than browser tests (~10-50ms/test) |
| **Watch Mode**      | Instant re-runs during development                |
| **Coverage**        | Built-in code coverage reporting (v8)             |
| **Mocking**         | Powerful `vi.mock()` for dependencies             |
| **IDE Integration** | Excellent VS Code support with inline results     |
| **Debugging**       | Better stack traces and breakpoints               |

### Playwright Benefits (E2E Tests)

| Feature             | Benefit                           |
| ------------------- | --------------------------------- |
| **Real Browser**    | Tests actual browser behavior     |
| **Cross-browser**   | Test in Chromium, Firefox, WebKit |
| **Visual Testing**  | Screenshots and visual regression |
| **Network Control** | Mock APIs and intercept requests  |
| **Full Flows**      | Test complete user workflows      |

---

## Test Separation Strategy

| Test Type            | Tool       | Location             | Use Case                                       |
| -------------------- | ---------- | -------------------- | ---------------------------------------------- |
| **Pure Functions**   | Vitest     | `tests/unit/`        | `generateKeySeq()`, `escapeHtml()`, validation |
| **State Management** | Vitest     | `tests/unit/`        | `openFolder()`, `goBack()`, `appState`         |
| **DOM Rendering**    | Vitest     | `tests/unit/`        | `renderBookmarkItem()` with happy-dom          |
| **Integration**      | Vitest     | `tests/integration/` | Multi-function workflows                       |
| **E2E/User Flows**   | Playwright | `tests/e2e/`         | Complete browser workflows                     |
| **Visual/Component** | Playwright | `tests/e2e/`         | UI interactions, screenshots                   |

---

## File Structure

```
tests/
├── unit/                          # Vitest unit tests
│   ├── bookmark-data.test.js      # DV-001 to DV-010
│   ├── state-management.test.js   # SM-001 to SM-006, GB-001 to GB-004
│   ├── rendering.test.js          # RI-001 to RI-010, FC-001 to FC-008, BB-001 to BB-004
│   ├── keybinding-generation.test.js  # KG-001 to KG-016
│   ├── keybinding-assignment.test.js  # AR-001 to AR-010, AF-001 to AF-006
│   ├── action-execution.test.js   # LA-001 to LA-008
│   ├── helpers.test.js            # EH-001 to EH-010
│   ├── bookmark-management.test.js # AB-001 to AB-012, LB-001 to LB-008
│   └── edge-cases.test.js         # ERR-001 to ERR-010
│
├── integration/                   # Vitest integration tests
│   └── bookmark-flows.test.js     # INT-001 to INT-008
│
├── e2e/                          # Playwright E2E tests
│   └── e2e.spec.js               # Existing + new E2E tests
│
└── fixtures/                     # Shared test data
    └── bookmarks.js              # Mock bookmark data
```

---

## Configuration

### vitest.config.js

```javascript
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "unit",
    // Exclude Playwright tests and build outputs
    exclude: [
      "**/e2e/**",
      "**/tests/e2e/**",
      "**/playwright-report/**",
      "**/node_modules/**",
      "**/dist/**",
    ],
    // Use happy-dom for DOM simulation (faster than jsdom)
    environment: "happy-dom",
    // Enable coverage reporting
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "tests/",
        "**/*.spec.js",
        "**/playwright-report/**",
      ],
    },
    // Run tests in parallel
    pool: "forks",
    poolOptions: {
      forks: {
        singleFork: false,
      },
    },
    // Global test timeout
    testTimeout: 5000,
    // Hook timeout
    hookTimeout: 10000,
  },
});
```

### playwright.config.js (Updated)

```javascript
export default {
  testDir: "./tests/e2e",
  testMatch: "**/*.spec.js",
  // Exclude Vitest test directories
  testIgnore: ["**/tests/unit/**", "**/tests/integration/**"],
  // ... rest of existing config
};
```

### package.json Scripts

```json
{
  "scripts": {
    "test": "npm run test:unit && npm run test:e2e",
    "test:unit": "vitest run",
    "test:unit:watch": "vitest",
    "test:unit:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:ci": "npm run test:unit:coverage && npm run test:e2e"
  }
}
```

---

## Implementation Phases

### Phase 1: Setup (10 minutes)

1. **Install Vitest**

   ```bash
   npm install -D vitest @vitest/coverage-v8 happy-dom
   ```

2. **Create vitest.config.js**
   - Configure exclude patterns for Playwright
   - Set up happy-dom environment
   - Enable coverage

3. **Update playwright.config.js**
   - Move E2E tests to `tests/e2e/` directory
   - Update testDir path

4. **Update package.json**
   - Add new test scripts
   - Keep existing scripts working

### Phase 2: Extract Functions (30 minutes)

Since code is inline in `index.html`, extract testable functions:

1. **Create `src/bookmark-data.js`**

   ```javascript
   export const bookmarkData = { ... };
   export function validateNoNestedFolders() { ... };
   ```

2. **Create `src/bookmark-utils.js`**

   ```javascript
   export function generateKeySeq(name, usedCombos) { ... };
   export function escapeHtml(unsafe) { ... };
   export function renderBookmarkItem(bookmark) { ... };
   export function renderFolderCard(folder) { ... };
   ```

3. **Update index.html**
   - Import from modules
   - Or use script type="module" approach

### Phase 3: Write Unit Tests (2-4 hours)

Following TESTING.md Phase 1 (40 critical tests):

#### Week 1: Core Functions

- Data validation tests (DV-001 to DV-003) ✅ Already done
- Keybinding generation (KG-001 to KG-016)
- Helper functions (EH-001 to EH-010)

#### Week 2: State & Rendering

- State management (SM-001 to SM-006, GB-001 to GB-004)
- Rendering functions (RI-001 to RI-010, FC-001 to FC-008, BB-001 to BB-004)
- Keybinding assignment (AR-001 to AR-010, AF-001 to AF-006)

#### Week 3: Actions & Management

- Action execution (LA-001 to LA-008)
- Bookmark management (AB-001 to AB-012, LB-001 to LB-008)
- Integration tests (INT-001 to INT-008)

### Phase 4: Verify Integration (30 minutes)

- Ensure `npm test` runs both
- Verify coverage reports
- Check CI integration

---

## Running Tests

### Development Workflow

```bash
# Run all tests (Report: test-results/<timestamp>/)
mise run test

# Watch unit tests
mise run test-unit-watch

# Run E2E tests when needed
mise run test-e2e

# Run E2E tests against production
mise run test-e2e-remote
```

### CI/CD Workflow

```bash
# Run all tests with coverage
npm run test:ci

# Or run in parallel jobs
npm run test:unit:coverage  # Job 1
npm run test:e2e            # Job 2
```

---

## Benefits After Implementation

| Metric              | Before (Playwright) | After (Vitest + Playwright) | Improvement       |
| ------------------- | ------------------- | --------------------------- | ----------------- |
| **Unit test speed** | ~500ms/test         | ~10-50ms/test               | **10-50x faster** |
| **Watch mode**      | ❌ Not available    | ✅ Instant re-run           | Better DX         |
| **Coverage**        | ❌ Not available    | ✅ Built-in                 | Quality metric    |
| **Debugging**       | Browser DevTools    | VS Code inline              | Easier            |
| **Mocking**         | Limited             | Full vi.mock()              | More testable     |
| **IDE support**     | Limited             | Excellent                   | Better DX         |

---

## Example Test Comparison

### Before (Playwright page.evaluate)

```javascript
// tests/unit.spec.js
import { test, expect } from "@playwright/test";

test("should validate no nested folders", async ({ page }) => {
  await page.goto("/");
  const isValid = await page.evaluate(() => {
    try {
      return bookmarkData.validateNoNestedFolders();
    } catch (e) {
      return false;
    }
  });
  expect(isValid).toBe(true);
});
// ~500ms per test
```

### After (Vitest - Fast & Simple)

```javascript
// tests/unit/bookmark-data.test.js
import { describe, test, expect } from "vitest";
import { bookmarkData } from "../../src/bookmark-data";

describe("Data Structure Validation", () => {
  test("DV-001: valid flat structure returns true", () => {
    const result = bookmarkData.validateNoNestedFolders();
    expect(result).toBe(true);
  });
  // ~10-50ms per test
});
```

---

## Trade-offs & Considerations

### Pros

- ✅ **Fast feedback** during development
- ✅ **Code coverage** reporting
- ✅ **Better IDE** integration
- ✅ **Easy edge case** testing
- ✅ **No browser** overhead for unit tests
- ✅ **Keep E2E tests** in Playwright (real browser)

### Cons

- ⚠️ Need to **extract functions** from index.html
- ⚠️ Two test configurations to maintain
- ⚠️ Team needs to learn Vitest API (similar to Jest)
- ⚠️ DOM tests use happy-dom (95% compatible)

### Mitigation

- Keep E2E tests in Playwright (real browser)
- Vitest API is very similar to Jest (familiar)
- happy-dom is actively maintained and compatible

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Test

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - run: npm run test:unit:coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Migration Strategy

### Gradual Migration (Recommended)

1. **Keep existing Playwright tests** (they work!)
2. **Add Vitest for new tests** only
3. **Migrate gradually** over time
4. **No big bang** rewrite needed

### Priority for Migration

| Priority   | Test Type        | Reason                      |
| ---------- | ---------------- | --------------------------- |
| **High**   | Pure functions   | Immediate benefit (speed)   |
| **High**   | Key generation   | Complex logic needs testing |
| **Medium** | State management | Important for reliability   |
| **Medium** | Rendering        | DOM tests in happy-dom      |
| **Low**    | E2E flows        | Keep in Playwright          |

---

## Next Steps

1. ✅ **Decision made**: Use Vitest + Playwright
2. ✅ **This document**: TESTING.md updated with approach
3. ✅ **Install Vitest**: `npm install -D vitest @vitest/coverage-v8 happy-dom`
4. ✅ **Create configs**: vitest.config.js, update playwright.config.js
5. ✅ **Extract functions**: Create src/ folder with modules
6. ✅ **Write tests**: Phase 1 complete (55 unit tests + 14 E2E tests = 69 total)
7. ✅ **Verify CI**: Both test suites run via mise tasks

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [happy-dom vs jsdom](https://github.com/capricorn86/happy-dom)
- [Testing Best Practices 2025](https://vitest.dev/guide/best-practices.html)

---

**Status:** ✅ Implementation complete - Vitest + Playwright setup working (82 tests passing)
**Last Updated:** February 6, 2026

---
