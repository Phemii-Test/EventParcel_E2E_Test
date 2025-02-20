import { faker } from "@faker-js/faker";
const phoneNumber = faker.helpers.replaceSymbols("80########");
let password = 'Hbon@1234'
let sel


  
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
           cy.get(sel.mobilenumField).type('8140').then(() => { 
            cy.get(sel.invalidMobileNumberError).then(($mobilNumError) => {
              if ($mobilNumError.is(':visible')) {
                cy.wrap($mobilNumError)
                  .should('Invalid phone number for selected country');
              } else {
                throw new Error('Error message did not appear when an invalid phone number length was entered.');
              }
            });
       })
 });

 Cypress.Commands.add('noUpperCaseInPasswordError', () => {
    cy.get(sel.getStartedButton).should('be.visible').and('have.text','Get Started').click();
    cy.get(sel.firstNameField).type('Tester');
    cy.get(sel.lastNameField).type('Test');
    cy.get(sel.emailField).type('phemi.i.tester@gmail.com');
    cy.get(sel.mobilenumField).type('8140095998');
    cy.get(sel.passwordField).type('hbon@1234').then(() => {  
     cy.get(sel.invalidPasswordError).then(($passwordError) => {
       if ($passwordError.is(':visible')) {
         cy.wrap($passwordError)
           .should('have.text', 'Password must contain uppercase, lowercase, number, and special character');
       } else {
         throw new Error('Error message did not appear when an invalid password was entered');
       }
     });

})
 });

 Cypress.Commands.add('noLowerCaseInPasswordError', () => {
    cy.get(sel.getStartedButton).should('be.visible').and('have.text','Get Started').click();
        cy.get(sel.firstNameField).type('Tester');
        cy.get(sel.lastNameField).type('Test');
        cy.get(sel.emailField).type('phemi.i.tester@gmail.com');
        cy.get(sel.mobilenumField).type('8140095998');
        cy.get(sel.passwordField).type('HBON@1234').then(() => {  
          cy.get(sel.invalidPasswordError).then(($passwordError) => {
            if ($passwordError.is(':visible')) {
              cy.wrap($passwordError)
                .should('have.text', 'Password must contain uppercase, lowercase, number, and special character');
            } else {
              throw new Error('Error message did not appear when an invalid password was entered');
            }
          });
    })
 });

 Cypress.Commands.add('noSpecialcharacterInPasswordError', () => {
    cy.get(sel.getStartedButton).should('be.visible').and('have.text','Get Started').click();
      cy.get(sel.firstNameField).type('Tester');
      cy.get(sel.lastNameField).type('Test');
      cy.get(sel.emailField).type('phemi.i.tester@gmail.com');
      cy.get(sel.mobilenumField).type('8140095998');
      cy.get(sel.passwordField).type('Hbon1234').then(() => {
        cy.get(sel.invalidPasswordError).then(($passwordError) => {
          if ($passwordError.is(':visible')) {
            cy.wrap($passwordError)
              .should('have.text', 'Password must contain uppercase, lowercase, number, and special character');
          } else {
            throw new Error('Error message did not appear when an invalid password was entered');
          }
        });
      })
 });

 Cypress.Commands.add('noNumberInPasswordError', () => {
    cy.get(sel.getStartedButton).should('be.visible').and('have.text','Get Started').click();
    cy.get(sel.firstNameField).type('Tester');
    cy.get(sel.lastNameField).type('Test');
    cy.get(sel.emailField).type('phemi.i.tester@gmail.com');
    cy.get(sel.mobilenumField).type('8140095998');
    cy.get(sel.passwordField).type('hbon@Hbon!!!').then(() => {
      cy.get(sel.invalidPasswordError).then(($passwordError) => {
        if ($passwordError.is(':visible')) {
          cy.wrap($passwordError)
            .should('have.text', 'Password must contain uppercase, lowercase, number, and special character');
        } else {
          throw new Error('Error message did not appear when an invalid password was entered');
        }
      });
    })
 });

 Cypress.Commands.add('passwordWithShortLengthError', () => {
    cy.get(sel.getStartedButton).should('be.visible').and('have.text','Get Started').click();
  cy.get(sel.firstNameField).type('Tester');
  cy.get(sel.lastNameField).type('Test');
  cy.get(sel.emailField).type('phemi.i.tester@gmail.com');
  cy.get(sel.mobilenumField).type('8140095998');
  cy.get(sel.passwordField).type('Hbon@1').then(() => {
    cy.get(sel.invalidPasswordError).then(($passwordError) => {
      if ($passwordError.is(':visible')) {
        cy.wrap($passwordError)
          .should('have.text', 'Password must be 8 character long');
      } else {
        throw new Error('Error message did not appear when an invalid password was entered');
      }
    });
})
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

 