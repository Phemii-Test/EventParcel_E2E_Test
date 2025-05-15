describe('validate possible scenarios for disabling groups',()=>{
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

it('Host clicks "Disable group and confirms the action',()=>{
    cy.successfulLogin();
    cy.createEventSuccessfully();
    cy.addDollarGroupSuccessfully();
    cy.addPlatformDeliveryPackageSuccessfully();
    cy.addDollarPaymentDetails();
    cy.addPickupDetails();
    cy.wait(5000)
    cy.get(sel.createdEventTitle).first().click();
    cy.get(sel.groupMenuButton).click();
    cy.findByText('Disable Group').click();
    cy.wait(3000)
    cy.get(sel.groupMenuButton).click();
    cy.findByText('Enable Group').should('be.visible');
    cy.findByText('Enable Group').click();
    cy.get(sel.eventMenuButton).click();
    cy.findByText('Delete Event').click();
    cy.findByText('Delete').click();
})
it('Share link" button becomes disabled immediately with tooltip: "You cannot share links to an inactive group.',()=>{

})
it.only('validate Guest attempts to access the disabled group via shared link',()=>{
    cy.visit('https://event-parcel.vercel.app/preview?code=b176zbdg')
    cy.wait(3000)
    cy.findByText('This group is not accepting payments at this time.').should('be.visible');
})
})