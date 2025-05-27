import { faker } from "@faker-js/faker";
const phoneNumber = faker.helpers.replaceSymbols("80########");
let password = 'Hbon@1234'
let sel
const serverId='tfs9ad1h'
  
  
       beforeEach(()=>{
           cy.fixture('selectors').then((selectors)=>{
            sel=selectors
        })
       })


       //NEGATIVE SIGN UP WITH EMAIL
Cypress.Commands.add('noUsernameError', () => {
    cy.get(sel.getStartedButton).should('be.visible').and('have.text','Get Started').click();
          
          cy.get(sel.firstNameField).type('Test');
          cy.get(sel.lastNameField).type('Test');
           cy.get(sel.emailField).type('@gmail.com').then(() => {
            cy.get(sel.invalidEmailError).then(($emailError) => {
              if ($emailError.is(':visible')) {
                cy.wrap($emailError)
                  .should('have.text', 'Enter a valid email address');
              } else {
                throw new Error('Error message did not appear immediately after typing the wrong email.');
              }
            });
       });
 });

 Cypress.Commands.add('NoDomainError', () => {
    cy.get(sel.getStartedButton).should('be.visible').and('have.text','Get Started').click();
       cy.get(sel.firstNameField).type('Test');
        cy.get(sel.lastNameField).type('Test');
        cy.get(sel.emailField).type('Olufemi@').then(() => {
          cy.get(sel.invalidEmailError).then(($emailError) => {
            if ($emailError.is(':visible')) {
              cy.wrap($emailError)
                .should('have.text', 'Enter a valid email address');
            } else {
              throw new Error('Error message did not appear immediately after typing the wrong email.');
            }
          });
    })
 });

 Cypress.Commands.add('noSymbolError', () => {
    cy.get(sel.getStartedButton).should('be.visible').and('have.text','Get Started').click();
     cy.get(sel.firstNameField).type('Test');
      cy.get(sel.lastNameField).type('Test');
      cy.get(sel.emailField).type('olufemi.gmail.com').then(() => {
        cy.get(sel.invalidEmailError).then(($emailError) => {
          if ($emailError.is(':visible')) {
            cy.wrap($emailError)
              .should('have.text', 'Enter a valid email address');
          } else {
            throw new Error('Error message did not appear immediately after typing the wrong email.');
          }
        });
  })
 });

 Cypress.Commands.add('invalidMobileNumberError', () => {
    cy.get(sel.getStartedButton).should('be.visible').and('have.text','Get Started').click();
           cy.get(sel.firstNameField).type('Tester');
           cy.get(sel.lastNameField).type('Test');
           cy.get(sel.emailField).type('phemi.i.tester@gmail.com');
           cy.get(sel.mobilenumField).type('814090')
          cy.get(sel.invalidMobileNumberError).should('be.visible').and('have.text','Invalid phone number for selected country');
              
 });

 Cypress.Commands.add('noUpperCaseInPasswordError', () => {
    cy.get(sel.getStartedButton).should('be.visible').and('have.text','Get Started').click();
    cy.get(sel.firstNameField).type('Tester');
    cy.get(sel.lastNameField).type('Test');
    cy.get(sel.emailField).type('phemi.i.tester@gmail.com');
    cy.get(sel.mobilenumField).type('8140095998');
    cy.get(sel.passwordField).type('hbon@1234')  
     cy.get('#submit').should('be.disabled');
 
 });

 Cypress.Commands.add('noLowerCaseInPasswordError', () => {
    cy.get(sel.getStartedButton).should('be.visible').and('have.text','Get Started').click();
        cy.get(sel.firstNameField).type('Tester');
        cy.get(sel.lastNameField).type('Test');
        cy.get(sel.emailField).type('phemi.i.tester@gmail.com');
        cy.get(sel.mobilenumField).type('8140095998');
        cy.get(sel.passwordField).type('HBON@1234')
        cy.get('#submit').should('be.disabled');

 });

 Cypress.Commands.add('noSpecialcharacterInPasswordError', () => {
    cy.get(sel.getStartedButton).should('be.visible').and('have.text','Get Started').click();
      cy.get(sel.firstNameField).type('Tester');
      cy.get(sel.lastNameField).type('Test');
      cy.get(sel.emailField).type('phemi.i.tester@gmail.com');
      cy.get(sel.mobilenumField).type('8140095998');
      cy.get(sel.passwordField).type('Hbon1234')    
      cy.get('#submit').should('be.disabled');

 });

 Cypress.Commands.add('noNumberInPasswordError', () => {
    cy.get(sel.getStartedButton).should('be.visible').and('have.text','Get Started').click();
    cy.get(sel.firstNameField).type('Tester');
    cy.get(sel.lastNameField).type('Test');
    cy.get(sel.emailField).type('phemi.i.tester@gmail.com');
    cy.get(sel.mobilenumField).type('8140095998');
    cy.get(sel.passwordField).type('hbon@Hbon!!!')
    cy.get('#submit').should('be.disabled');
 });

 Cypress.Commands.add('passwordWithShortLengthError', () => {
    cy.get(sel.getStartedButton).should('be.visible').and('have.text','Get Started').click();
  cy.get(sel.firstNameField).type('Tester');
  cy.get(sel.lastNameField).type('Test');
  cy.get(sel.emailField).type('phemi.i.tester@gmail.com');
  cy.get(sel.mobilenumField).type('8140095998');
  cy.get(sel.passwordField).type('Hbon@1')     
  cy.get('#submit').should('be.disabled');

 });




   // POSITIVE SIGN-UP WITH EMAIL

 Cypress.Commands.add('displayAllRequiredFields', () => {
  cy.get(sel.getStartedButton)
  .should("be.visible")
  .and("have.text", "Get Started")
  .click();
//validate the required field
cy.get(sel.firstNameField).should("be.visible");
cy.get(sel.lastNameField).should("be.visible");
cy.get(sel.emailField).should("be.visible");
cy.get(sel.mobilenumField).should("be.visible");
cy.get(sel.passwordField).should("be.visible");
cy.get(sel.TandCtext).eq(0).should("be.visible");
 });

 Cypress.Commands.add('emptyFirstNameField', () => {
  cy.get(sel.getStartedButton)
  .should("be.visible")
  .and("have.text", "Get Started")
  .click();
cy.get(sel.lastNameField).type("Test");
cy.get(sel.emailField).type("phemi.i.tester@gmail.com");
cy.get(sel.mobilenumField).type("8140095998");
cy.get(sel.passwordField).type(password);
cy.get(sel.signupButton).then((button) => {
  if (Cypress.$(button).is(":disabled")) {
    cy.log("Test passed: Signup button is disabled");
  } else {
    throw new Error(
      "Test failed: Signup button should be disabled when required fields are not filled."
    );
  }
});
 });

 Cypress.Commands.add('emptyLastNameField', () => {
    //click the get started button
    cy.get(sel.getStartedButton)
      .should("be.visible")
      .and("have.text", "Get Started")
      .click();
    //validate the required field
    cy.get(sel.firstNameField).type("Tester");
    cy.get(sel.emailField).type("phemi.i.tester@gmail.com");
    cy.get(sel.mobilenumField).type("8140095998");
    cy.get(sel.passwordField).type(password);
    cy.get(sel.signupButton).then((button) => {
      if (Cypress.$(button).is(":disabled")) {
        cy.log("Test passed: Signup button is disabled");
      } else {
        throw new Error(
          "Test failed: Signup button should be disabled when required fields are not filled."
        );
      }
    });
 });

 Cypress.Commands.add('emptyEmailField', () => {
    //click the get started button
    cy.get(sel.getStartedButton)
      .should("be.visible")
      .and("have.text", "Get Started")
      .click();
    //validate the required field
    cy.get(sel.firstNameField).type("Tester");
    cy.get(sel.lastNameField).type("Test");
    cy.get(sel.mobilenumField).type("8140095998");
    cy.get(sel.passwordField).type(password);
    cy.get(sel.signupButton).then((button) => {
      if (Cypress.$(button).is(":disabled")) {
        cy.log("Test passed: Signup button is disabled");
      } else {
        throw new Error(
          "Test failed: Signup button should be disabled when required fields are not filled."
        );
      }
    });
 });

 Cypress.Commands.add('emptyMobileNumField', () => {
    //click the get started button
    cy.get(sel.getStartedButton)
      .should("be.visible")
      .and("have.text", "Get Started")
      .click();
    //validate the required field
    cy.get(sel.firstNameField).type("Tester");
    cy.get(sel.lastNameField).type("Test");
    cy.get(sel.emailField).type("phemi.i.tester@gmail.com");
    cy.get(sel.passwordField).type(password);
    cy.get(sel.signupButton).then((button) => {
      if (Cypress.$(button).is(":disabled")) {
        cy.log("Test passed: Signup button is disabled");
      } else {
        throw new Error(
          "Test failed: Signup button should be disabled when required fields are not filled."
        );
      }
    });
 });

 Cypress.Commands.add('emptyPasswordField', () => {
    //click the get started button
    cy.get(sel.getStartedButton)
      .should("be.visible")
      .and("have.text", "Get Started")
      .click();
    //validate the required field
    cy.get(sel.firstNameField).type("Tester");
    cy.get(sel.lastNameField).type("Test");
    cy.get(sel.emailField).type("phemi.i.tester@gmail.com");
    cy.get(sel.mobilenumField).type("8140095998");
    cy.get(sel.signupButton).then((button) => {
      if (Cypress.$(button).is(":disabled")) {
        cy.log("Test passed: Signup button is disabled");
      } else {
        throw new Error(
          "Test failed: Signup button should be disabled when required fields are not filled."
        );
      }
    });
 });

 Cypress.Commands.add('allSignupFieldFilled', () => {
    //click the get started button
    cy.get(sel.getStartedButton)
      .should("be.visible")
      .and("have.text", "Get Started")
      .click();
    cy.get(sel.firstNameField).type("Tester");
    cy.get(sel.lastNameField).type("Test");
    cy.get(sel.emailField).type("phemi.i.tester@gmail.com");
    cy.get(sel.mobilenumField).type("8140095998");
    cy.get(sel.passwordField).type(password);
    cy.get(sel.signupButton).then((button) => {
      if (Cypress.$(button).is(":enabled")) {
        cy.log("Test passed: Signup button is enabled");
      } else {
        throw new Error(
          "Test failed: Signup button should be enabled when all required field is filled"
        );
      }
    });
 });

 Cypress.Commands.add('successfulSignUpForm', () => {
    //click the get started button
    cy.get(sel.getStartedButton)
      .should("be.visible")
      .and("have.text", "Get Started")
      .click();
    cy.get(sel.firstNameField).type("Tester");
    cy.get(sel.lastNameField).type("Test");
    cy.get(sel.mobilenumField).type(phoneNumber);
    cy.get(sel.emailField).type(faker.internet.email());
    cy.get(sel.passwordField).type(password);
    cy.get(sel.signupButton).click();
    cy.get(sel.OTPtext).should("be.visible");
 });
Cypress.Commands.add('signUpWithOTP',()=>{
  const hostName = Math.random().toString(36).substring(2, 8);
  const TestEmail = `${hostName}@${serverId}.mailosaur.net`;
  cy.get(sel.getStartedButton)
            .should("be.visible")
            .and("have.text", "Get Started")
            .click();
          cy.get(sel.firstNameField).type("Tester");
          cy.get(sel.lastNameField).type("Test");
          cy.get(sel.mobilenumField).type(phoneNumber);
          cy.get(sel.emailField).type(TestEmail);
          cy.get(sel.passwordField).type(password);
          cy.get(sel.signupButton).click();
          cy.wait(20000);

    
          cy.mailosaurListMessages(Cypress.env('MAILOSAUR_SERVER_ID'), {
            sentTo: TestEmail
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
        cy.get(sel.signInEmailField).clear().type(TestEmail);
        cy.get(sel.signInPasswordField).type(password);
        cy.get(sel.loginButton).should('be.visible').click();
        });
});
 Cypress.Commands.add('signUpWithEmailVerificationLink',()=>{
  const userName = Math.random().toString(36).substring(2, 8);
  const testEmail = `${userName}@${serverId}.mailosaur.net`;
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
cy.wait(20000);


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
  const link = doc.querySelector('a').href; // Extract the href attribute

  // Visit the verification link
  cy.visit(link);   

  //  validate that email has been verified.
  cy.findByText('Your email address has been verified').should('be.visible');
  });
 })

 Cypress.Commands.add('signupWithUseddOTP', () => {
  //click the get started button
  cy.get(sel.getStartedButton)
    .should("be.visible")
    .and("have.text", "Get Started")
    .click();
  cy.get(sel.firstNameField).type("Tester");
  cy.get(sel.lastNameField).type("Test");
  cy.get(sel.mobilenumField).type(phoneNumber);
  cy.get(sel.emailField).type(faker.internet.email());
  cy.get(sel.passwordField).type(password);
  cy.get(sel.signupButton).click();
  cy.get(sel.OTPtext).should("be.visible");
  const otp = "413738"
            cy.get('[id^="otp-"]').each(($el, index) => {
          cy.wrap($el).type(otp[index]); 
            })
  cy.get(sel.invalidLoginToastRespons).should('be.visible').and('have.text','Invalid OTP. You have 2 attempts left.')
});