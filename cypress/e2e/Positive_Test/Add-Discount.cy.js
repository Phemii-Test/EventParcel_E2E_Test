describe('succesfully create a discount for event.',()=>{
    let sel; 
    beforeEach(() => {
      cy.on('uncaught:exception', () => {
        return false
      })
        cy.visit("/");
        cy.fixture("selectors").then((selectors) => {
          sel = selectors;
        });
      });

      it('create a Naira discount successfully', ()=>{
        cy.successfulLogin();
        cy.findByLabelText('Discounts').click();
        cy.get(sel.discountHeaderText).should('be.visible').and('have.text','Discounts');
        cy.get(sel.discountBodyText).should('be.visible').and('have.text','Treat your guests to something special! Set a custom discount by value or percentage');
        cy.get(sel.createDiscountButton).click();
        cy.get(sel.discountTitleHeader).should('be.visible').and('have.text','Create Discounts');
        // cy.get(sel.discountTitleDesc).should('be.visible').and('have.text','Treat your guests to something special! Set a custom discount by value or percentage');
        cy.get(sel.eventDropdown).click();
        cy.get(sel.eventList).eq(1).click();
        cy.get(sel.discountTitle).type('Friends discount');
        cy.get(sel.discountValue).type('3000')
        cy.get(sel.discountCodeField).should('not.have.value', '').invoke('val').then((generatedCode)=>{

        
        cy.get(sel.submitDiscountButton).click();
        cy.wait(3000);
        // validate the discount created.

        cy.get(sel.createdDiscountTitle).first({force:true}).should('be.visible').and('have.text','Friends discount')
        cy.get(sel.createdDiscountAmount).first().should('be.visible').and('have.text','₦3000')
        cy.get(sel.createdDiscountCode).first().should('have.text',generatedCode.trim())  
    });
        
      })

      it('create a Dollar discount successfully', ()=>{
        cy.successfulLogin();
        cy.get(sel.discountTab).eq(5).click();
        cy.get(sel.createDiscountButton).click();
        cy.get(sel.eventDropdown).click();
        cy.get(sel.eventList).eq(1).click();
        cy.get(sel.discountTitle).type('American People discount');
        cy.get(sel.discountTypeDropdown).click();
        cy.get(sel.dollarDiscountOption).click();
        cy.get(sel.discountValue).type('200')
        
        cy.get(sel.submitDiscountButton).click();
        cy.wait(3000);
        // validate the discount created.

        cy.get(sel.createdDiscountTitle).first({force:true}).should('be.visible').and('have.text','American People discount')
        cy.get(sel.createdDiscountAmount).first().should('be.visible').and('have.text','$200')
    });

    it('create a percentage discount successfully', ()=>{
      cy.successfulLogin();
      cy.get(sel.discountTab).eq(5).click();
      cy.get(sel.createDiscountButton).click();
      cy.get(sel.eventDropdown).click();
      cy.get(sel.eventList).eq(1).click();
      cy.get(sel.discountTitle).type('General discount');
      cy.get(sel.discountTypeDropdown).click();
      cy.get(sel.percentageDiscountOption).click();
      cy.get(sel.discountValue).type('10')
      
      cy.get(sel.submitDiscountButton).click();
      cy.wait(3000);
      // validate the discount created.

      cy.get(sel.createdDiscountTitle).first({force:true}).should('be.visible').and('have.text','General discount')
      cy.get(sel.createdDiscountAmount).first().should('be.visible').and('have.text','10%')
  });
})