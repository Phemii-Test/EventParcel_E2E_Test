describe('validate the possible scenarios on the discount features',()=>{
    let sel; 
    let newNairaDiscount = 'jtz78zo6'
    let newDollarDiscount = 'tecs8ghg'
    let dollarDiscount = '0as1tgg8'
    let percentageDiscount = '27eccxpg'
    let nairaDiscount = 'xmmw0vmm'

    beforeEach(() => {
        cy.visit("/");
        cy.clearLocalStorage();
        cy.on('uncaught:exception',()=>{
          return false
        })
        cy.fixture("selectors").then((selectors) => {
          sel = selectors;
        });
      });

      it('proceed without selecting an event',()=>{
        cy.successfulLogin();
        cy.findByText('Discounts').click();
        cy.findByText('Create Discount').click();
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
        cy.findByText('Discounts').click();
        cy.findByText('Create Discount').click();
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
        cy.findByText('Discounts').click();
        cy.findByText('Create Discount').click();
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
        cy.findByText('Discounts').click();
        cy.findByText('Create Discount').click();
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
        cy.findByText('Discounts').click();
        cy.findByText('Create Discount').click();
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
        cy.findByText('Discounts').click();
        cy.get(sel.discountStatus).should('be.visible').and('have.text','Active');
        cy.get(sel.discountMenuButton).first().click();
        cy.get(sel.disableDiscountButton).click();
        cy.wait(3000);
        cy.get(sel.discountStatus).should('be.visible').and('have.text','Inactive');

      })

      it('Edits a discount code.',()=>{
        cy.successfulLogin();
        cy.findByText('Discounts').click();
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

      it('validate that dollar discount cannot be used in a naira group',()=>{

        cy.visit('https://event-parcel.vercel.app/preview?code=r1gccgkw');
        cy.findAllByRole('button', { name: 'Add to Cart' }).first().click({force:true});
        cy.findByText('Checkout').click();
        cy.findByPlaceholderText('Enter your first name').type('Ola')
        cy.findByPlaceholderText('Enter your last name').type('Dele')
        cy.findByPlaceholderText('Enter your email address').type('ohlufehmii@gmail.com')
        cy.findByPlaceholderText('Enter phone number').type('8140095998')
        cy.findByPlaceholderText('Enter location').type('28, Sola Odewale street, Lagos, Nigeria')
        cy.findByPlaceholderText('Search states...').click()
        cy.findByText('Abia').click();
        cy.findByPlaceholderText('Search cities...').click();
        cy.findByText('Ohafia').click();
        cy.findByPlaceholderText('Select dispatch type').click();
        cy.findByText('Bike').click();
        cy.findByText('Proceed to Payment').click();
        cy.findByPlaceholderText('Enter discount code').type(dollarDiscount);
        cy.findByText('Make Payment').click();
        cy.findByText('Discount currency (USD) does not match order currency (NGN).').should('be.visible')
      })

      it('validate that naira discount cannot be used in a dollar group',()=>{

        cy.visit('https://event-parcel.vercel.app/preview?code=w314q3b8');
        cy.findByText('Private').click();
        cy.findAllByRole('button', { name: 'Add to Cart' }).first().click({force:true});
        cy.findByText('Checkout').click();
        cy.findByPlaceholderText('Enter your first name').type('Ola')
        cy.findByPlaceholderText('Enter your last name').type('Dele')
        cy.findByPlaceholderText('Enter your email address').type('ohlufehmii@gmail.com')
        cy.findByPlaceholderText('Enter phone number').type('8140095998')
        cy.findByPlaceholderText('Enter location').type('28, Sola Odewale street, Lagos, Nigeria')
        cy.findByPlaceholderText('Search states...').click()
        cy.findByText('Abia').click();
        cy.findByPlaceholderText('Search cities...').click();
        cy.findByText('Ohafia').click();
        cy.findByPlaceholderText('Select dispatch type').click();
        cy.findByText('Bike').click();
        cy.findByText('Proceed to Payment').click();
        cy.findByPlaceholderText('Enter discount code').type(nairaDiscount);
        cy.findByText('Make Payment').click();
        cy.findByText('Discount currency (NGN) does not match order currency (USD).').should('be.visible')
      })

      it('validate that the naira discount applied reduced the total value',()=>{
        cy.visit('https://event-parcel.vercel.app/preview?code=r1gccgkw');
        cy.findAllByRole('button', { name: 'Add to Cart' }).first().click({force:true});
        cy.findByText('Checkout').click();
        cy.findByPlaceholderText('Enter your first name').type('Ola')
        cy.findByPlaceholderText('Enter your last name').type('Dele')
        cy.findByPlaceholderText('Enter your email address').type('ohlufehmii@gmail.com')
        cy.findByPlaceholderText('Enter phone number').type('8140095998')
        cy.findByPlaceholderText('Enter location').type('28, Sola Odewale street, Lagos, Nigeria')
        cy.findByPlaceholderText('Search states...').click()
        cy.findByText('Abia').click();
        cy.findByPlaceholderText('Search cities...').click();
        cy.findByText('Ohafia').click();
        cy.findByPlaceholderText('Select dispatch type').click();
        cy.findByText('Bike').click();
        cy.findByText('Proceed to Payment').click();
        cy.wait(3000);
        cy.get(sel.grandTotal).invoke('text').then((text)=>{
          const total = text.replace(/Grand Total/g, '').trim()
          expect(total).to.equal('₦35,250');
        })
        cy.findByPlaceholderText('Enter discount code').type(newNairaDiscount);
        cy.wait(5000);
        cy.get(sel.grandTotal).invoke('text').then((text)=>{
          const total = text.replace(/Grand Total/g, '').trim()
          expect(total).to.equal('₦15,250');
        })
      });

      it('validate that the dollar discount applied reduced the total value',()=>{
        cy.visit('https://event-parcel.vercel.app/preview?code=w314q3b8');
        cy.findByText('Private').click();
        cy.findAllByRole('button', { name: 'Add to Cart' }).first().click({force:true});
        cy.findByText('Checkout').click();
        cy.findByPlaceholderText('Enter your first name').type('Ola')
        cy.findByPlaceholderText('Enter your last name').type('Dele')
        cy.findByPlaceholderText('Enter your email address').type('ohlufehmii@gmail.com')
        cy.findByPlaceholderText('Enter phone number').type('8140095998')
        cy.findByPlaceholderText('Enter location').type('28, Sola Odewale street, Lagos, Nigeria')
        cy.findByPlaceholderText('Search states...').click()
        cy.findByText('Abia').click();
        cy.findByPlaceholderText('Search cities...').click();
        cy.findByText('Ohafia').click();
        cy.findByPlaceholderText('Select dispatch type').click();
        cy.findByText('Bike').click();
        cy.findByText('Proceed to Payment').click();
        cy.wait(3000);
        cy.get(sel.grandTotal).invoke('text').then((text)=>{
          const total = text.replace(/Grand Total/g, '').trim()
          expect(total).to.equal('$2,151.87');
        })
        cy.findByPlaceholderText('Enter discount code').type(newDollarDiscount);
        cy.wait(5000);
        cy.get(sel.grandTotal).invoke('text').then((text)=>{
          const total = text.replace(/Grand Total/g, '').trim()
          expect(total).to.equal('$1,151.87');
        })
        
      })

      it('validate that the percentage discount applied reduced the total value',()=>{
        cy.visit('https://event-parcel.vercel.app/preview?code=r1gccgkw');
        cy.findAllByRole('button', { name: 'Add to Cart' }).first().click({force:true});
        cy.findByText('Checkout').click();
        cy.findByPlaceholderText('Enter your first name').type('Ola')
        cy.findByPlaceholderText('Enter your last name').type('Dele')
        cy.findByPlaceholderText('Enter your email address').type('ohlufehmii@gmail.com')
        cy.findByPlaceholderText('Enter phone number').type('8140095998')
        cy.findByPlaceholderText('Enter location').type('28, Sola Odewale street, Lagos, Nigeria')
        cy.findByPlaceholderText('Search states...').click()
        cy.findByText('Abia').click();
        cy.findByPlaceholderText('Search cities...').click();
        cy.findByText('Ohafia').click();
        cy.findByPlaceholderText('Select dispatch type').click();
        cy.findByText('Bike').click();
        cy.findByText('Proceed to Payment').click();
        cy.wait(3000);
        cy.get(sel.grandTotal).invoke('text').then((text)=>{
          const total = text.replace(/Grand Total/g, '').trim()
          expect(total).to.equal('₦35,250');
        })
        cy.findByPlaceholderText('Enter discount code').type(percentageDiscount);
        cy.wait(5000);
        cy.get(sel.grandTotal).invoke('text').then((text)=>{
          const total = text.replace(/Grand Total/g, '').trim()
          expect(total).to.equal('₦20,250');
        })
      })


})

