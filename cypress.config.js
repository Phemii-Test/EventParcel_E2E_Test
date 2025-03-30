const { defineConfig } = require("cypress");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");

async function setupNodeEvents(on, config) {

  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", browserify.default(config));

  return config;
}

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://event-parcel.vercel.app/",
    watchForFileChanges: false,
    defaultCommandTimeout: 40000,
    testIsolation: false,
    experimentalRunAllSpecs: true,
    // numTestsKeptInMemory: 0,
    chromeWebSecurity: false,
    
  
    env: {
      // "MAILSLURP_API_KEY":""
      MAILOSAUR_API_KEY: "Qt6ZbfcMu9NtSjXhpmp6cIgjv3bk5MCp",
      MAILOSAUR_SERVER_ID: "zbfbnq90",
      MAILOSAUR_SERVER_id: "7bzlaj8a",
   },
    setupNodeEvents(on, config) {
     
    },
    reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true
  }
  },
});
