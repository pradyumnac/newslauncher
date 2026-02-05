# Context

## Project Overview

**NewsLauncher** is a minimalist, customizable start page (PWA) designed for privacy and speed. It features a Google search bar, dynamic bookmarks, themes, a real-time clock, and an offline-capable quote of the day system.

## Tech Stack

- **Frontend**: Plain HTML5, CSS3, and Vanilla JavaScript (ES6+).
- **Storage**:
  - `localStorage`: User preferences (theme, custom bookmarks).
  - `IndexedDB`: Storage for the quotes database to support offline access and large datasets.
- **PWA**: Service Worker (`service-worker.js`) for offline caching and installation.
- **External Dependencies**: Font Awesome (via CDN) for icons.

## Tooling & CI

The project uses **mise** as the central task runner and tool manager.

- **Task Runner**: `mise` (replaces `npm run` scripts for orchestration).
- **Testing**:
  - **Playwright**: End-to-End (E2E) testing for UI, search, bookmarks, themes, and shortcuts.
  - **Unit Testing**: Browser-context unit tests for `quotes.js` logic using Playwright.
  - **Static Analysis**: `html-validate` for HTML structure, `eslint` for JS, `prettier` for formatting, `cspell` for spelling.
- **CI/CD**: Local CI pipeline via `mise run ci`. GitHub Actions have been removed in favor of local pre-commit hooks and `mise` tasks.

## Architecture

- **Entry Point**: `index.html` serves as the main application shell, containing the structure, embedded CSS for themes/layout, and embedded JS for UI logic.
- **Logic**:
  - `quotes.js`: Handles fetching quotes, version checking, and interacting with IndexedDB.
  - `quotes-worker.js`: A Web Worker used to populate IndexedDB in the background to prevent UI blocking.
  - `service-worker.js`: Caches core assets (`index.html`, `quotes.js`, data files) for offline functionality.
- **Data**:
  - Quotes are stored in `data/quotes.db.ascii.json` and versioned via `data/quotes-version.json`.
  - Images and icons are in `img/`.

## Key Features

- **Themes**: CSS variable-based theming (Day, Night, Sepia, Gruvbox, Tokyo Night, etc.).
- **Keyboard Shortcuts**: "Vim-like" hotkeys generated dynamically from bookmark labels.
- **Bookmarks**:
  - **Static**: Hardcoded in `index.html` (e.g., News, Tools).
  - **Dynamic**: User-added bookmarks stored in `localStorage`.
- **Privacy**: No tracking, all data stays local (except for the initial fetch of the static site).
