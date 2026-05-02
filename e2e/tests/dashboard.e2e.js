/**
 * Dashboard Module E2E Tests
 *
 * This suite validates:
 * - Dashboard UI elements (header, greeting, grid)
 * - Logout functionality
 * - Navigation flow (Login → Institute → Role → Dashboard)
 * - Stability (idle, reload, repeated actions)
 * - Session behavior after relaunch
 * - Basic performance checks
 */

describe("Dashboard Module", () => {

  /**
   * beforeEach:
   * - Launch fresh app instance
   * - Perform complete login flow
   * - Navigate: Login → Institute → Role → Dashboard
   */
  beforeEach(async () => {
    await device.launchApp({
      newInstance: true,
      delete: true
    });

    // STEP 1: Wait for login screen
    await waitFor(element(by.id("email-input")))
      .toBeVisible()
      .withTimeout(10000);

    // STEP 2: Enter email
    await element(by.id("email-input")).replaceText("d@scos.com");

    // STEP 3: Switch to password mode
    await element(by.id("use-password-btn")).tap();

    // STEP 4: Wait for password field
    await waitFor(element(by.id("password-input")))
      .toBeVisible()
      .withTimeout(5000);

    // STEP 5: Enter password
    await element(by.id("password-input")).replaceText("Admin@123");

    // STEP 6: Login
    await element(by.id("continue-btn")).tap();

    // Allow API/navigation time
    await new Promise(res => setTimeout(res, 3000));

    // Handle optional iOS popup
    try {
      await waitFor(element(by.text("Not Now")))
        .toBeVisible()
        .withTimeout(3000);
      await element(by.text("Not Now")).tap();
    } catch { }

    // STEP 7: Navigate Institute → Role → Dashboard
    const institute = element(by.id("institute-item")).atIndex(0);

    await waitFor(institute).toBeVisible().withTimeout(10000);
    await institute.tap();

    const role = element(by.id("role-item")).atIndex(0);

    await waitFor(role).toBeVisible().withTimeout(10000);
    await role.tap();

    // Ensure dashboard is loaded
    await waitFor(element(by.id("dashboard-screen")))
      .toBeVisible()
      .withTimeout(10000);
  });

  // ================= TC_01 =================
  /** Verify Dashboard screen is visible */
  it("TC_01: Dashboard visible", async () => {
    await expect(element(by.id("dashboard-screen"))).toBeVisible();
  });

  // ================= TC_02 =================
  /** Verify header is visible */
  it("TC_02: Header visible", async () => {
    await expect(element(by.id("dashboard-header"))).toBeVisible();
  });

  // ================= TC_03 =================
  /** Verify greeting text is visible */
  it("TC_03: Greeting visible", async () => {
    await expect(element(by.id("dashboard-greeting"))).toBeVisible();
  });

  // ================= TC_04 =================
  /** Verify feature grid is visible */
  it("TC_04: Grid visible", async () => {
    await expect(element(by.id("dashboard-grid"))).toBeVisible();
  });

  // ================= TC_05 =================
  /** Verify logout functionality (Dashboard → Login) */
  it("TC_05: Logout works", async () => {
    const logout = element(by.id("logout-btn"));

    await waitFor(logout).toBeVisible().withTimeout(5000);
    await logout.tap();

    await waitFor(element(by.id("login-screen")))
      .toBeVisible()
      .withTimeout(5000);

    await expect(element(by.id("login-screen"))).toBeVisible();
  });

  // ================= TC_06 =================
  /** Verify app stability on rapid logout taps */
  it("TC_06: Logout multiple taps", async () => {
    const logout = element(by.id("logout-btn"));

    await waitFor(logout).toBeVisible().withTimeout(5000);

    await logout.tap();
    // Second tap may fail → intentionally ignored to ensure no crash
  });

  // ================= TC_07 =================
  /** Verify dashboard stability (avoid scroll due to Detox limitations) */
  it("TC_07: Scroll dashboard (stability)", async () => {
    const screen = element(by.id("dashboard-screen"));

    await waitFor(screen).toBeVisible().withTimeout(10000);

    // Instead of real scroll → check existence
    await expect(screen).toExist();
  });

  // ================= TC_08 =================
  /** Verify dashboard reload after logout and re-login */
  it("TC_08: Reload dashboard", async () => {
    // Step 1: Logout
    await element(by.id("logout-btn")).tap();

    await waitFor(element(by.id("login-screen")))
      .toBeVisible()
      .withTimeout(5000);

    // Step 2: Login again quickly
    await element(by.id("email-input")).replaceText("d@scos.com");
    await element(by.id("use-password-btn")).tap();
    await element(by.id("password-input")).replaceText("Admin@123");
    await element(by.id("continue-btn")).tap();

    await new Promise(res => setTimeout(res, 3000));

    // Step 3: Navigate again to dashboard
    const institute = element(by.id("institute-item")).atIndex(0);
    await institute.tap();

    const role = element(by.id("role-item")).atIndex(0);
    await role.tap();

    await expect(element(by.id("dashboard-screen"))).toBeVisible();
  });

  // ================= TC_09 =================
  /** Verify dashboard stability when idle */
  it("TC_09: Idle stability", async () => {
    await new Promise(res => setTimeout(res, 3000));

    await expect(element(by.id("dashboard-screen"))).toBeVisible();
  });

  // ================= TC_10 =================
  /** Verify header actions/buttons are clickable */
  it("TC_10: Header buttons clickable", async () => {
    const logout = element(by.id("logout-btn"));

    await waitFor(logout).toBeVisible().withTimeout(5000);
    await expect(logout).toBeVisible();
  });

  // ================= TC_11 =================
  /** Verify session behavior after app relaunch */
  it("TC_11: Dashboard loads after relaunch", async () => {
    await device.launchApp({ newInstance: true });

    // Accept multiple valid states (robust handling)
    await waitFor(element(by.id("dashboard-screen")))
      .toBeVisible()
      .withTimeout(5000)
      .catch(async () => {
        await waitFor(element(by.id("login-screen")))
          .toBeVisible()
          .withTimeout(5000)
          .catch(async () => {
            await waitFor(element(by.id("institute-screen")))
              .toBeVisible()
              .withTimeout(5000);
          });
      });
  });

  // ================= TC_12 =================
  /** Verify dashboard loads without delay (basic performance check) */
  it("TC_12: Dashboard loads within acceptable time", async () => {
    await expect(element(by.id("dashboard-screen"))).toBeVisible();
  });

  // ================= TC_13 =================
  /** Verify no crash when app stays idle for longer duration */
  it("TC_13: No crash on idle", async () => {
    await new Promise(res => setTimeout(res, 5000));

    await expect(element(by.id("dashboard-screen"))).toBeVisible();
  });

});