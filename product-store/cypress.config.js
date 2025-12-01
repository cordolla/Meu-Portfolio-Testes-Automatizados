const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      this.baseUrl = 'https://www.demoblaze.com';
      this.specPattern = 'cypress/e2e/**/*.cy.js';
      this.supportFile = 'cypress/support/e2e.js';
    },
  },
});
