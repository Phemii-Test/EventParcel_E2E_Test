describe('validate all the possible scenarios for delete/disable event',()=>{
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
it('Host deletes an inactive/disabled event with no guest payments → system allows deletion.',()=>{
    cy.successfulLogin();
    cy.createEventSuccessfully();
    cy.visit('https://event-parcel.vercel.app/dashboard/events');
    cy.get(sel.eventMenuButton).first().click();
    cy.findByText('Disable Event').click();
    cy.get(sel.eventMenuButton).first().click();
    cy.findByText('Delete Event').click();
    cy.findByText('Delete').click();
})

it('Host deletes an active event with no guest payments',()=>{
    cy.successfulLogin();
    cy.createEventSuccessfully();
    cy.visit('https://event-parcel.vercel.app/dashboard/events');
    cy.get(sel.eventMenuButton).first().click();
    cy.findByText('Delete Event').click();
    cy.findByText('Delete').click();
})

it.only('Host tries to delete an active event where at least one guest has made a payment',()=>{
    cy.successfulLogin();
    cy.createEventSuccessfully();
    cy.addDollarGroupSuccessfully();
    cy.addPlatformDeliveryPackageSuccessfully();
    cy.addDollarPaymentDetails();
    cy.addPickupDetails();
    cy.wait(5000)
    cy.get(sel.createdEventTitle).first().click();
    cy.findByText('Send Invite').click();
    cy.findByText('Upload CSV').click();
    cy.findByText('Continue').click();
    cy.get(sel.attachFile).last().attachFile('contact.csv');
    cy.findByText('Import').click();
    cy.get(sel.selectContact).click();
    cy.findByText('Import').click();

})

it('Host tries to disable an active event where at least one guest has made a payment',()=>{
    cy.successfulLogin();
    cy.createEventSuccessfully();
    cy.addDollarGroupSuccessfully();
    cy.addPlatformDeliveryPackageSuccessfully();
    cy.addDollarPaymentDetails();
    cy.addPickupDetails();
    cy.wait(5000)
    cy.get(sel.createdEventTitle).first().click();
    cy.findByText('Send Invite').click();
    cy.findByText('Upload CSV').click();
    cy.findByText('Continue').click();
    cy.get(sel.attachFile).last().attachFile('contact.csv');
    cy.findByText('Import').click();
    cy.get(sel.selectContact).click();
    cy.findByText('Import').click();

})
})