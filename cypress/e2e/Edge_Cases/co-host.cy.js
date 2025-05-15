describe("test the posible edge cases and scenarios", () => {
  let sel;
  let password = "Hbon@1234";
  const serverId = "zbfbnq90";

  const userName = Math.random().toString(36).substring(2, 8);
  const testEmail = `${userName}@${serverId}.mailosaur.net`;

  beforeEach(() => {
    cy.visit("/");
    cy.fixture("selectors").then((selectors) => {
      sel = selectors;
    });
  });

  it("validate the header text and body text", () => {
    cy.successfulLogin();
    cy.createEventSuccessfully();
    cy.get(sel.addCohostOption).click();
    cy.get(sel.paymentDeliveryHeader)
      .should("be.visible")
      .and("have.text", "Invite a Co-host");
    cy.get(sel.cohost_subHeaderText)
      .should("be.visible")
      .and(
        "have.text",
        "A co-host will be able to manage your event and guest invite"
      );
    cy.get(sel.paymentDetailsHeader)
      .should("be.visible")
      .and("have.text", "Co-host Details");
    cy.get(sel.cohostDetails_description)
      .should("be.visible")
      .and("have.text", "Enter the name and email address of your co-host");
  });

  it("validate the required fields is visible", () => {
    cy.successfulLogin();
    cy.createEventSuccessfully();
    cy.get(sel.addCohostOption).click();
    cy.get(sel.cohostFirstName).should("be.visible");
    cy.get(sel.cohostLastName).should("be.visible");
    cy.get(sel.cohostEmail).should("be.visible");
  });

  it("validate the email field with invalid email format", () => {
    cy.successfulLogin();
    cy.createEventSuccessfully();
    cy.get(sel.addCohostOption).click();
    cy.get(sel.cohostFirstName).type("Ola");
    cy.get(sel.cohostLastName).type("Aina");
    cy.get(sel.cohostEmail).type("olugmail.com");
    cy.get(sel.invalidErrorResponse)
      .should("be.visible")
      .and("have.text", "Invalid email address");
  });

  it.only("validate that users cannot add same coHost to the same event twice", () => {
    cy.successfulLogin();
    cy.createEventSuccessfully();
    cy.get(sel.addCohostOption).click();
    cy.get(sel.cohostFirstName).type("Ola");
    cy.get(sel.cohostLastName).type("Aina");
    cy.get(sel.cohostEmail).type("ohlufehmii@gmail.com");
    cy.get(sel.addCohost).click();
    cy.get(sel.ContinueButton).click();
    cy.wait(2000);
    cy.get(sel.addNewCohost).click();
    cy.get(sel.cohostFirstName).type("Ola");
    cy.get(sel.cohostLastName).type("Aina");
    cy.get(sel.cohostEmail).type("ohlufehmii@gmail.com");
    cy.get(sel.addCohost).click();
    cy.get(sel.coverImageErrorResp)
      .should("be.visible")
      .and("have.text", "Cohost already exist in this event");
  });
  it("Host tries to invite a 6th co-host ", () => {
    cy.successfulLogin();
    cy.createEventSuccessfully();
    cy.get(sel.addCohostOption).click();
    cy.get(sel.cohostFirstName).type("Ola");
    cy.get(sel.cohostLastName).type("Aina");
    cy.get(sel.cohostEmail).type("ohlufehmii@gmail.com");
    cy.get(sel.addCohost).click();
    cy.get(sel.ContinueButton).click();
    cy.wait(2000);
    cy.get(sel.addNewCohost).click();
    cy.get(sel.cohostFirstName).type("Ade");
    cy.get(sel.cohostLastName).type("Aina");
    cy.get(sel.cohostEmail).type("o.hlufehmii@gmail.com");
    cy.get(sel.addCohost).click();
    cy.get(sel.ContinueButton).click();
    cy.wait(2000);
    cy.get(sel.addNewCohost).click();
    cy.get(sel.cohostFirstName).type("Ade");
    cy.get(sel.cohostLastName).type("Aina");
    cy.get(sel.cohostEmail).type("o.hlufehmii@gmail.com");
    cy.get(sel.addCohost).click();
    cy.get(sel.ContinueButton).click();
    cy.wait(2000);
    cy.get(sel.addNewCohost).click();
    cy.get(sel.cohostFirstName).type("Ade");
    cy.get(sel.cohostLastName).type("Aina");
    cy.get(sel.cohostEmail).type("o.hlufehmii@gmail.com");
    cy.get(sel.addCohost).click();
    cy.get(sel.ContinueButton).click();
    cy.wait(2000);
    cy.get(sel.addNewCohost).click();
    cy.get(sel.cohostFirstName).type("Ade");
    cy.get(sel.cohostLastName).type("Aina");
    cy.get(sel.cohostEmail).type("o.hlufehmii@gmail.com");
    cy.get(sel.addCohost).click();
    cy.get(sel.ContinueButton).click();
    cy.wait(2000);
    cy.get(sel.addNewCohost).click();
    cy.get(sel.cohostFirstName).type("Ade");
    cy.get(sel.cohostLastName).type("Aina");
    cy.get(sel.cohostEmail).type("o.hlufehmii@gmail.com");
    cy.get(sel.addCohost).click();
    cy.get(sel.invalidLoginToastRespons)
    .should("be.visible")
    .and("have.text", "You can only add a maximum of 5 co-hosts for this event!");
  });

  it("validate that Host cannot invite themselves to be coHost", () => {
    cy.successfulLogin();
    cy.createEventSuccessfully();
    cy.get(sel.addCohostOption).click();
    cy.get(sel.cohostFirstName).type("Ola");
    cy.get(sel.cohostLastName).type("Aina");
    cy.get(sel.cohostEmail).type("phemii.teste.r@gmail.com");
    cy.get(sel.addCohost).click();
    cy.get(sel.coverImageErrorResp)
      .should("be.visible")
      .and("have.text", "Cohost already exist in this event");
  });

  it("validate the email content co-host gets", () => {
    cy.successfulLogin();
    cy.createEventSuccessfully();
    cy.addCohostSuccessfully();
    cy.mailosaurListMessages(Cypress.env("MAILOSAUR_SERVER_ID"), {
      sentTo: testEmail,
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
        expect(plainText).to.include("Accept Invitation");
        expect(plainText).to.include("Decline Invitation");
        expect(plainText).to.include("Dear Ola Aina,");
        expect(plainText).to.include(
          "You have been invited by Me Testing to collaborate on activities relating to their upcoming event"
        );
      });
  });

  it("accept to be co-host in an event", () => {
    cy.successfulLogin();
    cy.createEventSuccessfully();
    cy.addCohostSuccessfully();
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
      });
    cy.get(sel.statusTitle)
      .should("be.visible")
      .and("have.text", "Invite Successful");
    cy.get(sel.statusMessage)
      .should("be.visible")
      .and("have.text", "You have successfully accepted the CoHost invite!");
  });

  it("decline to be co-host in an event", () => {
    cy.successfulLogin();
    cy.createEventSuccessfully();
    cy.addCohostSuccessfully();
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
      });
    cy.get(sel.statusTitle)
      .should("be.visible")
      .and("have.text", "Invite Failed");
    cy.get(sel.statusMessage)
      .should("be.visible")
      .and("have.text", "You have successfully declined the CoHost invite!");
  });

  it("validate the email Host receives when a cohost accepts invite", () => {
    cy.verifyHostEmail();
  });

  it("validate the email Host receives when a cohost declines invite", () => {
    cy.verifySecondHostEmail();
  });
});
