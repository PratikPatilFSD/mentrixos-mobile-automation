/**
 * RolePage.js
 * Handles role selection after choosing institute.
 */

class RolePage {

  // ================= ELEMENTS =================

  /** Role screen root */
  get screen() {
    return element(by.id("role-screen"));
  }

  /** First role item */
  get firstRole() {
    return element(by.id("role-item")).atIndex(0);
  }

  // ================= ACTIONS =================

  /** Select first available role */
  async selectRole() {
    await this.firstRole.tap();
  }
}

module.exports = new RolePage();