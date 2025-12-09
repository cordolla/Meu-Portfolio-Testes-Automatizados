const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.demoblaze.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',

    setupNodeEvents(on, config) {
      require('@cypress/grep/plugin').plugin(config);
      return config;
    },
  },
});