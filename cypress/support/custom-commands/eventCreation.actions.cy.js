import { faker } from "@faker-js/faker";
const phoneNumber = faker.helpers.replaceSymbols("80########");
let password = "Hbon@1234";
let sel;
const serverId = "zbfbnq90";
const userName = Math.random().toString(36).substring(2, 8);
const testEmail = `${userName}@${serverId}.mailosaur.net`;

beforeEach(() => {
  cy.fixture("selectors").then((selectors) => {
    sel = selectors;
  });
});

Cypress.Commands.add("createEventSuccessfully", () => {
  cy.get(sel.eventCreationButton).click();
  cy.get(sel.createNewEventBtn).click();
  cy.get(sel.eventName).type("OlaOluwa2024");
  cy.get(sel.attachFile).attachFile("validImage.png");
  cy.get(sel.eventDescription).type(
    "We cordially invite you to our glorious wedding."
  );
  cy.get(sel.eventDate).click();
  cy.get(sel.calendarForwardButton).click();
  cy.get(sel.datePicker).click();
  cy.get(sel.eventTime).clear().type("03:45 PM");
  cy.get(sel.eventLocation).type("40, Bahamas Lane, Idi-roko");
  cy.get(sel.numberOfGroups).eq(1).type("4");
  cy.findByText('Continue').click();
});

Cypress.Commands.add("addNairaGroupSuccessfully", () => {
  cy.get(sel.continueToGroupButton).click();
  cy.get(sel.groupName).type("Aso Ebi");
  cy.get(sel.groupDescription).type("These are my very own Aso Ebi friends");
  // select Naira currency
  cy.get(sel.currencyDropdown).click();
  cy.get(sel.secondNairaOption).click();
  cy.get(sel.mainContinueButton).click();
});

Cypress.Commands.add("addDollarGroupSuccessfully", () => {
  cy.get(sel.continueToGroupButton).click();
  cy.get(sel.groupName).type("Aso Ebi");
  cy.get(sel.groupDescription).type("These are my very own Aso Ebi friends");
  // select Naira currency
  cy.get(sel.currencyDropdown).click();
  cy.get(sel.secondDollarOption).click();
  cy.get(sel.mainContinueButton).click();
});

Cypress.Commands.add("itAddDollarAndNairaGroupSuccesfully", () => {
  cy.get(sel.continueToGroupButton).click();
  cy.get(sel.groupName).type("Aso Ebi");
  cy.get(sel.groupDescription).type("These are my very own Aso Ebi friends");
  // select Naira currency
  cy.get(sel.currencyDropdown).click();
  cy.get(sel.secondNairaOption).click();
  cy.get(sel.mainContinueButton).click();

  cy.get(sel.createPackage).click();
  cy.get(sel.attachFile).attachFile("validImage.png");
  cy.get(sel.packageName).type("Fila");
  cy.get(sel.packageDescription).type("Gele for my special ladies");
  cy.get(sel.packagePrice).type("5000");
  cy.get(sel.packageQuantity).type("15");
  // select pickup
  cy.get(sel.pickupOption).click();
  cy.get(sel.selectBoxDropdown).click();
  cy.findByText('Medium Box').click();
  cy.findAllByRole('button', { name: 'Create Package' }).last().click({force:true});

  cy.get(sel.addNew).click();
  cy.get(sel.groupName).type("My Cool Guys");
  cy.get(sel.groupDescription).type("These are for my cool guys");
  // select dollar currency
  cy.get(sel.currencyDropdown).click();
  cy.get(sel.secondDollarOption).click();
  // toggle General button
  cy.get(sel.generalOption).click();
  cy.get(sel.mainContinueButton).click();

  // Add package
  cy.get(sel.createPackage).click();
  cy.get(sel.attachFile).attachFile("validImage.png");
  cy.get(sel.attachFile).attachFile("image2.png");
  cy.get(sel.attachFile).attachFile("image3.png");
  cy.get(sel.attachFile).attachFile("image4.png");
  cy.get(sel.packageName).type("Fila");
  cy.get(sel.packageDescription).type("For gentle men");
  cy.get(sel.packagePrice).type("100");
  cy.get(sel.packageQuantity).type("10");
  // select Platform delivery
  cy.get(sel.homeDeliveryOption).click();
  cy.get(sel.platformDeliveryOption).click();
  cy.wait(3000);
  cy.get(sel.selectBoxDropdown).click();
  cy.findByText('Medium Box').click();
  cy.findAllByRole('button', { name: 'Create Package' }).last().click({force:true});
});

Cypress.Commands.add("addPickupPackageSuccessfully", () => {
  cy.get(sel.createPackage).click();
  cy.get(sel.attachFile).attachFile("validImage.png");
  cy.get(sel.packageName).type("Fila");
  cy.get(sel.packageDescription).type("Gele for my special ladies");
  cy.get(sel.packagePrice).type("5000");
  cy.get(sel.packageQuantity).type("15");
  // select pickup
  cy.get(sel.pickupOption).click();
  cy.get(sel.pickupOption).click();
    cy.get(sel.selectBoxDropdown).click();
    cy.findByText('Medium Box').click();
    cy.findAllByRole('button', { name: 'Create Package' }).last().click({force:true});
});

Cypress.Commands.add("addDollarPaymentDetails", () => {
  cy.get(sel.continue).click();
  // fill payout details.
  cy.get(sel.accountNumberField).type("4437266529");
  cy.get(sel.accountNameField).type("Olufemi Tester");
  cy.get(sel.USbankOptions).click();
  // select equitable bank
  cy.findByText('Equitable Bank').click();
  cy.get(sel.routingNumberField).type("304971932");

  // set payment deadline
  cy.get(sel.paymentDeadlineHeader)
    .should("be.visible")
    .and("have.text", "Payment Deadline");
  cy.get(sel.paymentDeadlineDescription)
    .should("be.visible")
    .and("have.text", "Select the payment deadline date and time");
  cy.get(sel.paymentDeadlineDate).click();
  cy.get(sel.calendarForwardButton).click();
  cy.get(sel.paymentDate).click();
  cy.get(sel.mainContinueButton).click();
});

Cypress.Commands.add("addPlatformDeliveryPackageSuccessfully", () => {
  cy.get(sel.createPackage).click();
  cy.get(sel.attachFile).attachFile("validImage.png");
  cy.get(sel.packageName).type("Fila");
  cy.get(sel.packageDescription).type("Gele for my special ladies");
  cy.get(sel.packagePrice).type("5000");
  cy.get(sel.packageQuantity).type("15");
  // select pickup
  cy.get(sel.homeDeliveryOption).click();
  cy.get(sel.platformDeliveryOption).click();
  cy.get(sel.pickupOption).click();
    cy.get(sel.selectBoxDropdown).click();
    cy.findByText('Medium Box').click();
    cy.findAllByRole('button', { name: 'Create Package' }).last().click({force:true});
});

Cypress.Commands.add("addSelfDeliveryPackageSuccessfully", () => {
  cy.get(sel.createPackage).click();
  cy.get(sel.attachFile).attachFile("validImage.png");
  cy.get(sel.packageName).type("Fila");
  cy.get(sel.packageDescription).type("Gele for my special ladies");
  cy.get(sel.packagePrice).type("5000");
  cy.get(sel.packageQuantity).type("15");
  // select pickup
  cy.get(sel.homeDeliveryOption).click();
  cy.get(sel.selfManagedDeliveryOption).click();
    cy.get(sel.selectBoxDropdown).click();
    cy.findByText('Medium Box').click();
    cy.findAllByRole('button', { name: 'Create Package' }).last().click({force:true});
});

Cypress.Commands.add("addCohostSuccessfully", () => {
  cy.get(sel.addCohostOption).click();
  cy.get(sel.cohostFirstName).type("Ola");
  cy.get(sel.cohostLastName).type("Aina");
  cy.get(sel.cohostEmail).type(testEmail);
  cy.get(sel.addCohost).click();
  cy.get(sel.ContinueButton).click();
  cy.wait(5000);
});

Cypress.Commands.add("verifyHostEmail", () => {
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
  cy.wait(15000);

  cy.mailosaurListMessages(Cypress.env("MAILOSAUR_SERVER_ID"), {
    sentTo: TestEmail,
  })
    .then((result) => {
      const latestMessage = result.items[0];
      return cy.mailosaurGetMessageById(latestMessage.id);
    })
    .then((email) => {
      cy.log(email.html.body);
      const parser = new DOMParser();
      const doc = parser.parseFromString(email.html.body, "text/html");

      const otpElement = doc.querySelector(".otp");
      const otp = otpElement
        ? otpElement.textContent.replace(/\D/g, "").trim()
        : null;
      cy.get('[id^="otp-"]').each(($el, index) => {
        cy.wrap($el).type(otp[index]);
      });
      cy.get('[class="font-bold text-3xl"]')
        .should("be.visible")
        .and("have.text", "Account created successfully");
      cy.get(sel.signInEmailField).clear().type(TestEmail);
      cy.get(sel.signInPasswordField).type(password);
      cy.get(sel.loginButton).should("be.visible").click();
    })
    .then(() => {
      cy.get(sel.eventCreationButton).click();
      cy.get(sel.createFirstEvent).click();
      cy.get(sel.eventName).type("OlaOluwa2024");
      cy.get(sel.attachFile).attachFile("validImage.png");
      cy.get(sel.eventDescription).type(
        "We cordially invite you to our glorious wedding."
      );
      cy.get(sel.eventDate).click();
      cy.get(sel.calendarForwardButton).click();
      cy.get(sel.datePicker).click();
      cy.get(sel.eventTime).clear().type("03:45 PM");
      cy.get(sel.eventLocation).type("40, Bahamas Lane, Idi-roko");
      cy.get(sel.numberOfGroups).eq(1).type("4");
      cy.get(sel.createEventButton).click();
      cy.get(sel.addCohostOption).click();
      cy.get(sel.cohostFirstName).type("Ola");
      cy.get(sel.cohostLastName).type("Aina");
      cy.get(sel.cohostEmail).type(testEmail);
      cy.get(sel.addCohost).click();
      cy.get(sel.ContinueButton).click();
      cy.wait(5000);
      cy.mailosaurListMessages(Cypress.env("MAILOSAUR_SERVER_ID"), {
        sentTo: testEmail,
      })
        .then((result) => {
          const latestMessage = result.items[0];
          return cy.mailosaurGetMessageById(latestMessage.id);
        })
        .then((email) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(email.html.body, "text/html");
          const acceptLink = Array.from(doc.querySelectorAll("a")).find((a) =>
            a.textContent.includes("Accept Invitation")
          );
          cy.visit(acceptLink.href);
          // }).then(()=>{
          cy.wait(5000);
          cy.mailosaurListMessages(Cypress.env("MAILOSAUR_SERVER_ID"), {
            sentTo: TestEmail,
          })
            .then((result) => {
              const latestMessage = result.items[0];
              return cy.mailosaurGetMessageById(latestMessage.id);
            })
            .then((email) => {
              cy.get(email.html.body);
              expect(email.subject).to.equal("Olaoluwa2024 CoHost Invitation");
              expect(email.from[0].name).to.equal("Event Parcel Team");
              expect(email.from[0].email).to.equal("noreply@eventparcel.com");
              const div = document.createElement("div");
              div.innerHTML = email.html.body;
              const plainText = div.innerText;

              // Assert content in plain text
              expect(plainText).to.include("Dear Tester Test,");
              expect(plainText).to.include(
                'This is to inform you that Ola Aina has accepted your invite to collaborate with you on "Olaoluwa2024" on Event Parcel.'
              );
              expect(plainText).to.include("Regards.");
            });
        });
    });
});

Cypress.Commands.add("verifySecondHostEmail", () => {
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
  cy.wait(15000);

  cy.mailosaurListMessages(Cypress.env("MAILOSAUR_SERVER_ID"), {
    sentTo: TestEmail,
  })
    .then((result) => {
      const latestMessage = result.items[0];
      return cy.mailosaurGetMessageById(latestMessage.id);
    })
    .then((email) => {
      cy.log(email.html.body);
      const parser = new DOMParser();
      const doc = parser.parseFromString(email.html.body, "text/html");

      const otpElement = doc.querySelector(".otp");
      const otp = otpElement
        ? otpElement.textContent.replace(/\D/g, "").trim()
        : null;
      cy.get('[id^="otp-"]').each(($el, index) => {
        cy.wrap($el).type(otp[index]);
      });
      cy.get(sel.signInEmailField).clear().type(TestEmail);
      cy.get(sel.signInPasswordField).type(password);
      cy.get(sel.loginButton).should("be.visible").click();
      cy.get(sel.eventCreationButton).click();
      cy.get(sel.createFirstEvent).click();
      cy.get(sel.eventName).type("OlaOluwa2024");
      cy.get(sel.attachFile).attachFile("validImage.png");
      cy.get(sel.eventDescription).type(
        "We cordially invite you to our glorious wedding."
      );
      cy.get(sel.eventDate).click();
      cy.get(sel.calendarForwardButton).click();
      cy.get(sel.datePicker).click();
      cy.get(sel.eventTime).clear().type("03:45 PM");
      cy.get(sel.eventLocation).type("40, Bahamas Lane, Idi-roko");
      cy.get(sel.numberOfGroups).eq(1).type("4");
      cy.get(sel.createEventButton).click();
      cy.get(sel.addCohostOption).click();
      cy.get(sel.cohostFirstName).type("Ola");
      cy.get(sel.cohostLastName).type("Aina");
      cy.get(sel.cohostEmail).type(testEmail);
      cy.get(sel.addCohost).click();
      cy.get(sel.ContinueButton).click();
      cy.wait(5000);
      cy.mailosaurListMessages(Cypress.env("MAILOSAUR_SERVER_ID"), {
        sentTo: testEmail,
      })
        .then((result) => {
          const latestMessage = result.items[0];
          return cy.mailosaurGetMessageById(latestMessage.id);
        })
        .then((email) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(email.html.body, "text/html");
          const declineLink = Array.from(doc.querySelectorAll("a")).find((a) =>
            a.textContent.includes("Decline Invitation")
          );
          cy.visit(declineLink.href);
          cy.wait(5000);
          cy.mailosaurListMessages(Cypress.env("MAILOSAUR_SERVER_ID"), {
            sentTo: TestEmail,
          })
            .then((result) => {
              const latestMessage = result.items[0];
              return cy.mailosaurGetMessageById(latestMessage.id);
            })
            .then((email) => {
              cy.get(email.html.body);
              expect(email.subject).to.equal("Olaoluwa2024 CoHost Invitation");
              expect(email.from[0].name).to.equal("Event Parcel Team");
              expect(email.from[0].email).to.equal("noreply@eventparcel.com");
              const div = document.createElement("div");
              div.innerHTML = email.html.body;
              const plainText = div.innerText;

              // Assert content in plain text
              expect(plainText).to.include("Dear Tester Test,");
              expect(plainText).to.include(
                'This is to inform you that, Ola Aina has declined your invite to collaborate with you on "Olaoluwa2024" on Event Parcel.'
              );
              expect(plainText).to.include("Regards.");
            });
        });
    });
});
Cypress.Commands.add("addPickupDetails",()=>{
  cy.get(sel.deliveryHeader).should('be.visible').and ('have.text','Pickup Details');
    cy.get(sel.deliveryDescription).should('be.visible').and ('have.text','Add pickup contact details and when you want to start the delivery');
    cy.get(sel.contactName).type('Olayemi Ibijoke');
    cy.findByPlaceholderText('Enter phone number').type('8140095998');
    cy.get(sel.pickupLocation).type('6, Jonathan Gimba Lane, Lagos.');
    cy.get(sel.deliveryDate).click();
    cy.get(sel.calendarForwardButton).click();
    cy.get(sel.paymentDate).click();
    cy.get(sel.mainContinueButton).click();
})