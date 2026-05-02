// Exporting Jest configuration for Detox end-to-end (E2E) testing
module.exports = {
  
  // Maximum time (in milliseconds) a single test can run before timing out
  // 120000 ms = 2 minutes
  testTimeout: 120000,

  // Pattern to locate test files
  // This will run all files ending with `.e2e.js` inside the /tests folder (and subfolders)
  testMatch: ["**/tests/**/*.e2e.js"],

  // Specifies the test environment provided by Detox for mobile app testing
  // This sets up the environment required to run React Native E2E tests
  testEnvironment: "detox/runners/jest/testEnvironment",

  // Enables detailed output in the console
  // Shows individual test results for better debugging and readability
  verbose: true,
};