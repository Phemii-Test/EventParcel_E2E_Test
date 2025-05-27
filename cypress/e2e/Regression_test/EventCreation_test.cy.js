describe('end to end test for event creation feature',()=>{
    let sel
    let password = 'Hbon@1234'
    
        beforeEach(()=>{
            cy.visit('/');
            cy.on('uncaught:exception', () => {
          return false
        })
        cy.fixture('selectors').then((selectors)=>{
            sel=selectors
        })
    })

    it('validate the event creation name field with less than 5 characters',()=>{
        // login 
        cy.get(sel.signInEmailField).should('be.visible').type('phemii.tester@gmail.com');
        cy.get(sel.signInPasswordField).type(password);
        cy.get(sel.loginButton).should('be.visible').click();
       
        // Create event
        cy.get(sel.eventCreationButton).click();
        cy.get(sel.createNewEventBtn).click();
        cy.get(sel.eventName).type('Ola')
        cy.get('body').click();
        //  error response to show that the eventName field should have at least 5 letters
       cy.get(sel.invalidErrorResponse).should('be.visible').and('have.text','Event name must be at least 5 characters.')
        cy.get(sel.attachFile).attachFile('validImage.png');
        cy.get(sel.eventDescription).type('We cordially invite you to our glorious wedding.')
        cy.get(sel.eventDate).click();
        cy.get(sel.calendarForwardButton).click();
        // cy.get('[type="button"]').click(); //click forward button
        cy.get(sel.datePicker).click();
        cy.get(sel.eventTime).clear().type('03:45 PM');
        cy.get(sel.eventLocation).type('40, Bahamas Lane, Idi-roko');
        cy.get(sel.numberOfGroups).eq(1).type('4')
       
        cy.findByText('Continue').should('be.disabled');
       
       })
       
       it('validate the event creation name field with more than 60 characters',()=>{
           // login 
           cy.get(sel.signInEmailField).should('be.visible').type('phemii.tester@gmail.com');
           cy.get(sel.signInPasswordField).type(password);
           cy.get(sel.loginButton).should('be.visible').click();
          
           // Create event
           cy.get(sel.eventCreationButton).click();
           cy.get(sel.createNewEventBtn).click();
           cy.get(sel.eventName).type('Global Innovation Summit: Transforming Businesses Through Technology and Collaboration');
           cy.get('body').click();
           //  error response to show that the eventName field should have at most 300 letters
          cy.get(sel.invalidErrorResponse).should('be.visible').and('have.text','Event name must not exceed 60 characters.')
           cy.get(sel.attachFile).attachFile('validImage.png');
           cy.get(sel.eventDescription).type('We cordially invite you to our glorious wedding.')
           cy.get(sel.eventDate).click();
           cy.get(sel.calendarForwardButton).click();
           // cy.get('[type="button"]').click(); //click forward button
           cy.get(sel.datePicker).click();
           cy.get(sel.eventTime).clear().type('03:45 PM');
           cy.get(sel.eventLocation).type('40, Bahamas Lane, Idi-roko');
           cy.get(sel.numberOfGroups).eq(1).type('4')
          
           cy.findByText('Continue').should('be.disabled');
          
          })
       it('validate that the event description is optional',()=>{
            // login 
            cy.get(sel.signInEmailField).should('be.visible').type('phemii.tester@gmail.com');
            cy.get(sel.signInPasswordField).type(password);
            cy.get(sel.loginButton).should('be.visible').click();
           
            // Create event
            cy.get(sel.eventCreationButton).click();
            cy.get(sel.createNewEventBtn).click();
            cy.get(sel.eventName).type('Olubola');
            cy.get(sel.attachFile).attachFile('validImage.png');
            cy.get(sel.eventDate).click();
            cy.get(sel.calendarForwardButton).click();
            // cy.get('[type="button"]').click(); //click forward button
            cy.get(sel.datePicker).click();
            cy.get(sel.eventTime).clear().type('03:45 PM');
            cy.get(sel.eventLocation).type('40, Bahamas Lane, Idi-roko');
            cy.get(sel.numberOfGroups).eq(1).type('4')
           
            cy.findByText('Continue').should('be.enabled');
           
       })
       it('validate that the event description field is does not take letters greater than 300 characters',()=>{
            // login 
            cy.get(sel.signInEmailField).should('be.visible').type('phemii.tester@gmail.com');
            cy.get(sel.signInPasswordField).type(password);
            cy.get(sel.loginButton).should('be.visible').click();
           
            // Create event
            cy.get(sel.eventCreationButton).click();
            cy.get(sel.createNewEventBtn).click();
            cy.get(sel.eventName).type('Olubola')
            cy.get(sel.attachFile).attachFile('validImage.png');
            cy.get(sel.eventDescription).type('The Global Innovation & Technology Summit 2025 is a premier gathering of industry leaders, entrepreneurs, and tech enthusiasts focused on the future of digital transformation. This event will feature keynote speakers, interactive workshops, and panel discussions covering AI, fintech, cybersecurity, and business automation. Attendees will gain insights into emerging trends, network with experts, and explore groundbreaking solutions that drive business growth. Whether youre a startup, investor, or industry veteran, the summit offers a unique opportunity to connect, learn, and innovate in a rapidly evolving digital landscape. Dont miss out on shaping the future of technology!')
            cy.get(sel.eventDate).click();
            cy.get(sel.calendarForwardButton).click();
            // cy.get('[type="button"]').click(); //click forward button
            cy.get(sel.datePicker).click();
           //  Check the error display on the maximum description 
           cy.get(sel.invalidErrorResponse).should('be.visible').and('have.text','Description must have a maximum of 300 characters.')
            cy.get(sel.eventTime).clear().type('03:45 PM');
            cy.get(sel.eventLocation).type('40, Bahamas Lane, Idi-roko');
            cy.get(sel.numberOfGroups).eq(1).type('4')
           
            cy.findByText('Continue').should('be.disabled');
           
       })
       it('validate that date is compulsory',()=>{
            // login 
        cy.get(sel.signInEmailField).should('be.visible').type('phemii.tester@gmail.com');
        cy.get(sel.signInPasswordField).type(password);
        cy.get(sel.loginButton).should('be.visible').click();
       
        // Create event
        cy.get(sel.eventCreationButton).click();
        cy.get(sel.createNewEventBtn).click();
        cy.get(sel.eventName).type('Olaitan')
        cy.get(sel.attachFile).attachFile('validImage.png');
        cy.get(sel.eventDescription).type('We cordially invite you to our glorious wedding.')
        cy.get(sel.eventDate).clear();
        cy.get(sel.eventTime).clear().type('03:45 PM');
        cy.get(sel.eventLocation).type('40, Bahamas Lane, Idi-roko');
        cy.get(sel.numberOfGroups).eq(1).type('4')
       //  Check the error display on time field required. 
       cy.get(sel.invalidErrorResponse).should('be.visible').and('have.text','This field is required.')
       cy.findByText('Continue').should('be.disabled');
       
       })
       it('validate that the event time is compulsory',()=>{
            // login 
        cy.get(sel.signInEmailField).should('be.visible').type('phemii.tester@gmail.com');
        cy.get(sel.signInPasswordField).type(password);
        cy.get(sel.loginButton).should('be.visible').click();
       
        // Create event
        cy.get(sel.eventCreationButton).click();
        cy.get(sel.createNewEventBtn).click();
        cy.get(sel.eventName).type('Olaitan2020')
        cy.get(sel.attachFile).attachFile('validImage.png');
        cy.get(sel.eventDescription).type('We cordially invite you to our glorious wedding.')
        cy.get(sel.eventDate).click();
        cy.get(sel.calendarForwardButton).click();
        // cy.get('[type="button"]').click(); //click forward button
        cy.get(sel.datePicker).click();
        cy.get(sel.eventTime).clear();
        cy.get(sel.eventLocation).type('40, Bahamas Lane, Idi-roko');
        cy.get(sel.numberOfGroups).eq(1).type('4')
       //  Check the error display on time field required. 
       cy.get(sel.invalidErrorResponse).should('be.visible').and('have.text','This field is required.')
       cy.findByText('Continue').should('be.disabled');
       
       })
       
       it('validate that event location is is required',()=>{
           // login 
           cy.get(sel.signInEmailField).should('be.visible').type('phemii.tester@gmail.com');
           cy.get(sel.signInPasswordField).type(password);
           cy.get(sel.loginButton).should('be.visible').click();
          
           // Create event
           cy.get(sel.eventCreationButton).click();
           cy.get(sel.createNewEventBtn).click();
           cy.get(sel.eventName).type('Olaitan2020')
           cy.get(sel.attachFile).attachFile('validImage.png');
           cy.get(sel.eventDescription).type('We cordially invite you to our glorious wedding.')
           cy.get(sel.eventDate).click();
           cy.get(sel.calendarForwardButton).click();
           // cy.get('[type="button"]').click(); //click forward button
           cy.get(sel.datePicker).click();
           cy.get(sel.eventTime).clear().type('3:45 PM');
           cy.get(sel.numberOfGroups).eq(1).type('4').click();
           cy.findByText('Continue').should('be.disabled');
          
       });
       it('validate that the event image is optional',()=>{
            // login 
            cy.get(sel.signInEmailField).should('be.visible').type('phemii.tester@gmail.com');
            cy.get(sel.signInPasswordField).type(password);
            cy.get(sel.loginButton).should('be.visible').click();
           
            // Create event
            cy.get(sel.eventCreationButton).click();
           cy.get(sel.createNewEventBtn).click();
            cy.get(sel.eventName).type('Olaitan2020')
            cy.get(sel.eventDescription).type('We cordially invite you to our glorious wedding.')
            cy.get(sel.eventDate).click();
            cy.get(sel.calendarForwardButton).click();
            // cy.get('[type="button"]').click(); //click forward button
            cy.get(sel.datePicker).click();
            cy.get(sel.eventTime).clear().type('3:45 PM');
            cy.get(sel.eventLocation).type('40, Bahamas Lane, Idi-roko');
            cy.get(sel.numberOfGroups).eq(1).type('4')
            cy.findByText('Continue').should('be.enabled');
           
       })
       it('validate that the event image uploader does not take in file type other PNG and JPEG',()=>{
            // login 
            cy.get(sel.signInEmailField).should('be.visible').type('phemii.tester@gmail.com');
            cy.get(sel.signInPasswordField).type(password);
            cy.get(sel.loginButton).should('be.visible').click();
           
            // Create event
            cy.get(sel.eventCreationButton).click();
           cy.get(sel.createNewEventBtn).click();
            cy.get(sel.eventName).type('Olaitan2020')
            cy.get(sel.attachFile).attachFile('invalidImageFormat.pdf');
            cy.get(sel.eventDescription).type('We cordially invite you to our glorious wedding.')
            cy.get(sel.eventDate).click();
            cy.get(sel.calendarForwardButton).click();
            // cy.get('[type="button"]').click(); //click forward button
            cy.get(sel.datePicker).click();
            cy.get(sel.eventTime).clear().type('3:45 PM');
            cy.get(sel.eventLocation).type('40, Bahamas Lane, Idi-roko');
            cy.get(sel.numberOfGroups).eq(1).type('4')
            cy.findByText('Continue').click();
            cy.wait(5000)
           //  Check the error toast saying the cover image must be PNG or JPEG. 
           cy.get(sel.coverImageErrorResp).should('be.visible').and('have.text','Cover image must be a valid image type (JPEG or PNG)')
           
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
        cy.findByText('Events').click();
        cy.createEventSuccessfully();
        cy.visit('https://event-parcel.vercel.app/dashboard/events');
        cy.get(sel.eventMenuButton).first().click();
        cy.findByText('Delete Event').click();
        cy.findByText('Delete').click();
    })
    
    it('Host tries to disable an active event where at least one guest has made a payment',()=>{
        cy.successfulLogin();
        cy.findByText('Events').click();
        cy.findByText('My Event').scrollIntoView().click();
        cy.get(sel.menuButton).last().click();
        cy.findByText('Disable Event').click();
        cy.findByText('Event with active guest cannot be disabled').should('be.visible');
    
    })

    it('successfully update the event name',()=>{
        cy.successfulLogin();
        cy.get(sel.eventCreationButton).click();
        cy.get(sel.createdEventTitle).eq(0).click();
        cy.wait(3000)
        cy.get(sel.menuOption).click();
        cy.findByText(sel.editEvent).click();
        cy.get(sel.eventName).clear().type('OluBola2026',{force:true});
        cy.get(sel.createEventButton).click()
        cy.findByText('OluBola2026').should('be.visible');

    })
    
    it('validate that host cannot update event without filling out any of the compulsory fields',()=>{
      cy.successfulLogin();
      cy.get(sel.eventCreationButton).click();
      cy.get(sel.createdEventTitle).eq(0).click();
      cy.wait(3000)
      cy.get(sel.menuOption).click();
      cy.findByText(sel.editEvent).click();
      cy.get(sel.eventName).clear();
      cy.get('body').click();
      cy.findByText('This field is required.').should('be.visible');
      cy.findByText('Continue').should('be.disabled')
    })
    it.only('validate that host cannot update event whose date has passed',()=>{
      cy.successfulLogin();
      cy.findByText('Events').click();
      cy.findByText('My Event').scrollIntoView().click();
      cy.get(sel.menuButton).last().click();
      cy.findByText(sel.editEvent).click();
      cy.findByText('You cannot edit an event that has passed').should('be.visible');
    })

    it("validate that the group name is required", () => {
        cy.successfulLogin();
        cy.createEventSuccessfully();
        cy.get(sel.continueToGroupButton).click();
        // create group
        cy.get(sel.groupName).type("  ");
        cy.get("body").click();
        cy.get(sel.invalidGroupErrorResponse)
          .should("be.visible")
          .and("have.text", "Group name is required");
        cy.get(sel.groupDescription).type("These are my very own Aso Ebi friends");
        // select Naira currency
        cy.get(sel.currencyDropdown).click();
        cy.get(sel.secondNairaOption).click();
        cy.get(sel.mainContinueButton).should("be.disabled");
      });
    
      it("validate that the group title field does not take more than 60 character", () => {
        cy.successfulLogin();
        cy.createEventSuccessfully();
        // create group
        cy.get(sel.continueToGroupButton).click();
    
        cy.get(sel.groupName).type(
          "Global Innovation Summit: Transforming Businesses Through Technology and Collaboration"
        );
        cy.get("body").click();
        cy.get(sel.invalidGroupErrorResponse)
          .should("be.visible")
          .and("have.text", "Group name must not exceed 60 characters");
        cy.get(sel.groupDescription).type("These are my very own Aso Ebi friends");
        // select Naira currency
        cy.get(sel.currencyDropdown).click();
        cy.get(sel.secondNairaOption).click();
        cy.get(sel.mainContinueButton).should("be.disabled");
      });
    
      it("validate that the group description field is optional", () => {
        cy.successfulLogin();
        cy.createEventSuccessfully();
        // create group
        cy.get(sel.continueToGroupButton).click();
    
        cy.get(sel.groupName).type("Aso Ebi");
        // cy.get(sel.groupDescription).type('These are my very own Aso Ebi friends');
        // select Naira currency
        cy.get(sel.currencyDropdown).click();
        cy.get(sel.secondNairaOption).click();
        cy.get(sel.mainContinueButton).should("be.enabled");
      });
    
      it("validate that the description field does not take more than 150 characters", () => {
        cy.successfulLogin();
        cy.createEventSuccessfully();
        // create group
        cy.get(sel.continueToGroupButton).click();
    
        cy.get(sel.groupName).type("Aso Ebi");
        cy.get(sel.groupDescription).type(
          'The Global Innovation & Technology Summit 2025" is a premier gathering of industry leaders, entrepreneurs, and tech enthusiasts focused on the future of digital transformation. This event will feature keynote speakers, interactive workshops, and panel discussions covering AI, fintech, cybersecurity, and business automation. Attendees will gain insights into emerging trends, network with experts, and explore groundbreaking solutions that drive business growth.'
        );
        cy.get("body").click();
        cy.get(sel.invalidGroupErrorResponse)
          .should("be.visible")
          .and("have.text", "Description must not exceed 150 characters");
        // select Naira currency
        cy.get(sel.currencyDropdown).click();
        cy.get(sel.secondNairaOption).click();
        cy.get(sel.mainContinueButton).should("be.disabled");
      });
    
      it("validate that the currency option is compulsory", () => {
        cy.successfulLogin();
        cy.createEventSuccessfully();
        // create group
        cy.get(sel.continueToGroupButton).click();
    
        cy.get(sel.groupName).type("Aso Ebi");
        cy.get(sel.groupDescription).type("Our very special day");
        // Currency not selected
        cy.get(sel.mainContinueButton).should("be.disabled");
      });
    
      it("validate the package title is required", () => {
        cy.successfulLogin();
        cy.createEventSuccessfully();
        cy.addNairaGroupSuccessfully();
        // Add package
        cy.get(sel.createPackage).click();
        cy.get(sel.attachFile).attachFile("validImage.png");
        cy.get(sel.packageName).type("  ");
        cy.get("body").click();
        cy.get(sel.invalidErrorResponse)
          .should("be.visible")
          .and("have.text", "Title is required.");
      });
    
      it("validate that the package image is compulsory", () => {
        cy.successfulLogin();
        cy.createEventSuccessfully();
        cy.addNairaGroupSuccessfully();
        // Add package
        cy.get(sel.createPackage).click();
        // cy.get(sel.attachFile).attachFile('validImage.png');
        cy.get(sel.packageName).type("Fila");
        cy.get(sel.packageDescription).type("Gele for my special ladies");
        cy.get(sel.packagePrice).type("5000");
        cy.get(sel.packageQuantity).type("15");
        // select pickup
        cy.get(sel.pickupOption).click();
        cy.get(sel.selectBoxDropdown).click();
        cy.findByText('Small Box').click();
        cy.findAllByRole('button', { name: 'Create Package' }).last().click({force:true});
        cy.get(sel.noPackageImageErrorResp)
          .should("be.visible")
          .and("have.text", "No images were uploaded");
      });
    
      it("validate that users cannot upload image file greater than 5 mb", () => {
        cy.successfulLogin();
        cy.createEventSuccessfully();
        cy.addNairaGroupSuccessfully();
        // Add package
        cy.get(sel.createPackage).click();
        cy.get(sel.attachFile).attachFile("invalidImage1.xlsx");
        cy.get(sel.attachFile).attachFile("invalidImage2.webp");
        cy.get(sel.attachFile).attachFile("invalidImage3.pdf");
        cy.get(sel.attachFile).attachFile("invalidImage4.svg");
        cy.get(sel.packageName).type("Fila");
        cy.get(sel.packageDescription).type("Gele for my special ladies");
        cy.get(sel.packagePrice).type("5000");
        cy.get(sel.packageQuantity).type("15");
        // select pickup
        cy.get(sel.pickupOption).click();
        cy.get(sel.selectBoxDropdown).click();
        cy.findByText('Small Box').click();
        cy.findAllByRole('button', { name: 'Create Package' }).last().click({force:true});
        cy.get(sel.noPackageImageErrorResp)
          .should("be.visible")
          .and(
            "have.text",
            "File size too large. Please upload a file less than 5MB."
          );
      });
    
      it("validate that the price field is required", () => {
        cy.successfulLogin();
        cy.createEventSuccessfully();
        cy.addNairaGroupSuccessfully();
        // Add package
        cy.get(sel.createPackage).click();
        cy.get(sel.attachFile).attachFile("validImage.png");
        cy.get(sel.packageName).type("Fila");
        cy.get(sel.packageDescription).type("Gele for my special ladies");
        cy.get(sel.packageQuantity).type("15");
        // select pickup
        cy.get(sel.pickupOption).click();
        cy.get(sel.selectBoxDropdown).click();
        cy.findByText('Small Box').click();
        cy.findAllByRole('button', { name: 'Create Package' }).last().click({force:true});
      });
    
      it("validate that the quantity field is not required", () => {
        cy.successfulLogin();
        cy.createEventSuccessfully();
        cy.addNairaGroupSuccessfully();
        // Add package
        cy.get(sel.createPackage).click();
        cy.get(sel.attachFile).attachFile("validImage.png");
        cy.get(sel.packageName).type("Fila");
        cy.get(sel.packageDescription).type("Gele for my special ladies");
        cy.get(sel.packagePrice).type("5000");
        // select pickup
        cy.get(sel.pickupOption).click();
        cy.get(sel.selectBoxDropdown).click();
        cy.findByText('Small Box').click();
        cy.findAllByRole('button', { name: 'Create Package' }).last().click({force:true});
      });

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
        cy.findByText('Group disabled successfully')
        cy.wait(4000);  
    })
    it('Share link" button becomes disabled immediately with tooltip: "You cannot share links to an inactive group.',()=>{
        cy.findAllByRole('button', { name: 'Send Invite' }).click({force:true});
        cy.get(sel.eventMenuButton).click();
        // cy.findAllByRole('alert', { name: 'Toastify__toast Toastify__toast-theme--light Toastify__toast--warning' }).should('be.visible').and('have.text','This action is not allowed on a disabled group');
        cy.findByText('Delete Event').click();
        cy.findByText('Delete').click();
    })
    it.only('validate Guest attempts to access the disabled group via shared link',()=>{
        cy.visit('https://event-parcel.vercel.app/preview?code=im7nqrja')
        cy.wait(3000)
        cy.findByText('This group is not accepting payments at this time.').should('be.visible');
    })
})