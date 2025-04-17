import { faker } from "@faker-js/faker";
describe('An end to end run of the event process',()=>{
let sel
let password = 'Hbon@1234'

    beforeEach(()=>{
    cy.fixture('selectors').then((selectors)=>{
        sel=selectors
    })
})
it('successfully created an event',()=>{

    // login 
    cy.successfulLogin();
    // Create event
    cy.get(sel.eventCreationButton).click();
    cy.get(sel.createNewEventBtn).click();
    cy.get(sel.eventCreationHeader).should('be.visible').and('have.text','Tell us about your event');
    cy.get(sel.eventCreationBodyText).should('be.visible').and('have.text',"We'll help you get started based on your responses")
    cy.get(sel.eventName).type('OlaOluwa2024')
    cy.get(sel.attachFile).attachFile('validImage.png');
    cy.get(sel.eventDescription).type('We cordially invite you to our glorious wedding.')
    cy.get(sel.eventDate).click();
    cy.get(sel.calendarForwardButton).click();
    // cy.get('[type="button"]').click(); //click forward button
    cy.get(sel.datePicker).click();
    cy.get(sel.eventTime).clear().type('03:45 PM');
    cy.get(sel.eventLocation).type('40, Bahamas Lane, Idi-roko');
    cy.get(sel.numberOfGroups).eq(1).type('4')

    /*cy.get('p[class="text-sm text-[#718096]"]').should('have.text','We will not share your personal details publicly');
    cy.get('#firstName').type('olufemi')
    cy.get('#lastName').type('Obadare')
    cy.get('#email').type('ohlufehmii@gmail.com')*/
    cy.get(sel.createEventButton).click();

// Add cohost
cy.get(sel.addCohostOption).click();
cy.get(sel.cohostFirstName).type('Olaitan');
cy.get(sel.cohostLastName).type('Tester')
cy.get(sel.cohostEmail).type('Fademi7770@gmail.com')
cy.get(sel.addCohost).click();
cy.get(sel.cohostConfirmationHeader).should('be.visible').and('have.text',"You've successfully added your co-host");
cy.get(sel.cohostConfirmationBody).should('be.visible').and('have.text','Co-host details have been saved successfully.');
cy.get(sel.ContinueButton).click();
cy.wait(3000)
})

it('add a Naira group',()=>{
cy.get(sel.mainContinueButton).click();
cy.get(sel.groupHeader).should('be.visible').and('have.text','Create a group for specific guests')
cy.get(sel.groupName).type('Aso Ebi Geng');
cy.get(sel.groupDescription).type('These are my very own Aso Ebi friends');
// select Naira currency
cy.get(sel.currencyDropdown).click();
cy.get(sel.nairaOption).click();
cy.get(sel.mainContinueButton).click();

// Validate successful group creation
cy.get(sel.groupTitle).should('have.text','Aso Ebi Geng')
cy.get(sel.groupDesc).should('have.text','These are my very own Aso Ebi friends');

// Add package
cy.get(sel.createPackage).click();
cy.get(sel.packageHeader).should('have.text','Create Package');
cy.get(sel.packageBodyText).should('have.text','How do you want to sell to this group');
cy.get(sel.attachFile).attachFile('validImage.png');
cy.get(sel.packageName).type('Gele')
cy.get(sel.packageDescription).type('Gele for my special ladies');
// Validate only niara symbol is displayed.
cy.get(sel.NairaSymbol).should('be.visible').and('have.text','₦');
cy.get(sel.packagePrice).type('5000');
cy.get(sel.packageQuantity).type('15');
// select pickup
cy.get(sel.pickupOption).click();
cy.get(sel.createPackageButton).click();
// validate package creation successfull
cy.get(sel.packageTitle).should('be.visible').and('have.text','Gele')
cy.get(sel.packageCreatedPrice).should('be.visible').and('have.text','₦5000');

})

it('add a dollar group',()=>{
    cy.get(sel.addNew).click();
    cy.get(sel.groupName).type('My Cool Guys');
    cy.get(sel.groupDescription).type('These are for my cool guys');
    // select dollar currency
    cy.get(sel.currencyDropdown).click();
    cy.get(sel.dollarOption).click();
    // toggle General button
    cy.get(sel.generalOption).click();
    cy.get(sel.mainContinueButton).click();
    
    // Validate successful group creation
    cy.get(sel.groupTitle).should('have.text','My Cool Guys')
    cy.get(sel.groupDesc).should('have.text','These are for my cool guys');
    
    // Add package
    cy.get(sel.createPackage).click();
    cy.get(sel.attachFile).attachFile('validImage.png');
    cy.get(sel.attachFile).attachFile('image2.png');
    cy.get(sel.attachFile).attachFile('image3.png');
    cy.get(sel.attachFile).attachFile('image4.png');
    cy.get(sel.packageName).type('Fila')
    cy.get(sel.packageDescription).type('For gentle men');
    // Validate only niara symbol is displayed.
    cy.get(sel.DollarSymbol).should('be.visible').and('have.text','$');
    cy.get(sel.packagePrice).type('100');
    cy.get(sel.packageQuantity).type('10');
    // select Platform delivery
    cy.get(sel.homeDeliveryOption).click();
    cy.get(sel.platformDeliveryOption).click();
    cy.wait(3000)
    cy.get(sel.createPackageButton).click();
    // validate package creation successfull
    cy.get(sel.packageTitle2).should('be.visible').and('have.text','Fila')
    cy.get(sel.packageCreatedPrice2).should('be.visible').and('have.text','$100');

})

it('edit package',()=>{

    cy.get(sel.editPackage).click();
    cy.get(sel.packageName).clear().type('Aso oke',{force:true});
    cy.get(sel.editPackagePrice).clear({force:true}).type('5000');
    cy.get(sel.createPackage).click();
    cy.wait(3000)
     // validate successful edit
     cy.get(sel.packageTitle2).should('be.visible').and('have.text','Aso oke')
     cy.get(sel.packageCreatedPrice2).should('be.visible').and('have.text','$5000');
})

it('edit group successfully',()=>{
    cy.get(sel.editGroup).click();
    cy.get(sel.groupName).clear().type('American People');
    cy.get(sel.groupDescription).clear().type('This group is soley for my guys from America');
    cy.get(sel.mainContinueButton).click();
     
    // Validate successful group edit
    cy.get(sel.groupTitle).eq(0).should('have.text','American People')
    cy.get(sel.groupDesc).eq(0).should('have.text','This group is soley for my guys from America');
})
/*
it('delete a group1',()=>{
    cy.get('body > div:nth-child(1) > section:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > span:nth-child(1)').click();
    cy.get('button[class="bg-primary text-white py-2 px-4 rounded-[12px] hover:bg-red-800 transition flex items-center justify-center"]').click();
})*/

it('delete a group2',()=>{
    cy.get(sel.deleteGroupButton).click();
    cy.get(sel.confirmDeleteGroup).click();
})
it('add payment details',()=>{
    cy.get(sel.continue).click();
    // Validate the header and body texts 
    cy.get(sel.paymentDeliveryHeader).should('be.visible').and('have.text','Payment Setup');
    cy.get(sel.paymentDeliveryBody).should('be.visible').and('have.text',"Let's setup your payout process and payment");
    cy.get(sel.paymentDetailsHeader).should('be.visible').and('have.text','Account Details');
    cy.get(sel.paymentDetailsDescription).should('be.visible').and('have.text','Add your payout bank details');

    // validate that the header reads dollar payout
    cy.get(sel.dollarPayoutHeader).should('be.visible').and('have.text','Dollar Payout');
    // fill payout details.
    cy.get(sel.accountNumberField).type('4437266529');
    cy.get(sel.accountNameField).type('Olufemi Tester');
    cy.get(sel.selectBankField).click();
    // select equitable bank
    cy.get(sel.USbankOptions).eq(3).click();
    cy.get(sel.routingNumberField).type('304971932');

    // set payment deadline
    cy.get(sel.paymentDeadlineHeader).should('be.visible').and('have.text','Payment Deadline');
    cy.get(sel.paymentDeadlineDescription).should('be.visible').and('have.text','Select the payment deadline date and time');
    cy.get(sel.paymentDeadlineDate).click();
    cy.get(sel.calendarForwardButton).click();
    cy.get(sel.datePicker).click();
    cy.get(sel.mainContinueButton).click();
})

it('Add delivery details',()=>{
    cy.get(sel.deliveryHeader).should('be.visible').and ('have.text','Pickup Details');
    cy.get(sel.deliveryDescription).should('be.visible').and ('have.text','Add pickup contact details and when you want to start the delivery');
    cy.get(sel.contactName).type('Olayemi Ibijoke');
    cy.get(sel.contactNumber).type('8140095998');
    cy.get(sel.pickupLocation).type('6, Jonathan Gimba Lane, Lagos.');
    cy.get(sel.deliveryDate).click();
    cy.get(sel.calendarForwardButton).click();
    cy.get(sel.datePicker).click();
    cy.get(sel.mainContinueButton).click();
})

it('validate the event dashboard details matches the event',()=>{
    // event name details
    cy.get(sel.confirmEventName).should('be.visible').and('have.text','OlaOluwa2024')
    cy.get(sel.confirmEventDesc).should('be.visible').and('have.text','We cordially invite you to our glorious wedding.')
})
})