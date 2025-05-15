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
    it('Validates that the original description is same with the duplicate description',()=>{
        cy.get(sel.GroupCard).eq(0).find(sel.groupDesc).eq(0).invoke('text').then(originalDescription => {
            cy.get(sel.GroupCard).eq(1).find(sel.groupDesc).eq(1).should('have.text', originalDescription);
          });
    })
})