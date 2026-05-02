/**
 * Splash Module E2E Tests
 *
 * This suite validates the Splash screen behavior when the app launches.
 * It ensures that all critical UI elements are visible before navigation begins.
 */

describe("Splash Module", () => {

  /**
   * Runs before each test case
   * - Launches a fresh instance of the app
   * - Clears previous app state (important for consistent results)
   */
  beforeEach(async () => {
    await device.launchApp({
      newInstance: true, // ensures fresh app launch
      delete: true,      // clears app data (no cache/session)
    });
  });

  /**
   * TC_01: Verify Splash screen is visible on app launch
   * - Ensures the main splash container renders correctly
   */
  it("TC_01: Splash screen visible on app launch", async () => {
    await expect(element(by.id("splash-screen"))).toBeVisible();
  });

  /**
   * TC_02: Verify Logo is visible
   * - Ensures branding element is rendered on splash screen
   */
  it("TC_02: Logo is visible", async () => {
    await expect(element(by.id("splash-logo"))).toBeVisible();
  });

  /**
   * TC_03: Verify Loader is visible
   * - Ensures loading indicator is shown during app initialization
   */
  it("TC_03: Loader is visible", async () => {
    await expect(element(by.id("splash-loader"))).toBeVisible();
  });

});