const { defineConfig } = require("cypress");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
// const MailosaurClient = require('mailosaur');


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
      "MAILSLURP_API_KEY":"",
      MAILOSAUR_API_KEY: "JblMaULHun6vbkBmZDEiVNQle6XXfzWr",
      MAILOSAUR_SERVER_ID: "tfs9ad1h",
      // MAILOSAUR_SERVER_id: "7bzlaj8a",
   },
    setupNodeEvents(on, config) {
      // const mailosaur = new MailosaurClient(config.env.MAILOSAUR_API_KEY);
      // on('task', {
      //   async getLatestMailosaurEmail({ serverId, sentTo }) {
      //     const message = await mailosaur.messages.get(serverId, { sentTo }, { timeout: 20000 });
      //     return message;
      //   }
      // });
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
