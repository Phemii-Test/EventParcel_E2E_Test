describe('it verifies the guest experience flow end to end.',()=>{

    beforeEach(() => {
        cy.visit('/preview?code=tzcfmajo');
        cy.on('uncaught:exception',()=>{
          return false
        })
        cy.fixture("selectors").then((selectors) => {
          sel = selectors;
        });
      });

      
})