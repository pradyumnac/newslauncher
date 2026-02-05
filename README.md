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

## ✨ Features

- 🔍 **Google Search** — Instant search built-in.
- 📚 **Dynamic Bookmarks** — Add your own links, saved via `localStorage`.
- 🎨 **Themes** — Switch between Day, Night, Sepia, Gruvbox, Tokyo Night, and Catppuccin.
- ⏰ **Real-Time Clock** — Stylish digital clock. You may stylize further with custom font
- 📜 **Quote of the Day** — Fetched from hosted json. No third part dependency.
- ⚡ **Offline Support** — Works offline via Service Worker.
- 📱 **Installable PWA** — Add to your phone or desktop like an app.
- 🌐 **Responsive Design** — Works on all screen sizes.
- 🪶 **Lightweight** - Performance optimised for all screen sizes. Optimised with Lighthouse
- 🕵 **Privacy Friendly** - Data never leaves your servers

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

## 🧩 File Structure

```
web-launcher/
│
├── index.html             # Main HTML file
├── v1.html                # v1 Homepage file ( Based on original project )
├── v2.html                # v2 Homepage file ( Handwritten but now discarded)
├── v3.html                # v3 Homepage file ( Written by AI, Supervised by yours truly : As it should be)
├── manifest.json          # PWA manifest
├── quotes.js              # Quotation fetching logic with Local IndexedDb support
├── quotes-worker.js       # BG worker for quotation updation logic (non-blocking)
├── service-worker.js      # Offline cache logic
├── data/
│   ├── ...                # Files for quotes local api
├── img/
│   ├── favicon.png        # App icon
│   ├── ...                # Other icons
│   └── favicon.ico        # Project screenshot
│     ├── screenshots/        # App icon
├── README.md              # This file
├── tests/                 # Playwright tests (E2E & Unit)
├── mise.toml              # Task configuration
└── ...                    # Other static assets
```

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
