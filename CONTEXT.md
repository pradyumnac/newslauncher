# Project Context

## Overview

**NewsLauncher** is a minimalist, customizable start page PWA (Progressive Web App) with Google search, dynamic bookmarks, beautiful themes, and offline support.

### Target Users

- Developers and power users who want a fast, keyboard-driven start page
- Privacy-conscious users (no external APIs except Font Awesome CDN)
- Users who want full control over their bookmarks and themes

### Key Features

- **Bookmark Folder System**: Organize bookmarks into folders (News, Tools, Content) with keyboard navigation
- **Dynamic Keybindings**: Two-letter shortcuts generated automatically (e.g., `gi` for GitHub)
- **Themes**: 9 themes including Day, Night, Sepia, Gruvbox, Tokyo Night, Catppuccin
- **PWA**: Installable, offline-capable, responsive

---

## Architecture

### Single-File Strategy

The main application (`index.html`) keeps CSS and JS inline for performance reasons:

- **Why**: Eliminates render-blocking requests, faster first paint
- **Trade-off**: Larger HTML file, but cached by service worker
- **Exception**: Test modules are extracted to `src/` for testability

### PWA Structure

```
index.html          <- Main app (inline CSS/JS)
manifest.json       <- PWA manifest (icons, theme, display mode)
service-worker.js   <- Offline caching, asset versioning
quotes-worker.js    <- Background quote updates (non-blocking)
```

### Modular Testing Architecture

Functions are extracted to `src/` modules for unit testing while keeping the main app as single-file:

```
src/
├── bookmark-data.js      # Data structure + validateNoNestedFolders()
├── bookmark-utils.js     # escapeHtml(), generateKeySeq()
└── bookmark-rendering.js # renderBookmarkItem(), renderFolderCard(), renderBackButton()
```

**Note**: These modules are imported by tests, not by `index.html`. The main app has its own inline copies.

---

## Key Decisions

### Why mise (not just npm scripts)

- **Unified tooling**: One command to install Node.js, run tests, lint, deploy
- **Cross-platform**: Works consistently on macOS, Linux, Windows
- **Task composition**: Complex pipelines with dependencies (e.g., `ci` runs lint → test → lighthouse)
- **Developer experience**: `mise run test` is cleaner than `npm run test`

### Why Vitest + Playwright (Parallel Testing)

| Tool       | Purpose         | Speed  | Environment   |
| ---------- | --------------- | ------ | ------------- |
| Vitest     | Unit tests (55) | ~290ms | happy-dom     |
| Playwright | E2E tests (14)  | ~3.9s  | Real browsers |

- **Vitest**: Blazing fast, native ESM, Jest-compatible API
- **Playwright**: Real browser testing, multi-browser support, reliable

### Why happy-dom (not jsdom)

- **Speed**: 2-3x faster than jsdom
- **Lightweight**: Smaller memory footprint
- **Sufficient**: Covers our DOM testing needs (no complex browser APIs)

### Why Folder System (not flat bookmarks)

- **Organization**: Group related bookmarks (News, Tools, Content)
- **Scalability**: Supports growing bookmark collections
- **Keyboard efficiency**: Folder-level keybindings reduce conflicts

---

## Code Conventions

### Module Structure

```javascript
// src/bookmark-data.js
export const bookmarkData = { folders: [...], stickyBookmarks: [...] };
export function validateNoNestedFolders(folders) { ... }

// src/bookmark-utils.js
export function escapeHtml(str) { ... }
export function generateKeySeq(name, usedCombos) { ... }

// src/bookmark-rendering.js
export function renderBookmarkItem(bookmark, keySeq) { ... }
export function renderFolderCard(folder, keySeq) { ... }
export function renderBackButton() { ... }
```

### Naming Patterns

| Type       | Pattern         | Example            |
| ---------- | --------------- | ------------------ |
| Modules    | `kebab-case.js` | `bookmark-data.js` |
| Functions  | `camelCase`     | `generateKeySeq()` |
| Constants  | `camelCase`     | `bookmarkData`     |
| Test files | `*.test.js`     | `helpers.test.js`  |
| E2E tests  | `*.spec.js`     | `e2e.spec.js`      |

### Testing Patterns

```javascript
// Fixtures: tests/fixtures/bookmarks.js
export const mockFolders = { news: {...}, tools: {...} };
export const invalidFixtures = { nestedFolder: {...} };

// Unit tests: tests/unit/*.test.js
import { describe, it, expect } from 'vitest';
import { escapeHtml } from '../../src/bookmark-utils.js';

describe('escapeHtml', () => {
  it('escapes ampersand correctly', () => {
    expect(escapeHtml('a & b')).toBe('a &amp; b');
  });
});

// E2E tests: tests/e2e/*.spec.js
import { test, expect } from '@playwright/test';

test('displays folders at root level', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.folder-card')).toHaveCount(3);
});
```

### Test ID Pattern

Test cases are identified with prefixes:

| Prefix | Category         |
| ------ | ---------------- |
| `DV-`  | Data Validation  |
| `SM-`  | State Management |
| `GB-`  | Go Back          |
| `RI-`  | Render Item      |
| `FC-`  | Folder Card      |
| `BB-`  | Back Button      |
| `KG-`  | Key Generation   |
| `AR-`  | Assign Root      |
| `AF-`  | Assign Folder    |
| `LA-`  | Link Action      |
| `AB-`  | Add Bookmark     |
| `LB-`  | Load Bookmarks   |
| `EH-`  | Escape HTML      |
| `INT-` | Integration      |
| `ERR-` | Error Handling   |

---

## Documentation Index

| Document                                 | Purpose                | Key Content                                    |
| ---------------------------------------- | ---------------------- | ---------------------------------------------- |
| [README.md](README.md)                   | Project overview       | Setup, usage, deployment, customization        |
| [CONTEXT.md](CONTEXT.md)                 | Architecture reference | Decisions, conventions, quick reference        |
| [TODO.md](TODO.md)                       | Task management        | Sprint status, test tracking, roadmap          |
| [TESTING.md](TESTING.md)                 | Testing strategy       | 132 test cases organized by category           |
| [UseCases.md](UseCases.md)               | Requirements           | 17 bookmark use cases with acceptance criteria |
| [UserFlows.md](UserFlows.md)             | UX flows               | 14 navigation flows with state diagrams        |
| [CONTRIBUTING.md](CONTRIBUTING.md)       | Contribution guide     | How to contribute, PR process                  |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) | Community              | Expected behavior, enforcement                 |

---

## Quick Reference

### Commands

```bash
# Development
mise run start              # Start dev server (http://localhost:8000)
mise run install            # Install dependencies

# Testing
mise run test               # All tests (unit + E2E)
mise run test-unit          # Unit tests only (~290ms)
mise run test-unit-watch    # Unit tests in watch mode
mise run test-unit-coverage # Unit tests with coverage
mise run test-e2e           # E2E tests only (~3.9s)
mise run test-e2e-ui        # E2E with Playwright UI
mise run test-e2e-debug     # E2E in debug mode

# Code Quality
mise run check              # All static checks
mise run lint               # Lint JavaScript
mise run format             # Format all files
mise run check-spelling     # Check spelling
mise run validate-html      # Validate HTML

# CI/CD
mise run ci                 # Full CI pipeline
mise run lighthouse         # Performance audit
mise run deploy             # Deploy to GitHub Pages
```

### Current Stats

| Metric           | Value                    |
| ---------------- | ------------------------ |
| Unit Tests       | 55 passing               |
| E2E Tests        | 14 passing               |
| Total Tests      | 69                       |
| Unit Test Speed  | ~290ms                   |
| E2E Test Speed   | ~3.9s                    |
| Bookmark Folders | 3 (News, Tools, Content) |
| Themes           | 9                        |

### Key Files

| File                          | Purpose                   |
| ----------------------------- | ------------------------- |
| `index.html`                  | Main app (v3, current)    |
| `vitest.config.js`            | Unit test configuration   |
| `playwright.config.js`        | E2E test configuration    |
| `mise.toml`                   | Task runner configuration |
| `tests/fixtures/bookmarks.js` | Test data and mocks       |

---

**Last Updated**: February 5, 2026
