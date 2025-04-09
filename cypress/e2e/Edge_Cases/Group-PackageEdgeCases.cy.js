describe("validate the group and packages edge cases", () => {
  let sel;
  let password = "Hbon@1234";

  beforeEach(() => {
    cy.visit('/');
    cy.fixture("selectors").then((selectors) => {
      sel = selectors;
    });
  });

  it("validate that the group name is required", () => {
    cy.successfulLogin();
    cy.createEventSuccessfully();
    // create group
    cy.get(sel.groupName).type("  ");
    cy.get("body").click();
    cy.get(sel.invalidGroupErrorResponse)
      .should("be.visible")
      .and("have.text", "Group name is required");
    cy.get(sel.groupDescription).type("These are my very own Aso Ebi friends");
    // select Naira currency
    cy.get(sel.currencyDropdown).click();
    cy.get(sel.secondNairaOption).click();
    cy.get(sel.mainContinueButton).should("be.disabled");
  });

  it("validate that the group title field does not take more than 60 character", () => {
    cy.successfulLogin();
    cy.createEventSuccessfully();
    // create group
    cy.get(sel.groupName).type(
      "Global Innovation Summit: Transforming Businesses Through Technology and Collaboration"
    );
    cy.get("body").click();
    cy.get(sel.invalidGroupErrorResponse)
      .should("be.visible")
      .and("have.text", "Group name must not exceed 60 characters");
    cy.get(sel.groupDescription).type("These are my very own Aso Ebi friends");
    // select Naira currency
    cy.get(sel.currencyDropdown).click();
    cy.get(sel.secondNairaOption).click();
    cy.get(sel.mainContinueButton).should("be.disabled");
  });

  it("validate that the group description field is optional", () => {
    cy.successfulLogin();
    cy.createEventSuccessfully();
    // create group
    cy.get(sel.groupName).type("Aso Ebi");
    // cy.get(sel.groupDescription).type('These are my very own Aso Ebi friends');
    // select Naira currency
    cy.get(sel.currencyDropdown).click();
    cy.get(sel.secondNairaOption).click();
    cy.get(sel.mainContinueButton).should("be.enabled");
  });

  it("validate that the description field does not take more than 150 characters", () => {
    cy.successfulLogin();
    cy.createEventSuccessfully();
    // create group
    cy.get(sel.groupName).type("Aso Ebi");
    cy.get(sel.groupDescription).type(
      'The Global Innovation & Technology Summit 2025" is a premier gathering of industry leaders, entrepreneurs, and tech enthusiasts focused on the future of digital transformation. This event will feature keynote speakers, interactive workshops, and panel discussions covering AI, fintech, cybersecurity, and business automation. Attendees will gain insights into emerging trends, network with experts, and explore groundbreaking solutions that drive business growth.'
    );
    cy.get("body").click();
    cy.get(sel.invalidGroupErrorResponse)
      .should("be.visible")
      .and("have.text", "Description must not exceed 150 characters");
    // select Naira currency
    cy.get(sel.currencyDropdown).click();
    cy.get(sel.secondNairaOption).click();
    cy.get(sel.mainContinueButton).should("be.disabled");
  });

  it("validate that the currency option is compulsory", () => {
    cy.successfulLogin();
    cy.createEventSuccessfully();
    // create group
    cy.get(sel.groupName).type("Aso Ebi");
    cy.get(sel.groupDescription).type("Our very special day");
    // Currency not selected
    cy.get(sel.mainContinueButton).should("be.disabled");
  });

  it("validate the package title is required", () => {
    cy.successfulLogin();
    cy.createEventSuccessfully();
    cy.addNairaGroupSuccessfully();
    // Add package
    cy.get(sel.createPackage).click();
    cy.get(sel.attachFile).attachFile("validImage.png");
    cy.get(sel.packageName).type("  ");
    cy.get("body").click();
    cy.get(sel.invalidErrorResponse)
      .should("be.visible")
      .and("have.text", "Title is required.");
  });

  it("validate that the package image is compulsory", () => {
    cy.successfulLogin();
    cy.createEventSuccessfully();
    cy.addNairaGroupSuccessfully();
    // Add package
    cy.get(sel.createPackage).click();
    // cy.get(sel.attachFile).attachFile('validImage.png');
    cy.get(sel.packageName).type("Fila");
    cy.get(sel.packageDescription).type("Gele for my special ladies");
    cy.get(sel.packagePrice).type("5000");
    cy.get(sel.packageQuantity).type("15");
    // select pickup
    cy.get(sel.pickupOption).click();
    cy.get(sel.adhocAddPackageBtn).click();
    cy.get(sel.noPackageImageErrorResp)
      .should("be.visible")
      .and("have.text", "No images were uploaded");
  });

  it("validate that users cannot upload image file greater than 5 mb", () => {
    cy.successfulLogin();
    cy.createEventSuccessfully();
    cy.addNairaGroupSuccessfully();
    // Add package
    cy.get(sel.createPackage).click();
    cy.get(sel.attachFile).attachFile("invalidImage1.xlsx");
    cy.get(sel.attachFile).attachFile("invalidImage2.webp");
    cy.get(sel.attachFile).attachFile("invalidImage3.pdf");
    cy.get(sel.attachFile).attachFile("invalidImage4.svg");
    cy.get(sel.packageName).type("Fila");
    cy.get(sel.packageDescription).type("Gele for my special ladies");
    cy.get(sel.packagePrice).type("5000");
    cy.get(sel.packageQuantity).type("15");
    // select pickup
    cy.get(sel.pickupOption).click();
    cy.get(sel.adhocAddPackageBtn).click();
    cy.get(sel.noPackageImageErrorResp)
      .should("be.visible")
      .and(
        "have.text",
        "File size too large. Please upload a file less than 5MB."
      );
  });

  it("validate that the price field is required", () => {
    cy.successfulLogin();
    cy.createEventSuccessfully();
    cy.addNairaGroupSuccessfully();
    // Add package
    cy.get(sel.createPackage).click();
    cy.get(sel.attachFile).attachFile("validImage.png");
    cy.get(sel.packageName).type("Fila");
    cy.get(sel.packageDescription).type("Gele for my special ladies");
    cy.get(sel.packageQuantity).type("15");
    // select pickup
    cy.get(sel.pickupOption).click();
    cy.get(sel.adhocAddPackageBtn).should("be.disabled");
  });

  it("validate that the quantity field is not required", () => {
    cy.successfulLogin();
    cy.createEventSuccessfully();
    cy.addNairaGroupSuccessfully();
    // Add package
    cy.get(sel.createPackage).click();
    cy.get(sel.attachFile).attachFile("validImage.png");
    cy.get(sel.packageName).type("Fila");
    cy.get(sel.packageDescription).type("Gele for my special ladies");
    cy.get(sel.packagePrice).type("5000");
    // select pickup
    cy.get(sel.pickupOption).click();
    cy.get(sel.adhocAddPackageBtn).should("be.enabled");
  });
});
