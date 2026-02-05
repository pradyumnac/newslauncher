/**
 * Bookmark Utility Functions
 * Pure functions for bookmark operations
 */

/**
 * Escape HTML special characters to prevent XSS
 * @param {string} unsafe - The string to escape
 * @returns {string} The escaped string
 */
export function escapeHtml(unsafe) {
  return unsafe.replace(/[&<"']/g, function (m) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      '"': "&quot;",
      "'": "&#039;",
    }[m];
  });
}

/**
 * Generate a 2-character keybinding sequence from a name
 * @param {string} name - The name to generate keybinding from
 * @param {Set} usedCombos - Set of already used key combinations
 * @returns {string|null} The 2-character keybinding or null if none available
 */
export function generateKeySeq(name, usedCombos) {
  const label = name.trim().toLowerCase().replace(/\s+/g, "");
  for (let i = 0; i < label.length - 1; i++) {
    const pair = label[i] + label[i + 1];
    if (/^[a-z0-9]{2}$/.test(pair) && !usedCombos.has(pair)) {
      usedCombos.add(pair);
      return pair;
    }
  }
  return null;
}
