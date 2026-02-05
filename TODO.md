# Project Tasks

## High Priority

- [x] **Documentation**: Create `CONTEXT.MD` and `TODO.md`.
- [x] **Testing**: Add unit tests for `quotes.js` (logic validation) and E2E tests.
- [x] **Linting**: Add Prettier/ESLint/CSpell/HTML-Validate configuration.
- [x] **CI**: Consolidate tasks in `mise` and replace GitHub Actions with local checks.
- [x] **Git**: Migrate from Husky to plain Git hooks (`.git/hooks/pre-commit`).
- [x] **Architecture**: Adopt Single File Strategy (Keep CSS/JS inline for performance).
- [ ] **Performance**: Replace Font Awesome with inline SVGs to eliminate the render-blocking CDN request.

## Features & Enhancements

- [ ] **Bookmarks**: Refactor bookmarks into a structured folder system (move existing flat structure to folders).
- [ ] **Bookmarks**: Add Homelab bookmarks (Waiting for user input).
- [ ] **Configuration**: Unify static (HTML) and dynamic (localStorage) bookmarks into a single data source/manager.
- [ ] **PWA**: Fix hardcoded paths in `service-worker.js` (`/newslauncher`) to support root deployments.
- [ ] **Automation**: Create a script to auto-update `quotes-version.json` when data changes.

## Maintenance

- [x] **Assets**: Audit `manifest.json` for duplicate icon entries.
