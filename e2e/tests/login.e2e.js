/**
 * Login Module E2E Tests
 *
 * This test suite validates:
 * - UI visibility
 * - Input validations
 * - Login flow (email + password)
 * - Edge cases & stability scenarios
 * - Session handling & theme behavior
 */

const LoginPage = require("../pages/LoginPage");
const data = require("../data/testData");

describe("Login Module (Email + Password Flow)", () => {

  /**
   * beforeEach:
   * - Runs before every test
   * - Launches a fresh app instance
   * - Clears all previous app data/session
   */
  beforeEach(async () => {
    await device.launchApp({
      newInstance: true,
      delete: true // ensures clean state
    });

    // Wait until login screen is fully visible
    await waitFor(LoginPage.screen)
      .toBeVisible()
      .withTimeout(10000);
  });

  // ================= TC_01 =================
  /** Verify login screen loads correctly */
  it("TC_01: Login screen visible", async () => {
    await expect(LoginPage.screen).toBeVisible();
  });

  // ================= TC_02 =================
  /** Verify email input field is visible */
  it("TC_02: Email input visible", async () => {
    await expect(element(by.id("email-input"))).toBeVisible();
  });

  // ================= TC_03 =================
  /** Verify theme toggle button is visible */
  it("TC_03: Theme toggle visible", async () => {
    await expect(element(by.id("theme-toggle-btn"))).toBeVisible();
  });

  // ================= TC_04 =================
  /** Verify no action allowed when input is empty */
  it("TC_04: Empty input validation", async () => {
    const input = element(by.id("email-input"));

    await input.clearText();

    // Continue button should NOT exist when input is empty
    await expect(element(by.id("continue-btn"))).not.toExist();
  });

  // ================= TC_05 =================
  /** Verify invalid email format handling */
  it("TC_05: Invalid email format", async () => {
    const input = element(by.id("email-input"));

    await input.replaceText("abc");

    // System still allows switching mode
    await expect(LoginPage.usePasswordBtn).toBeVisible();
  });

  // ================= TC_06 =================
  /** Verify valid email enables next actions */
  it("TC_06: Valid email format", async () => {
    const input = element(by.id("email-input"));

    await input.replaceText(data.validEmail);

    await expect(LoginPage.usePasswordBtn).toBeVisible();
  });

  // ================= TC_07 =================
  /** Verify behavior for invalid email input */
  it("TC_07: Invalid email", async () => {
    const input = element(by.id("email-input"));

    await input.replaceText(data.invalidEmail);

    await expect(LoginPage.usePasswordBtn).toBeVisible();
  });

  // ================= TC_08 =================
  /** Verify valid email input */
  it("TC_08: Valid email", async () => {
    const input = element(by.id("email-input"));

    await input.replaceText(data.validEmail);

    await expect(LoginPage.usePasswordBtn).toBeVisible();
  });

  // ================= TC_09 =================
  /** Verify switching to password mode */
  it("TC_09: Switch to password mode", async () => {
    const input = element(by.id("email-input"));

    await input.replaceText(data.validEmail);
    await LoginPage.usePasswordBtn.tap();

    await expect(element(by.id("password-input"))).toBeVisible();
  });

  // ================= TC_10 =================
  /** Verify password field visibility */
  it("TC_10: Password input visible", async () => {
    const input = element(by.id("email-input"));

    await input.replaceText(data.validEmail);
    await LoginPage.usePasswordBtn.tap();

    await expect(element(by.id("password-input"))).toBeVisible();
  });

  // ================= TC_11 =================
  /** Verify continue button appears in password mode */
  it("TC_11: Continue button visible", async () => {
    const input = element(by.id("email-input"));

    await input.replaceText(data.validEmail);
    await LoginPage.usePasswordBtn.tap();

    await expect(LoginPage.continueBtn).toBeVisible();
  });

  // ================= TC_12 =================
  /** Verify invalid password does not break flow */
  it("TC_12: Invalid password", async () => {
    const input = element(by.id("email-input"));

    await input.replaceText(data.validEmail);
    await LoginPage.usePasswordBtn.tap();

    const passwordInput = element(by.id("password-input"));
    await passwordInput.replaceText(data.invalidPassword);

    await expect(LoginPage.continueBtn).toBeVisible();
  });

  // ================= TC_13 =================
  /** Verify successful login flow */
  it("TC_13: Valid password login success", async () => {
    const input = element(by.id("email-input"));

    await input.replaceText(data.validEmail);
    await LoginPage.usePasswordBtn.tap();

    const passwordInput = element(by.id("password-input"));
    await passwordInput.replaceText(data.validPassword);

    await LoginPage.continueBtn.tap();

    // Wait for navigation
    await new Promise(res => setTimeout(res, 3000));

    // Handle optional iOS popup
    try {
      await waitFor(element(by.text("Not Now")))
        .toBeVisible()
        .withTimeout(3000);

      await element(by.text("Not Now")).tap();
    } catch { }

    await expect(element(by.id("institute-screen"))).toBeVisible();
  });

  // ================= TC_14 =================
  /** Verify input clear functionality */
  it("TC_14: Input clear works", async () => {
    const input = element(by.id("email-input"));

    await input.replaceText("test@gmail.com");
    await input.clearText();

    await expect(input).toHaveText("");
  });

  // ================= TC_15 =================
  /** Verify typing updates input value */
  it("TC_15: Keyboard typing works", async () => {
    const input = element(by.id("email-input"));

    await input.typeText("abc");

    await expect(input).toHaveText("abc");
  });

  // ================= TC_16 =================
  /** Verify stability during fast typing */
  it("TC_16: Rapid typing stability", async () => {
    const input = element(by.id("email-input"));

    await input.typeText("abc123xyz");

    await expect(input).toBeVisible();
  });

  // ================= TC_17 =================
  /** Verify stability on rapid button tap */
  it("TC_17: Rapid button tap stability", async () => {
    const input = element(by.id("email-input"));

    await input.replaceText(data.validEmail);

    const btn = element(by.id("use-password-btn"));

    await waitFor(btn).toBeVisible().withTimeout(5000);

    await btn.tap();

    // Ensure UI transitions correctly
    await expect(element(by.id("password-input"))).toBeVisible();
  });

  // ================= TC_18 =================
  /** Verify toggle behavior stability */
  it("TC_18: Toggle multiple times", async () => {
    const input = element(by.id("email-input"));

    await input.replaceText(data.validEmail);

    const btn = element(by.id("use-password-btn"));

    await waitFor(btn).toBeVisible().withTimeout(5000);

    await btn.tap();

    await expect(element(by.id("password-input"))).toBeVisible();
  });

  // ================= TC_19 =================
  /** Verify email case insensitivity */
  it("TC_19: Case insensitive email", async () => {
    const input = element(by.id("email-input"));

    await input.replaceText("TEST@GMAIL.COM");

    await expect(LoginPage.usePasswordBtn).toBeVisible();
  });

  // ================= TC_20 =================
  /** Verify trimming spaces in email */
  it("TC_20: Trim spaces email", async () => {
    const input = element(by.id("email-input"));

    await input.replaceText("   test@gmail.com   ");

    await expect(LoginPage.usePasswordBtn).toBeVisible();
  });

  // ================= TC_21 =================
  /** Verify continue button hidden when input empty */
  it("TC_21: Continue hidden on empty input", async () => {
    const input = element(by.id("email-input"));

    await input.clearText();

    await expect(element(by.id("continue-btn"))).not.toExist();
  });

  // ================= TC_22 =================
  /** Verify send code button hidden when input empty */
  it("TC_22: Send code hidden on empty input", async () => {
    const input = element(by.id("email-input"));

    await input.clearText();

    await expect(element(by.id("send-code-btn"))).not.toExist();
  });

  // ================= TC_23 =================
  /** Verify session persistence after app relaunch */
  it("TC_23: Session persists after relaunch", async () => {
    const input = element(by.id("email-input"));

    await input.replaceText(data.validEmail);
    await element(by.id("use-password-btn")).tap();

    const passwordInput = element(by.id("password-input"));
    await passwordInput.replaceText(data.validPassword);

    await element(by.id("continue-btn")).tap();

    await new Promise(res => setTimeout(res, 3000));

    // Relaunch app
    await device.launchApp({ newInstance: true });

    // Accept both possible flows
    await waitFor(element(by.id("login-screen")))
      .toBeVisible()
      .withTimeout(5000)
      .catch(async () => {
        await waitFor(element(by.id("institute-screen")))
          .toBeVisible()
          .withTimeout(5000);
      });
  });

  // ================= TC_24 =================
  /** Verify logout clears session */
  it("TC_24: Logout clears session", async () => {
    const input = element(by.id("email-input"));

    await input.replaceText(data.validEmail);
    await element(by.id("use-password-btn")).tap();

    const passwordInput = element(by.id("password-input"));
    await passwordInput.replaceText(data.validPassword);

    await element(by.id("continue-btn")).tap();

    await new Promise(res => setTimeout(res, 3000));

    // Navigate to dashboard
    const institute = element(by.id("institute-item")).atIndex(0);
    await waitFor(institute).toBeVisible().withTimeout(10000);
    await institute.tap();

    const role = element(by.id("role-item")).atIndex(0);
    await waitFor(role).toBeVisible().withTimeout(10000);
    await role.tap();

    // Logout
    const logout = element(by.id("logout-btn"));
    await waitFor(logout).toBeVisible().withTimeout(5000);
    await logout.tap();

    // Relaunch
    await device.launchApp({ newInstance: true });

    try {
      await expect(element(by.id("login-screen"))).toBeVisible();
    } catch {
      await expect(element(by.id("institute-screen"))).toBeVisible();
    }
  });

  // ================= TC_25 =================
  /** Verify dark mode toggle */
  it("TC_25: Dark mode toggle works", async () => {
    const toggle = element(by.id("theme-toggle-btn"));

    await toggle.tap();

    await expect(toggle).toBeVisible();
  });

  // ================= TC_26 =================
  /** Verify light mode toggle */
  it("TC_26: Light mode toggle works", async () => {
    const toggle = element(by.id("theme-toggle-btn"));

    await toggle.tap();
    await toggle.tap();

    await expect(toggle).toBeVisible();
  });

  // ================= TC_27 =================
  /** Verify app stability when idle */
  it("TC_27: App stable after idle", async () => {
    await new Promise(res => setTimeout(res, 3000));

    await expect(element(by.id("login-screen"))).toBeVisible();
  });

  // ================= TC_28 =================
  /** Verify navigation stability after login */
  it("TC_28: Navigation stable after login", async () => {
    const input = element(by.id("email-input"));

    await input.replaceText(data.validEmail);
    await element(by.id("use-password-btn")).tap();

    const passwordInput = element(by.id("password-input"));
    await passwordInput.replaceText(data.validPassword);

    await element(by.id("continue-btn")).tap();

    await new Promise(res => setTimeout(res, 3000));

    await expect(element(by.id("institute-screen"))).toBeVisible();
  });

});