describe('validate the negative scenarios for create event functionality',()=>{

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

})