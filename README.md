# 🚀 Web Launcher - Minimalist Customizable Start Page (PWA)

**A fast, minimalist start page with Google search, dynamic bookmarks,
beautiful themes, and PWA support.**

🕵 No Privacy Risk ( Beware the hosting provider!)

---

## 🖼 Screenshots

#### Home page UI

Supports 9 themes

![Theme Sample 2](./img/screenshots/screenshot2.png)
![Theme Sample 2](./img/screenshots/screenshot3.png)
![Theme Sample 3](./img/screenshots/screenshot4.png)
![Theme Sample 4](./img/screenshots/screenshot5.png)

---

#### Keyboard Shortcuts Support

Keyboard shortcuts are generated at launch.  
Static bookmarks are given priority so that adding bookmarks dont mess up existing ones you are used to.  
Uses two available letters. E.g. press `gi` to launch github.  
To get the shortcuts, press `?`. Escape hides this popup.  
To use the search, press `spacebar` to focus the google search box

![Keyboard Shortcuts Helper Pop Up](./img/screenshots/screenshot6.png)

---

#### User added Bookmarks

Entries persist across sessions

![Custom Bookmarks](./img/screenshots/screenshot1.png)

---

#### Unobstructive random quote generator without any API

The quote list is completely customisable. See `data` folder.
For version increments of quote, ensure to dump up version number in `data/quotes-version.json`

![Random Quotes](./img/screenshots/screenshot7.png)

---

## Features

- **Google Search** — Instant search built-in.
- **Dynamic Bookmarks** — Add your own links, saved via `localStorage`.
- **Split Dashboard** — Optimized layout with 1/3 "My Bookmarks" and 2/3 "Folders".
- **Bookmark Folders** — Organize bookmarks into folders (News, Tools, Content) with keyboard navigation.
- **Smart Grid** — Folder contents display in a neat 3-row grid with dynamic scroll arrows.
- **Themes** — Switch between 9 themes including Day, Night, Sepia, Gruvbox, Tokyo Night, and Catppuccin (Mocha).
- **Real-Time Clock** — Stylish digital clock. You may stylize further with custom font
- **Quote of the Day** — Fetched from hosted json. No third part dependency.
- **Offline Support** — Works offline via Service Worker.
- **Installable PWA** — Add to your phone or desktop like an app.
- **Responsive Design** — Works on all screen sizes.
- **Lightweight** - Performance optimised for all screen sizes. Optimised with Lighthouse
- **Privacy Friendly** - Data never leaves your servers

---

## 📦 Live Demo

> Visit: [https://pradyumnac.github.io/newslauncher/](https://pradyumnac.github.io/newslauncher/)

---

## 🚀 Getting Started

### 1. **Clone and Setup**

This project uses [mise](https://mise.jdx.dev/) to manage development tools (Node.js, etc.).

```bash
git clone https://github.com/pradyumnac/newslauncher.git
cd newslauncher
mise install
```

### 2. **Development & Testing**

This project relies on `mise` for all development tasks.

- **Start Server**:
  ```bash
  mise run start
  ```
- **Run Tests (E2E & Unit)**:
  ```bash
  mise run test
  # Reports generated in test-results/<timestamp>/
  ```
- **Remote E2E Tests**:
  ```bash
  mise run test-e2e-remote
  ```
- **Code Quality (Lint, Format, Spellcheck)**:
  ```bash
  mise run check
  ```
- **Full CI Pipeline**:
  ```bash
  mise run ci
  ```

### 3. **Run Locally (Manual)**

Just open `index.html` in your browser.

> [!Tip]
> v1.html, v2.html, v3.html are iterations.
> For my dev purposes, I have hardlinked index.html from the version I am working on ( v3).

Or use a local server for PWA features:

```bash
mise run start
```

---

## 🌍 Deployment

You can deploy this project using GitHub Pages or any static file host:

### GitHub Pages

- Push the code to a public repo (e.g., `yourusername/web-launcher`)
- Go to **Settings → Pages → Source** and select the branch (`main`) and root (`/`)
- Update all absolute paths in `index.html` and `manifest.json` to be relative or match the GitHub Pages path (`/newslauncher/` if applicable)
- Example:

  ```html
  <link rel="manifest" href="manifest.json" />
  ```

  ```js
  navigator.serviceWorker.register("service-worker.js");
  ```

---

## File Structure

```
newslauncher/
├── index.html              # Main HTML file (v3 - current)
├── v1.html                 # v1 Homepage (based on original project)
├── v2.html                 # v2 Homepage (handwritten, discarded)
├── v3.html                 # v3 Homepage (AI-written, supervised)
├── manifest.json           # PWA manifest
├── quotes.js               # Quotation fetching with IndexedDB
├── quotes-worker.js        # Background worker for quote updates
├── service-worker.js       # Offline cache logic
│
├── src/                    # Extracted modules for testing
│   ├── bookmark-data.js    # Bookmark data structure + validation
│   ├── bookmark-utils.js   # Helper functions (escapeHtml, generateKeySeq)
│   └── bookmark-rendering.js # Rendering functions
│
├── tests/
│   ├── unit/               # Vitest unit tests (55 tests)
│   ├── e2e/                # Playwright E2E tests (14 tests)
│   └── fixtures/           # Shared test data and mocks
│
├── data/                   # Quotes local API files
├── img/                    # Icons and screenshots
│
├── vitest.config.js        # Vitest configuration
├── playwright.config.js    # Playwright configuration
├── mise.toml               # Task runner configuration
│
├── README.md               # This file
├── CONTEXT.md              # Architecture, conventions, decisions
├── TODO.md                 # Task tracking and roadmap
├── TESTING.md              # Testing strategy (132 test cases)
├── UseCases.md             # 17 bookmark system use cases
├── UserFlows.md            # 14 user flow diagrams
├── CONTRIBUTING.md         # Contribution guidelines
└── CODE_OF_CONDUCT.md      # Community guidelines
```

---

## Documentation

| Document                                 | Description                                               |
| ---------------------------------------- | --------------------------------------------------------- |
| [README.md](README.md)                   | Project overview, setup, deployment, customization        |
| [CONTEXT.md](CONTEXT.md)                 | Architecture decisions, code conventions, quick reference |
| [TODO.md](TODO.md)                       | Task tracking, sprint status, test execution status       |
| [TESTING.md](TESTING.md)                 | Testing strategy with 132 planned test cases              |
| [UseCases.md](UseCases.md)               | 17 bookmark system use cases with acceptance criteria     |
| [UserFlows.md](UserFlows.md)             | 14 user flow diagrams with state transitions              |
| [CONTRIBUTING.md](CONTRIBUTING.md)       | How to contribute to the project                          |
| [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) | Community guidelines                                      |

---

## ⚙️ Customization Guide

### 🔗 Add Default Bookmarks

Modify the HTML inside the `<main>` section under `.bookmark-group`.

```html
<a href="https://www.reddit.com"> <i class="fa-solid fa-link"></i> Reddit </a>
```

### 🎨 Add / Edit Themes

Themes are defined as CSS variables inside `<style>`:

```css
body.theme-night {
  --bg1: #111;
  --bg2: #000;
  --color: #eee;
}
```

You can add your own by modifying the CSS and `<select>` options.

---

## 🔒 Privacy Notice

This project:

- Does not use cookies or trackers
- Uses cloudflare CDN for fontawesome icons. Its has its own set of third party cookies which may track users
- Stores user data (bookmarks, theme preferences) **only in localStorage** (IndexedDB to be technically correct)

---

## 📲 Progressive Web App (PWA)

This app can be:

- Installed on Android/iOS from Chrome
- Installed on desktop from any Chromium browser

**Features:**

- Offline access
- Home screen icon
- App-like full screen view ( Set to portrait mode)

---

## 🧪 Browser Compatibility

| Browser                 | Compatible                       |
| ----------------------- | -------------------------------- |
| Chrome (desktop/mobile) | ✅ Yes                           |
| Firefox                 | ✅ Yes                           |
| Edge                    | ✅ Yes                           |
| Safari (iOS/macOS)      | ⚠️ Partial (limited PWA support) |

---

## 🙌 Contributing

We welcome contributions! Here's how you can help:

- 🐞 **Report bugs** via [Issues](https://github.com/yourusername/web-launcher/issues)
- 🎨 **Suggest new themes** or styling improvements
- ✨ **Improve accessibility** and performance
- 🔧 **Refactor or optimize code**

### To contribute

```bash
git clone https://github.com/yourusername/web-launcher.git
git checkout -b feature/your-feature
# Make changes
mise run ci # Ensure all checks pass
git commit -m "Add: your feature"
git push origin feature/your-feature
# Then open a pull request
```

---

## 📜 License

[MIT License](LICENSE)

---

## 💡 Credits

- Quotes API: Quotes fetched from Chatgpt filtering through my favourite authors.
- Icons: [Font Awesome](https://fontawesome.com/)
- Inspired by original fork [K-capehart/Web-Browser-Homepage](https://github.com/k-capehart/Web-Browser-Homepage).
  V1.html is based out of that project. Current version (v3) is completely rewritten

---

## 🌟 Star This Project

If you like it, give it a ⭐ to help others discover it!

> [!CAUTION]
> Written by 🤖, Optimised and supervised by 🙅 ( how it should be)
