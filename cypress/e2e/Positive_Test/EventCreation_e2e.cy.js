import { faker } from "@faker-js/faker";
describe('An end to end run of the event process',()=>{
let sel
let password = 'Hbon@1234'

    beforeEach(()=>{
        cy.on('uncaught:exception', () => {
            return false
          })
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
    // cy.findByText('30').click({force:true});
    cy.get(sel.calendarForwardButton).click();
    cy.get(sel.datePicker).click();
    cy.get(sel.eventTime).clear().type('03:45 PM');
    cy.get(sel.eventLocation).type('40, Bahamas Lane, Idi-roko');
    // cy.get(sel.numberOfGroups).eq(1).type('4')

    /*cy.get('p[class="text-sm text-[#718096]"]').should('have.text','We will not share your personal details publicly');
    cy.get('#firstName').type('olufemi')
    cy.get('#lastName').type('Obadare')
    cy.get('#email').type('ohlufehmii@gmail.com')*/
    cy.findByText('Continue').click();

// Add cohost
cy.get(sel.addCohostOption).click();
cy.get(sel.cohostFirstName).type('Olaitan');
cy.get(sel.cohostLastName).type('Tester')
cy.get(sel.cohostEmail).type('Fademi7770@gmail.com')
cy.get(sel.addCohost).click();
cy.findByText('Co-host Invited').should('be.visible');
cy.findByText('An invite has been sent to Olaitan Tester via email to join you as a co-host for your event').should('be.visible');
cy.findByText('Ok, thank you').click();
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
// cy.findByText('Create Package').first().should('be.visible');
cy.findByText('How do you want to sell to this group').should('be.visible');
cy.get(sel.attachFile).attachFile('validImage.png');
cy.get(sel.packageName).type('Gele')
cy.get(sel.packageDescription).type('Gele for my special ladies');
// Validate only niara symbol is displayed.
cy.get(sel.NairaSymbol).should('be.visible').and('have.text','₦');
cy.get(sel.packagePrice).type('5000');
cy.get(sel.packageQuantity).type('15');
// select pickup
cy.get(sel.pickupOption).click();
cy.get(sel.selectBoxDropdown).click();
cy.findByText('Small Box').click();
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
    cy.findByText('$').should('be.visible');
    cy.get(sel.packagePrice).type('100');
    cy.get(sel.packageQuantity).type('10');
    // select Platform delivery
    cy.get(sel.homeDeliveryOption).click();
    cy.get(sel.platformDeliveryOption).click();
    cy.wait(3000)
    cy.get(sel.selectBoxDropdown).click();
    cy.findByText('Small Box').click();
    cy.get(sel.createPackageButton).click();
    // validate package creation successfull
    cy.findByText('Fila').should('be.visible');
    cy.findByText('$100').should('be.visible');

})

it('edit package',()=>{
    // cy.findByTestId('editPackage').first().click();
    cy.get('#editPackage').click();
    cy.get(sel.packageName).clear().type('Aso Oke',{force:true});
    cy.findByPlaceholderText('Enter amount').clear().type('500');
    // cy.get(sel.editPackagePrice).clear({force:true}).type('5000');
    // cy.get(sel.createPackage).click();
    cy.findAllByRole('button', { name: 'Update Package' }).last().click({force:true});
    cy.wait(3000)
     // validate successful edit
     cy.findByText('Aso Oke').should('be.visible');
     cy.findByText('$500').should('be.visible');
})

it('edit group successfully',()=>{
    cy.get('#edit').eq(0).click();
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
    // cy.get(sel.deleteGroupButton).click();
    cy.get('#delete').eq(0).click();
    cy.get(sel.confirmDeleteGroup).click();
})
it('add payment details',()=>{
    cy.get(sel.continue).click();
    // Validate the header and body texts 
    cy.findByText('Payment Setup').should('be.visible');
    cy.findByText('Account Details').should('be.visible');
    cy.findByText("Add your payout bank details");
    // validate that the header reads dollar payout
    cy.findByText('Naira Payout').should('be.visible');
    cy.findAllByPlaceholderText('Enter account number').eq(0).type('8140095998');
    cy.get(sel.selectNigBankField).click();
    cy.findByPlaceholderText('Search for a bank...').type('mon');
    cy.findByText('Moniepoint MFB').click();

    // select equitable bank
    // cy.get(sel.USbankOptions).eq(3).click();
    // cy.get(sel.routingNumberField).type('304971932');

    // set payment deadline
    cy.findByText('Payment Deadline').should('be.visible');
    cy.findByText('Select the payment deadline date and time').should('be.visible');
    cy.get(sel.paymentDeadlineDate).click();
    cy.get(sel.calendarForwardButton).click();
    cy.get(sel.datePicker).click();
    cy.findByText('Continue').click();
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