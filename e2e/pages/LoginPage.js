/**
 * LoginPage.js
 * Page Object Model for Login Screen
 * Encapsulates all selectors and actions related to login flow.
 */

class LoginPage {

  // ================= ELEMENTS =================

  /** Root login screen */
  get screen() {
    return element(by.id("login-screen"));
  }

  /** Email / Mobile input field */
  get input() {
    return element(by.id("input-field")); // ensure testID exists in UI
  }

  /** Send Code button (OTP flow) */
  get sendCodeBtn() {
    return element(by.id("send-code-btn"));
  }

  /** Switch to password login */
  get usePasswordBtn() {
    return element(by.id("use-password-btn"));
  }

  /** Continue button (password/OTP submit) */
  get continueBtn() {
    return element(by.id("continue-btn"));
  }

  // ================= ACTIONS =================

  /**
   * Clears and enters value into input field
   * @param {string} value - email or mobile number
   */
  async enterValue(value) {
    await this.input.clearText();
    await this.input.typeText(value);
  }

  /** Tap on Send Code button */
  async tapSendCode() {
    await this.sendCodeBtn.tap();
  }

  /** Tap on Use Password button */
  async tapUsePassword() {
    await this.usePasswordBtn.tap();
  }

  /** Tap on Continue button */
  async tapContinue() {
    await this.continueBtn.tap();
  }
}

module.exports = new LoginPage();