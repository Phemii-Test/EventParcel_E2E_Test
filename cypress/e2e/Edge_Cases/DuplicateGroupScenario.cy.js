describe('validate every possible scenario with duplicating groups',()=>{

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

    it('validates What happens when users clicks the duplicate button',()=>{
        cy.successfulLogin();
        cy.createEventSuccessfully();
        cy.addNairaGroupSuccessfully();
        cy.addPlatformDeliveryPackageSuccessfully();
        cy.findByText('Duplicate').click();
        cy.get(sel.GroupCard).eq(1).should('be.visible')
    })
    it.only('Validates that no two group has the same title',()=>{
        cy.successfulLogin();
        cy.createEventSuccessfully();
        cy.addNairaGroupSuccessfully();
        cy.addPlatformDeliveryPackageSuccessfully();
        cy.findByText('Duplicate').click();
        cy.wait(5000);
        cy.get('#edit').eq(0).click();
        cy.get(sel.groupName).clear().type('Aso Ebi');
        cy.get(sel.groupDescription).clear().type('This group is soley for my guys from America');
        cy.get(sel.mainContinueButton).click();
        cy.findByText('Group title cannot be the same').should('be.visible');  
    })
})