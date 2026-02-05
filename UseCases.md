# Use Cases

## Bookmark Folder System

### UC-001: View Root Level Folders

**Actor:** User  
**Precondition:** User has opened the NewsLauncher application  
**Postcondition:** User sees available folders at root level

**Main Flow:**

1. System displays root view with folders (News, Tools, Content)
2. System displays sticky bookmarks at root level (if any configured)
3. System assigns keybindings to folders based on their names
4. User can see all available folders as clickable cards

**Keybindings:**

- Folders get 2-character keybindings from their names (e.g., "ne" for News, "to" for Tools)
- Sticky bookmarks get keybindings if present

---

### UC-002: Open Folder by Click

**Actor:** User  
**Precondition:** User is at root level view  
**Postcondition:** Folder opens showing its bookmarks

**Main Flow:**

1. User clicks on a folder card (e.g., "News")
2. System clears all current keybindings
3. System renders the folder view with:
   - Back button as first item
   - All bookmarks in that folder
4. System assigns new keybindings to visible bookmarks
5. User sees only the bookmarks from the selected folder

**Alternative Flows:**

- **2a. User clicks with mouse:** Same as main flow
- **2b. User uses touch device:** Touch activates folder

---

### UC-003: Open Folder by Keyboard Shortcut

**Actor:** User  
**Precondition:** User is at root level view, focus not in input field  
**Postcondition:** Folder opens showing its bookmarks

**Main Flow:**

1. User types 2-character keybinding for a folder (e.g., "ne" for News)
2. System detects the keybinding match
3. System opens the corresponding folder
4. System clears previous keybindings
5. System assigns new keybindings to bookmarks in the folder

**Error Conditions:**

- If no matching keybinding exists, nothing happens
- If user types in an input field, keybinding is ignored

---

### UC-004: Navigate Back Using Back Button

**Actor:** User  
**Precondition:** User is inside a folder view  
**Postcondition:** User returns to root level view

**Main Flow:**

1. User clicks the "Back" card (first item in the grid)
2. System clears all folder view keybindings
3. System renders root view with folders
4. System assigns keybindings to folders
5. User sees root level folders again

---

### UC-005: Navigate Back Using ESC Key

**Actor:** User  
**Precondition:** User is inside a folder view, focus not in input field  
**Postcondition:** User returns to root level view

**Main Flow:**

1. User presses ESC key
2. System detects user is inside a folder
3. System navigates back to root view
4. System clears folder keybindings and assigns folder keybindings
5. User sees root level folders

**Alternative Flow:**

- **2a. User at root level:** ESC closes hotkey modal if open

---

### UC-006: Navigate Back Using Left Arrow Key

**Actor:** User  
**Precondition:** User is inside a folder view, focus not in input field  
**Postcondition:** User returns to root level view

**Main Flow:**

1. User presses Left Arrow key
2. System detects user is inside a folder
3. System navigates back to root view
4. System updates keybindings accordingly
5. User sees root level folders

**Alternative Flow:**

- **2a. User at root level:** Left Arrow does nothing (no folder to go back to)

---

### UC-007: Open Bookmark by Click

**Actor:** User  
**Precondition:** User is inside a folder view or at root with sticky bookmarks  
**Postcondition:** Bookmark opens in new tab

**Main Flow:**

1. User clicks on a bookmark link
2. System opens the URL in a new tab
3. User is taken to the website

---

### UC-008: Open Bookmark by Keyboard Shortcut

**Actor:** User  
**Precondition:** User is inside a folder view, focus not in input field  
**Postcondition:** Bookmark opens in new tab

**Main Flow:**

1. User types 2-character keybinding for a bookmark (e.g., "gi" for Github)
2. System detects the keybinding match
3. System opens the bookmark URL in a new tab
4. Keybinding buffer resets

**Keybindings:**

- Bookmarks get 2-character keybindings from their names
- Only visible bookmarks have active keybindings
- Keybindings are unique (no duplicates)

---

### UC-009: Add Custom Bookmark

**Actor:** User  
**Precondition:** User is at any view  
**Postcondition:** New bookmark is saved and displayed

**Main Flow:**

1. User enters name in "Label" input field
2. User enters URL in "URL" input field
3. User clicks "Add" button
4. System validates input
5. System saves bookmark to localStorage
6. System displays bookmark in "My Bookmarks" section

**Error Conditions:**

- Empty name or URL: bookmark not added
- Invalid URL: stored as-is (browser handles validation)

---

### UC-010: View Keyboard Shortcuts

**Actor:** User  
**Precondition:** User is at any view, focus not in input field  
**Postcondition:** Modal showing all active keybindings is displayed

**Main Flow:**

1. User presses "?" key
2. System displays hotkey modal
3. Modal shows all currently active keybindings
4. User can see what shortcuts are available

**Exit:**

- User presses ESC to close modal
- User clicks "Close" button

---

### UC-011: Validate Data Structure (System)

**Actor:** System  
**Precondition:** Application loads  
**Postcondition:** Data structure validated, errors logged if invalid

**Main Flow:**

1. System loads bookmark data
2. System calls `validateNoNestedFolders()`
3. System checks each folder's bookmarks
4. If any bookmark has `folders` or `bookmarks` property, throws error
5. Error is logged to console and shown to user

**Validation Rules:**

- No 2nd level nesting allowed
- Folders can only contain bookmarks, not other folders
- Bookmarks cannot have nested bookmarks property

---

### UC-012: Switch Theme

**Actor:** User  
**Precondition:** User is at any view  
**Postcondition:** Theme is changed and persisted

**Main Flow:**

1. User selects theme from dropdown
2. System applies theme CSS class to body
3. System saves theme preference to localStorage
4. UI updates with new color scheme

**Available Themes:**

- Day, Night, Sepia, Gruvbox, Tokyo, Nord, Solarized Light, Solarized Dark, Forest

---

### UC-013: Search Google

**Actor:** User  
**Precondition:** User is at any view  
**Postcondition:** Google search results open in new tab

**Main Flow:**

1. User clicks in search input or presses Space
2. User types search query
3. User presses Enter
4. System submits form to Google search
5. Results open in new tab

**Alternative Flow:**

- **1a. Quick focus:** User presses Space key to focus search input

---

### UC-014: View Current Time

**Actor:** User  
**Precondition:** Application is open  
**Postcondition:** User sees current date and time

**Main Flow:**

1. System displays clock in header
2. Clock updates every second
3. User can see current date/time in locale format

---

## Sticky Bookmarks Feature (Future/Optional)

### UC-015: Configure Sticky Bookmark

**Actor:** User/Admin  
**Precondition:** User modifies bookmark data  
**Postcondition:** Bookmark appears at root level

**Main Flow:**

1. Admin adds bookmark to `stickyBookmarks` array in code
2. System displays sticky bookmark at root level
3. Sticky bookmark gets keybinding like regular bookmarks
4. Sticky bookmark is visible alongside folders

**Use Case:**

- Frequently accessed bookmarks that should always be visible
- Example: Gmail, Calendar, critical work tools

---

## Error Handling Use Cases

### UC-016: Invalid Keybinding

**Actor:** User  
**Precondition:** User types unassigned key combination  
**Postcondition:** Nothing happens, buffer resets

**Main Flow:**

1. User types 2 characters that don't match any binding
2. System checks hotkeyMap2
3. No match found
4. Input buffer resets after timeout/next keypress

### UC-017: Data Validation Error

**Actor:** System  
**Precondition:** Invalid data structure detected  
**Postcondition:** Error logged, user alerted

**Main Flow:**

1. System detects nested folder in data
2. System throws validation error
3. Error logged to console
4. Alert shown to user
5. Application may not function correctly

---

## Key Features Summary

| Feature         | Root View                           | Inside Folder                       |
| --------------- | ----------------------------------- | ----------------------------------- |
| Visible Items   | Folders + Sticky Bookmarks          | Back Button + Folder Bookmarks      |
| Keybindings     | Folder names (2-char)               | Bookmark names (2-char)             |
| Navigation      | Click/Keybinding to open            | Click Back/ESC/Left to go back      |
| Add Bookmarks   | Available in "My Bookmarks" section | Available in "My Bookmarks" section |
| Search          | Available                           | Available                           |
| Theme Switch    | Available                           | Available                           |
| Hotkey Help (?) | Shows folder bindings               | Shows bookmark bindings             |
