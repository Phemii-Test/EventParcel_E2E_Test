describe('Validate edge cases for payment and delivery option',()=>{
    let sel;
    let password = "Hbon@1234";
  
    beforeEach(() => {
      cy.on('uncaught:exception', () => {
        return false
      })
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
        cy.findByText('Dollar Payout').should('be.visible');
        cy.get(sel.routingNumberField).should('be.visible');
        })

        it('validate Naira and dollar payment, when groups created has both currencies',()=>{
        cy.successfulLogin();
        cy.createEventSuccessfully();
        cy.itAddDollarAndNairaGroupSuccesfully();
        cy.get(sel.continue).click();
        cy.findByText('Naira Payout').should('be.visible');
        cy.findByText('Dollar Payout').should('be.visible');
        })
        it('validate that the Naira account number is not less than 10 digits',()=>{
        cy.successfulLogin();
        cy.createEventSuccessfully();
        cy.addNairaGroupSuccessfully();
        cy.addPickupPackageSuccessfully();
        cy.get(sel.continue).click();
        cy.get(sel.nairaAccountNumberField).type('123456');
        cy.get(sel.accountNumberError).should('be.visible').and('have.text','Account number must be 10 digits.')
        })

        it('validate that the dollar account number field does not take less than 7 digits',()=>{
        cy.successfulLogin();
        cy.createEventSuccessfully();
        cy.addDollarGroupSuccessfully();
        cy.addPickupPackageSuccessfully();
        cy.get(sel.continue).click();
        cy.get(sel.accountNumberField).type('1234');
        cy.findByText('Must be 7-17 digits').should('be.visible');

        })
        it('validate that the dollar account number field does not take greater than 17 digits',()=>{
          cy.successfulLogin();
          cy.createEventSuccessfully();
          cy.addDollarGroupSuccessfully();
          cy.addPickupPackageSuccessfully();
          cy.get(sel.continue).click();
          cy.get(sel.accountNumberField).type('1234656576877879898',{force:true});
          cy.findByText('Must be 7-17 digits').should('be.visible');
  
          })

          it('validate that the dollar routing number field does not take less than 9 digits',()=>{
            cy.successfulLogin();
            cy.createEventSuccessfully();
            cy.addDollarGroupSuccessfully();
            cy.addPickupPackageSuccessfully();
            cy.get(sel.continue).click();
            cy.get(sel.selectBankField).click();
            cy.get(sel.USbankOptions).eq(3).click();
            cy.get(sel.routingNumberField).type('1234');
            cy.findByText('Must be 9 digits').should('be.visible');
    
            })
            it('validate that the dollar routing number field does not take greater than 9 digits',()=>{
              cy.successfulLogin();
              cy.createEventSuccessfully();
              cy.addDollarGroupSuccessfully();
              cy.addPickupPackageSuccessfully();
              cy.get(sel.continue).click();
              cy.get(sel.selectBankField).click();
              cy.get(sel.USbankOptions).eq(3).click();
              cy.get(sel.routingNumberField).type('123456789456');
              cy.findByText('Must be 9 digits').should('be.visible');
            }) 
            // it.only('validate that the payment deadline field is required.',()=>{
            //   cy.successfulLogin();
            //   cy.createEventSuccessfully();
            //   cy.addDollarGroupSuccessfully();
            //   cy.addPickupPackageSuccessfully();
            //   cy.get(sel.continue).click();
            //   cy.get(sel.accountNameField).type('olufemi Tester')
            //   cy.get(sel.accountNumberField).type('1234656576');
            //   cy.get(sel.selectBankField).click();
            //   cy.get(sel.USbankOptions).eq(3).click();
            //   cy.get(sel.routingNumberField).type('304971932');
            //   cy.get(sel.paymentDeadlineDate).clear({force:true});
            //   cy.wait(3000)
            //   cy.get(sel.mainContinueButton).click();
            //   cy.get(sel.invalidLoginToastRespons).should('be.visible').and('have.text','payment deadline is required');
            // });

    it('it validate pickup packages to have delivery details',()=>{
    cy.successfulLogin();
    cy.createEventSuccessfully();
    cy.addDollarGroupSuccessfully();
    cy.addPickupPackageSuccessfully();
    cy.addDollarPaymentDetails();
    cy.get(sel.deliveryHeader).should('be.visible').and('have.text','Pickup Details');
    cy.get(sel.deliveryDescription).should('be.visible').and('have.text','Add pickup contact details and when you want to start the delivery');
    })
    it('it validate platform delivery packages to have delivery details',()=>{
      cy.successfulLogin();
      cy.createEventSuccessfully();
      cy.addDollarGroupSuccessfully();
      cy.addPlatformDeliveryPackageSuccessfully();
      cy.addDollarPaymentDetails();
      cy.get(sel.deliveryHeader).should('be.visible').and('have.text','Pickup Details');
      cy.get(sel.deliveryDescription).should('be.visible').and('have.text','Add pickup contact details and when you want to start the delivery');
      })
    it.only('it validate self managed delivery packages not to have delivery details',()=>{
        cy.successfulLogin();
        cy.createEventSuccessfully();
        cy.addDollarGroupSuccessfully();
        cy.addSelfDeliveryPackageSuccessfully();
        cy.addDollarPaymentDetails();
        cy.get(sel.eventDashboardHeader).should('be.visible').and('have.text','Events');
        })

        /*it.only('it validate the delivery contact name field does not accept less than 3 character',()=>{
          cy.successfulLogin();
          cy.createEventSuccessfully();
          cy.addDollarGroupSuccessfully();
          cy.addPlatformDeliveryPackageSuccessfully();
          cy.addDollarPaymentDetails();
          cy.get(sel.contactName).type('ug');
          cy.get('body').click();
          cy.get(sel.noPackageImageErrorResp).should('be.visible').and('have.text','Contact name cannot be less than three character');
        })*/
})