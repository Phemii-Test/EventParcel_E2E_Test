describe('Validate edge cases for payment and delivery option',()=>{
    let sel;
    let password = "Hbon@1234";
  
    beforeEach(() => {
      cy.visit("/");
      cy.fixture("selectors").then((selectors) => {
        sel = selectors;
      });
    });

    it('validate naira payment when naira currency is selected at group level',()=>{
    cy.successfulLogin();
    cy.createEventSuccessfully();
    cy.addNairaGroupSuccessfully();
    cy.addPickupPackageSuccessfully();
    cy.get(sel.continue).click();
    cy.get(sel.nairaPayoutHeader).should('be.visible').and('have.text','Naira Payout');
    })

    it('validate dollar payment when dollar currency is selected at group level',()=>{
        cy.successfulLogin();
        cy.createEventSuccessfully();
        cy.addDollarGroupSuccessfully();
        cy.addPickupPackageSuccessfully();
        cy.get(sel.continue).click();
        cy.get(sel.nairaPayoutHeader).should('be.visible').and('have.text','Dollar Payout');
        cy.get(sel.routingNumberField).should('be.visible');
        })

        it('validate Naira and dollar payment, whent groups crated has both currencies',()=>{
        cy.successfulLogin();
        cy.createEventSuccessfully();
        cy.itAddDollarAndNairaGroupSuccesfully();
        cy.get(sel.continue).click();
        cy.get(sel.nairaPayoutHeader).eq(0).should('be.visible').and('have.text','Naira Payout');
        cy.get(sel.nairaPayoutHeader).eq(1).should('be.visible').and('have.text','Dollar Payout');
        cy.get(sel.routingNumberField).should('be.visible');

        })

    // it('it validate pickup packages to have delivery details',()=>{
    // cy.successfulLogin();
    // cy.createEventSuccessfully();
    // cy.addNairaGroupSuccessfully();
    // cy.addPickupPackageSuccessfully();
    // cy.get(sel.continue).click();
    // })

})