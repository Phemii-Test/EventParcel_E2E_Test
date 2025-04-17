/*import { faker } from "@faker-js/faker";


describe('test the otp feature',()=>{
let inboxId
let emailAdress
let emailBody
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
          cy.wait(15000);

    
          cy.mailosaurListMessages(Cypress.env('MAILOSAUR_SERVER_ID'), {
            sentTo: testEmail
          }).then((result) => {
            const latestMessage = result.items[0];
            return cy.mailosaurGetMessageById(latestMessage.id);
          })
            .then((email)=>{
            cy.log(email.html.body); 
            const parser = new DOMParser();
            const doc = parser.parseFromString(email.html.body, "text/html");
          
            const otpElement = doc.querySelector('.otp'); 
            const otp = otpElement ? otpElement.textContent.replace(/\D/g, "").trim() : null;
            cy.get('[id^="otp-"]').each(($el, index) => {
          cy.wrap($el).type(otp[index]); 
        });
          cy.get('[class="font-bold text-3xl"]').should("be.visible").and('have.text','Account created successfully');

        });
        });
      });
    
    /*
    
           it("validates that the proceed button is enabled when all info is filled", () => {
        cy.get(sel.getStartedButton)
        .should("be.visible")
        .and("have.text", "Get Started")
        .click();
      cy.get(sel.firstNameField).type("Tester");
      cy.get(sel.lastNameField).type("Test");
      cy.get(sel.mobilenumField).type(phoneNumber);
      cy.mailslurp().then(mailslurp => mailslurp.createInbox())
        .then(inbox => {
            inboxId = inbox.id
            emailAdress = inbox.emailAddress
            cy.get(sel.emailField).type(emailAdress);
         });
      cy.get(sel.passwordField).type(password);
      cy.get(sel.signupButton).click();

      cy.mailslurp().then(Email => Email.waitForLatestEmail(inboxId, 60000, true))
        .then(email => {
           const emailBody = email.body
            const extractor = new DOMParser()
            const doc = extractor.parseFromString(emailBody, "text/html")
            const otpText = doc.querySelector('body > p:nth-of-type(2)').textContent
            const otp = otpText.replace(/\D/g, '').trim();
            

      cy.get('#otp').each((el, index) => {
        cy.wrap(el).type(otp[index]); 
      });
        });
      // cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVER_ID'), {
      //   sentTo: testEmail, timeout: 30000,
      // }).then((email) => {
      //   cy.log(email.html.body); 
      //   const parser = new DOMParser();
      //   const doc = parser.parseFromString(email.html.body, "text/html");
      
      //   const otpElement = doc.querySelector('.otp'); 
      //   const otpCode = otpElement ? otpElement.textContent.trim().replace(/\./g, "") : null;
      //     otpCode.split('').forEach((digit, index) => {
          
          });
    //   cy.get(sel.OTPtext).should("be.visible");
   
    });
   */