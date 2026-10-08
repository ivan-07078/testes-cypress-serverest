const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://front.serverest.dev",
    specPattern: "cypress/e2e/**/*.cy.js",
    supportFile: "cypress/support/e2e.js",
  },
  reporter: "spec",
  screenshotOnRunFailure: true,
  screenshotsFolder: "cypress/screenshots",
});