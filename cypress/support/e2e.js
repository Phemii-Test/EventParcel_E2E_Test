// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import './custom-commands/signup_withemail.actions.cy'
import './custom-commands/signIn.actions.cy'
import './custom-commands/eventCreation.actions.cy'
import 'cypress-mailslurp'
import "cypress-mailosaur";
import '@faker-js/faker'
import 'cypress-file-upload';
before(() => {
    cy.visit('/')
    cy.clearLocalStorage();
    cy.reload();
    cy.on('uncaught:exception', () => {
      return false
    })
})

beforeEach(()=>{
cy.clearCookies();
})