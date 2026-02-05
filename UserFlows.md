# User Flows

## Flow Diagram Legend

- `[]` = User Action
- `<>` = System State/View
- `→` = Flow direction
- `⇄` = Optional/Alternative path

---

## Flow 1: Basic Navigation - Browse and Open Bookmark

```
[Open Application]
    ↓
<Root View>
    ↓
[See folders: News, Tools, Content]
    ↓
[Click on "Tools" folder OR Type "to"]
    ↓
<Folder View: Tools>
    ↓
[See back button + bookmarks (Gmail, ChatGPT, Github, etc.)]
    ↓
[Click on "Github" bookmark OR Type "gi"]
    ↓
<System opens github.com in new tab>
    ↓
[User continues working on new tab]
```

---

## Flow 2: Navigation with Back Button

```
[Open Application]
    ↓
<Root View>
    ↓
[Click on "News" folder]
    ↓
<Folder View: News>
    ↓
[Browse bookmarks]
    ↓
[Decide to check Tools folder instead]
    ↓
[Click "Back" button (first item)]
    ↓
<Root View>
    ↓
[Click on "Tools" folder]
    ↓
<Folder View: Tools>
```

---

## Flow 3: Keyboard-Only Navigation

```
[Open Application]
    ↓
<Root View>
    ↓
[Type "ne" (News folder binding)]
    ↓
<Folder View: News>
    ↓
[Type "bu" (Business Standard binding)]
    ↓
<System opens Business Standard in new tab>
    ↓
[Return to NewsLauncher tab]
    ↓
<Folder View: News (still open)>
    ↓
[Press ESC key]
    ↓
<Root View>
    ↓
[Type "to" (Tools folder binding)]
    ↓
<Folder View: Tools>
    ↓
[Press Left Arrow key]
    ↓
<Root View>
```

---

## Flow 4: Add Custom Bookmark

```
[Open Application]
    ↓
<Any View>
    ↓
[Scroll to "My Bookmarks" section]
    ↓
[Type "Reddit" in Label field]
    ↓
[Type "https://www.reddit.com" in URL field]
    ↓
[Click "Add" button]
    ↓
<System validates and saves to localStorage>
    ↓
<System displays new bookmark in list>
    ↓
<Bookmark is now available in My Bookmarks>
```

---

## Flow 5: Search and Quick Access

```
[Open Application]
    ↓
<Root View>
    ↓
[Press Space key]
    ↓
<Focus moves to search input>
    ↓
[Type "playwright testing"]
    ↓
[Press Enter]
    ↓
<System submits form to Google>
    ↓
<Google search results open in new tab>
```

---

## Flow 6: View Keyboard Shortcuts Help

```
[Open Application]
    ↓
<Root View>
    ↓
[Press "?" key]
    ↓
<Hotkey Modal opens>
    ↓
[See list of active keybindings]
    ↓
    ├─ [Press ESC] → <Modal closes, back to Root View>
    ├─ [Press "?" again] → <Modal stays open>
    └─ [Click "Close" button] → <Modal closes>
```

---

## Flow 7: Change Theme

```
[Open Application]
    ↓
<Any View>
    ↓
[Click theme dropdown (top right)]
    ↓
[Select "night" theme]
    ↓
<System applies theme-night class>
    ↓
<System saves "night" to localStorage>
    ↓
<UI updates with dark theme>
    ↓
[Reload page]
    ↓
<System reads localStorage>
    ↓
<Theme persists as "night">
```

---

## Flow 8: Quick Bookmark Access via Hotkeys

```
[Open Application]
    ↓
<Root View>
    ↓
[Type "to"] (Tools folder)
    ↓
<Folder View: Tools>
    ↓
[Type "ch"] (ChatGPT - if unique binding available)
    ↓
    ├─ <ChatGPT opens in new tab>
    └─ [Type different combination if "ch" not found]
        ↓
        [Type "ca"]
        ↓
        <ChatGPT opens in new tab>
```

---

## Flow 9: Error Recovery - Invalid Keybinding

```
[Open Application]
    ↓
<Root View>
    ↓
[Type "xx"] (invalid binding)
    ↓
<System checks hotkeyMap2>
    ↓
<No match found>
    ↓
[Type "yy"] (another invalid binding)
    ↓
<System resets buffer>
    ↓
[Type "ne"] (valid binding)
    ↓
<Folder View: News opens>
```

---

## Flow 10: Data Validation Error Flow

```
[Developer adds invalid nested data]
    ↓
[User opens Application]
    ↓
<System calls validateNoNestedFolders()>
    ↓
<System detects nested folder/bookmarks property>
    ↓
<ValidationError thrown>
    ↓
[Console shows: "Invalid data: Nested folder detected..."]
    ↓
[Alert shown to user]
    ↓
<Application may not function correctly>
    ↓
[Developer fixes data structure]
    ↓
[User reloads page]
    ↓
<Validation passes>
    ↓
<Application works normally>
```

---

## Flow 11: Session Persistence

```
[User is in Tools folder]
    ↓
<Folder View: Tools>
    ↓
[User closes browser tab]
    ↓
[User reopens NewsLauncher]
    ↓
<Root View (always starts at root)>
    ↓
[System restores theme from localStorage>
    ↓
[System loads custom bookmarks from localStorage>
    ↓
<User bookmarks displayed in My Bookmarks section>
```

---

## Flow 12: Complete Workflow Example

```
Scenario: User wants to check news, then use ChatGPT, then add a new bookmark

[Open Application]
    ↓
<Root View>
    ↓
[Type "ne"] → <Folder View: News>
    ↓
[Browse Indian and International news bookmarks]
    ↓
[Click "Bloomberg"] → <Bloomberg opens in new tab>
    ↓
[User reads Bloomberg article]
    ↓
[Return to NewsLauncher]
    ↓
<Still in Folder View: News>
    ↓
[Press ESC] → <Root View>
    ↓
[Type "to"] → <Folder View: Tools>
    ↓
[Type "ca"] → <ChatGPT opens in new tab>
    ↓
[User interacts with ChatGPT]
    ↓
[Return to NewsLauncher]
    ↓
<Still in Folder View: Tools>
    ↓
[Press Left Arrow] → <Root View>
    ↓
[Scroll to My Bookmarks]
    ↓
[Add "Claude AI" bookmark]
    ↓
<System saves and displays new bookmark>
    ↓
<New bookmark available for future use>
```

---

## Flow 13: Sticky Bookmark Feature (Future)

```
[Admin configures sticky bookmark: Gmail in code]
    ↓
[User opens Application]
    ↓
<Root View>
    ↓
[System displays:]
    - Sticky Bookmarks (Gmail with keybinding "gm")
    - Folders (News, Tools, Content)
    ↓
[Type "gm"] → <Gmail opens in new tab>
    ↓
[No folder navigation needed for frequently used bookmarks]
```

---

## State Transitions

### View States

```
                    ┌─────────────────┐
                    │   Root View     │
                    │ (Folders +      │
                    │  Sticky)        │
                    └────────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
            ▼                ▼                ▼
    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
    │  News Folder │ │ Tools Folder │ │Content Folder│
    │    View      │ │    View      │ │    View      │
    └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
           │                │                │
           └────────────────┼────────────────┘
                            │
                            ▼
                   ┌─────────────────┐
                   │   Back to Root  │
                   │   (ESC/Left/    │
                   │    Back Btn)    │
                   └─────────────────┘
```

### Keybinding States

```
┌────────────────────────────────────────────────────────────┐
│  AT ROOT LEVEL                                             │
│  Keybindings assigned to:                                  │
│  - Folder names (News → "ne", Tools → "to", etc.)          │
│  - Sticky bookmarks (if configured)                        │
└────────────────────────────────────────────────────────────┘
                            │
                            │ Open Folder
                            ▼
┌────────────────────────────────────────────────────────────┐
│  INSIDE FOLDER                                             │
│  Keybindings CLEARED, then assigned to:                    │
│  - Back button ("ba" or similar)                           │
│  - Bookmark names (Github → "gi", ChatGPT → "ca", etc.)    │
└────────────────────────────────────────────────────────────┘
                            │
                            │ Go Back
                            ▼
┌────────────────────────────────────────────────────────────┐
│  RETURN TO ROOT                                            │
│  Keybindings CLEARED, then assigned to:                    │
│  - Folder names again                                      │
└────────────────────────────────────────────────────────────┘
```

---

## Decision Flowchart

```
[User presses key]
    ↓
[Is focus in input/textarea?]
    ├─ YES → [Normal typing, ignore hotkeys]
    └─ NO → Continue
    ↓
[Which key was pressed?]
    ├─ "?" → [Show hotkey modal]
    ├─ "ESC" →
    │   ├─ [In folder?] → [Go back to root]
    │   └─ [At root?] → [Close modal if open]
    ├─ "Left Arrow" →
    │   ├─ [In folder?] → [Go back to root]
    │   └─ [At root?] → [Do nothing]
    ├─ "Space" → [Focus search input]
    └─ [Any other key] →
        ↓
        [Add to input buffer]
        ↓
        [Buffer has 2 characters?]
        ├─ NO → [Wait for more input]
        └─ YES →
            ↓
            [Check hotkeyMap2 for match]
            ↓
            [Match found?]
            ├─ YES →
            │   ├─ [Type = folder] → [Open folder]
            │   ├─ [Type = back] → [Go back to root]
            │   └─ [Type = link] → [Open URL in new tab]
            └─ NO → [Reset buffer, do nothing]
```

---

## Edge Cases and Recovery

### Case 1: Typing in Search Box

```
[User clicks search input]
    ↓
<Focus is in input field>
    ↓
[User types "news"]
    ↓
<System ignores hotkeys while in input>
    ↓
<Text appears in search box normally>
```

### Case 2: Rapid Key Pressing

```
[User rapidly types multiple keys]
    ↓
[System maintains last 2 characters only]
    ↓
[Buffer: "abc" → becomes "bc"]
    ↓
[System checks "bc" for binding]
```

### Case 3: Browser Back Button

```
[User is in Tools folder]
    ↓
[User clicks browser back button]
    ↓
<Browser navigates away from NewsLauncher>
    ↓
[User clicks forward or reopens app]
    ↓
<Application reloads, starts at Root View>
    ↓
(State is not persisted - intentional design)
```

---

## Performance Considerations

### Keybinding Assignment

- Happens on: Initial load, folder open, folder close
- Clears previous map before assigning new ones
- Only assigns to visible elements
- O(n) complexity where n = number of visible items

### Rendering

- Root view: Renders folders + sticky bookmarks
- Folder view: Renders back button + folder bookmarks
- No virtual scrolling needed (limited number of items)
- User bookmarks section persists across views

### Storage

- Custom bookmarks: localStorage (JSON array)
- Theme preference: localStorage (string)
- Static bookmark data: In-memory JavaScript object
- No server storage required
