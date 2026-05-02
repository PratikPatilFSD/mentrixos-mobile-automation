/**
 * DashboardPage.js
 * Handles interactions on Dashboard screen after login + role selection.
 */

class DashboardPage {

  // ================= ELEMENTS =================

  /** Dashboard root screen */
  get screen() {
    return element(by.id("dashboard-screen"));
  }

  /** Header section */
  get header() {
    return element(by.id("dashboard-header"));
  }

  /** Logout button */
  get logoutBtn() {
    return element(by.id("logout-btn"));
  }

  // ================= ACTIONS =================

  /** Perform logout */
  async logout() {
    await this.logoutBtn.tap();
  }
}

module.exports = new DashboardPage();