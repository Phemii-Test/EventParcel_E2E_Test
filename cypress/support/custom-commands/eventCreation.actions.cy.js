let sel
  
  
       beforeEach(()=>{
           cy.fixture('selectors').then((selectors)=>{
            sel=selectors
        })
       })

 Cypress.Commands.add('createEventSuccessfully', () => { 
    cy.get(sel.eventName).type('OlaOluwa2024')
    cy.get(sel.attachFile).attachFile('validImage.png');
    cy.get(sel.eventDescription).type('We cordially invite you to our glorious wedding.')
    cy.get(sel.eventDate).click();
    cy.get(sel.calendarForwardButton).click();
    cy.get(sel.datePicker).click();
    cy.get(sel.eventTime).clear().type('03:45 PM');
    cy.get(sel.eventLocation).type('40, Bahamas Lane, Idi-roko');
    cy.get(sel.numberOfGroups).eq(1).type('4')
    cy.get(sel.createEventButton).click();
    cy.get(sel.continueToGroupButton).click();
 })

 Cypress.Commands.add('addNairaGroupSuccessfully',()=>{

    cy.get(sel.groupName).type('Aso Ebi');
    cy.get(sel.groupDescription).type('These are my very own Aso Ebi friends');
    // select Naira currency
    cy.get(sel.currencyDropdown).click();
    cy.get(sel.secondNairaOption).click();
    cy.get(sel.mainContinueButton).click();
 })

 Cypress.Commands.add('addDollarGroupSuccessfully',()=>{

   cy.get(sel.groupName).type('Aso Ebi');
   cy.get(sel.groupDescription).type('These are my very own Aso Ebi friends');
   // select Naira currency
   cy.get(sel.currencyDropdown).click();
   cy.get(sel.secondDollarOption).click();
   cy.get(sel.mainContinueButton).click();
})

Cypress.Commands.add('itAddDollarAndNairaGroupSuccesfully',()=>{

   cy.get(sel.groupName).type('Aso Ebi');
   cy.get(sel.groupDescription).type('These are my very own Aso Ebi friends');
   // select Naira currency
   cy.get(sel.currencyDropdown).click();
   cy.get(sel.secondNairaOption).click();
   cy.get(sel.mainContinueButton).click();

   cy.get(sel.createPackage).click();
   cy.get(sel.attachFile).attachFile('validImage.png');
   cy.get(sel.packageName).type("Fila");
   cy.get(sel.packageDescription).type("Gele for my special ladies");
   cy.get(sel.packagePrice).type("5000");
   cy.get(sel.packageQuantity).type("15");
   // select pickup
   cy.get(sel.pickupOption).click();
   cy.get(sel.adhocAddPackageBtn).click();
   
      cy.get(sel.addNew).click();
      cy.get(sel.groupName).type('My Cool Guys');
      cy.get(sel.groupDescription).type('These are for my cool guys');
      // select dollar currency
      cy.get(sel.currencyDropdown).click();
      cy.get(sel.secondDollarOption).click();
      // toggle General button
      cy.get(sel.generalOption).click();
      cy.get(sel.mainContinueButton).click();
      
      // Add package
      cy.get(sel.createPackage).click();
      cy.get(sel.attachFile).attachFile('validImage.png');
      cy.get(sel.attachFile).attachFile('image2.png');
      cy.get(sel.attachFile).attachFile('image3.png');
      cy.get(sel.attachFile).attachFile('image4.png');
      cy.get(sel.packageName).type('Fila')
      cy.get(sel.packageDescription).type('For gentle men');
      cy.get(sel.packagePrice).type('100');
      cy.get(sel.packageQuantity).type('10');
      // select Platform delivery
      cy.get(sel.homeDeliveryOption).click();
      cy.get(sel.platformDeliveryOption).click();
      cy.wait(3000)
      cy.get(sel.createPackageButton).click();
})

 Cypress.Commands.add('addPickupPackageSuccessfully',()=>{
   cy.get(sel.createPackage).click();
   cy.get(sel.attachFile).attachFile('validImage.png');
   cy.get(sel.packageName).type("Fila");
   cy.get(sel.packageDescription).type("Gele for my special ladies");
   cy.get(sel.packagePrice).type("5000");
   cy.get(sel.packageQuantity).type("15");
   // select pickup
   cy.get(sel.pickupOption).click();
   cy.get(sel.adhocAddPackageBtn).click();
 })