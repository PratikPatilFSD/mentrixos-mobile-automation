/**
 * InstitutePage.js
 * Handles all interactions on Institute selection screen.
 */

class InstitutePage {

  // ================= ELEMENTS =================

  /** Institute screen root */
  get screen() {
    return element(by.id("institute-screen"));
  }

  /** Institute list container */
  get list() {
    return element(by.id("institute-list"));
  }

  /** Search input field */
  get searchInput() {
    return element(by.id("institute-search-input"));
  }

  /** First institute item */
  get firstItem() {
    return element(by.id("institute-item")).atIndex(0);
  }

  /** No results text */
  get noResultsText() {
    return element(by.id("no-results-text"));
  }

  // ================= ACTIONS =================

  /**
   * Search institute
   * @param {string} text
   */
  async search(text) {
    await this.searchInput.clearText();
    await this.searchInput.typeText(text);
  }

  /** Select first institute */
  async selectFirstInstitute() {
    await this.firstItem.tap();
  }
}

module.exports = new InstitutePage();