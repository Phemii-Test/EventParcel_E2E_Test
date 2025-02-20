import { faker } from "@faker-js/faker";


describe('test the otp feature',()=>{
    const phoneNumber = faker.helpers.replaceSymbols("80########");
    let password = 'Hbon@1234'
    let sel
    const serverId='zbfbnq90'
    const userName = Math.random().toString(36).substring(2, 8);
    const testEmail = `${userName}@${serverId}.mailosaur.net`;
      
           beforeEach(()=>{
               cy.fixture('selectors').then((selectors)=>{
                sel=selectors
            })
           })
    it("validates that the proceed button is enabled when all info is filled", () => {
        cy.get(sel.getStartedButton)
        .should("be.visible")
        .and("have.text", "Get Started")
        .click();
      cy.get(sel.firstNameField).type("Tester");
      cy.get(sel.lastNameField).type("Test");
      cy.get(sel.mobilenumField).type(phoneNumber);
      cy.get(sel.emailField).type(testEmail);
      cy.get(sel.passwordField).type(password);
      cy.get(sel.signupButton).click();

      cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVER_ID'), {
        sentTo: testEmail, timeout: 30000,
      }).then((email) => {
        cy.log(email.html.body); 
        const parser = new DOMParser();
        const doc = parser.parseFromString(email.html.body, "text/html");
      
        const otpElement = doc.querySelector('.otp'); 
        const otpCode = otpElement ? otpElement.textContent.trim().replace(/\./g, "") : null;
          otpCode.split('').forEach((digit, index) => {
            cy.get(`#otp${index + 1}`).type(digit);
          });
    //   cy.get(sel.OTPtext).should("be.visible");
   
    });
    });

});
