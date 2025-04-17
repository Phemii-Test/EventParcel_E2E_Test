describe('validate the possible scenarios on the discount features',()=>{
    let sel; 
    beforeEach(() => {
        cy.visit("/");
        cy.fixture("selectors").then((selectors) => {
          sel = selectors;
        });
      });

      it('proceed without selecting an event',()=>{
        cy.successfulLogin();
        cy.get(sel.discountTab).eq(5).click();
        cy.get(sel.createDiscountButton).click();
        // cy.get(sel.eventDropdown).click();
        // cy.get(sel.eventList).eq(1).click();
        cy.get(sel.discountTitle).type('American People discount');
        cy.get(sel.discountTypeDropdown).click();
        cy.get(sel.dollarDiscountOption).click();
        cy.get(sel.discountValue).type('200')
        
        cy.get(sel.submitDiscountButton).should('be.disabled');
      })

      it('attempt to enter a discount title less than 3 character',()=>{
        cy.successfulLogin();
        cy.get(sel.discountTab).eq(5).click();
        cy.get(sel.createDiscountButton).click();
        cy.get(sel.eventDropdown).click();
        cy.get(sel.eventList).eq(1).click();
        cy.get(sel.discountTitle).type('Am');
        cy.get(sel.discountTypeDropdown).click();
        cy.get(sel.dollarDiscountOption).click();
        cy.get(sel.discountValue).type('200')
        
        cy.get(sel.submitDiscountButton).should('be.disabled');
      })
      it('attempt to enter a discount title greater than 25 character',()=>{
        cy.successfulLogin();
        cy.get(sel.discountTab).eq(5).click();
        cy.get(sel.createDiscountButton).click();
        cy.get(sel.eventDropdown).click();
        cy.get(sel.eventList).eq(1).click();
        cy.get(sel.discountTitle).type('Amenotrucatriculaticannirdufhhsy');
        cy.get(sel.discountTypeDropdown).click();
        cy.get(sel.dollarDiscountOption).click();
        cy.get(sel.discountValue).type('200')
        
        cy.get(sel.submitDiscountButton).should('be.disabled');
      })
      it('leaves the discount title field empty',()=>{
        cy.successfulLogin();
        cy.get(sel.discountTab).eq(5).click();
        cy.get(sel.createDiscountButton).click();
        cy.get(sel.eventDropdown).click();
        cy.get(sel.eventList).eq(1).click();
        cy.get(sel.discountTitle).type('');
        cy.get(sel.discountTypeDropdown).click();
        cy.get(sel.dollarDiscountOption).click();
        cy.get(sel.discountValue).type('200')
        
        cy.get(sel.submitDiscountButton).should('be.disabled');
      })

      it('inputs a discount value greater than 100 for %',()=>{
        cy.successfulLogin();
        cy.get(sel.discountTab).eq(5).click();
        cy.get(sel.createDiscountButton).click();
        cy.get(sel.eventDropdown).click();
        cy.get(sel.eventList).eq(1).click();
        cy.get(sel.discountTitle).type('General discount');
        cy.get(sel.discountTypeDropdown).click();
        cy.get(sel.percentageDiscountOption).click();
        cy.get(sel.discountValue).type('200')
        
        cy.get(sel.submitDiscountButton).click();
        cy.get(sel.coverImageErrorResp).should('be.visible').and('have.text','Discount value cannot exceed 100% for percentage discounts.')
      })

      it.skip('deactivates a discount code.',()=>{
        cy.successfulLogin();
        cy.get(sel.discountTab).eq(5).click();
        cy.get(sel.discountStatus).should('be.visible').and('have.text','Active');
        cy.get(sel.discountMenuButton).first().click();
        cy.get(sel.disableDiscountButton).click();
        cy.wait(3000);
        cy.get(sel.discountStatus).should('be.visible').and('have.text','Inactive');

      })

      it.only('Edits a discount code.',()=>{
        cy.successfulLogin();
        cy.get(sel.discountTab).eq(5).click();
        cy.wait(3000);
        cy.get(sel.createdDiscountTitle).last({force:true}).should('be.visible').and('have.text','Friends discount')
        cy.get(sel.createdDiscountAmount).last().should('be.visible').and('have.text','₦3000')
        cy.get(sel.createdDiscountCode).last().should('have.text','pu0kl9my')  
        cy.get(sel.discountMenuButton).last().click();
        cy.get(sel.editDiscountButton).click();
        cy.get(sel.editDiscountTitle).clear().type('My Family Discount');
        cy.get(sel.editDiscountValue).clear().type('5000');
        cy.get(sel.mainContinueButton).click();
        cy.wait(3000);
        cy.get(sel.createdDiscountTitle).last({force:true}).should('be.visible').and('have.text','My Family Discount')
        cy.get(sel.createdDiscountAmount).last().should('be.visible').and('have.text','₦5000')
        cy.get(sel.createdDiscountCode).last().should('have.text','pu0kl9my')  
      })

})

