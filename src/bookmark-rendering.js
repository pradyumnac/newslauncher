/**
 * Bookmark Rendering Functions
 * Functions for generating HTML for bookmarks and folders
 */

/**
 * Render a bookmark item as HTML string
 * @param {Object} bookmark - The bookmark object
 * @param {string} bookmark.name - The bookmark name
 * @param {string} bookmark.url - The bookmark URL
 * @param {string} [bookmark.icon] - The Font Awesome icon class (optional)
 * @returns {string} HTML string for the bookmark item
 */
export function renderBookmarkItem(bookmark) {
  return `
    <div class="icon-link">
      <a target="_blank" href="${bookmark.url}">
        <i class="fa-solid ${bookmark.icon || "fa-link"}"></i> ${bookmark.name}
      </a>
    </div>
  `;
}

/**
 * Render a folder card as HTML string
 * @param {Object} folder - The folder object
 * @param {string} folder.id - The unique folder identifier
 * @param {string} folder.name - The folder name
 * @param {string} [folder.icon] - The Font Awesome icon class (optional)
 * @returns {string} HTML string for the folder card
 */
export function renderFolderCard(folder) {
  return `
    <section class="bookmark-group folder-card" data-folder-id="${folder.id}" aria-label="${folder.name}">
      <div class="folder-header">
        <i class="fa-solid ${folder.icon || "fa-folder"}"></i>
        <span class="folder-name">${folder.name}</span>
      </div>
    </section>
  `;
}

/**
 * Render the back button as HTML string
 * @returns {string} HTML string for the back button
 */
export function renderBackButton() {
  return `
    <section class="bookmark-group back-card" id="back-button" aria-label="Go Back">
      <div class="folder-header">
        <i class="fa-solid fa-arrow-left"></i>
        <span class="folder-name">Back</span>
      </div>
    </section>
  `;
}
