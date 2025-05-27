describe('it validates the requirements for event update',()=>{
    let sel;
    let password = "Hbon@1234";
    const serverId = "zbfbnq90";
  
    const userName = Math.random().toString(36).substring(2, 8);
    const testEmail = `${userName}@${serverId}.mailosaur.net`;
    beforeEach(() => {
        cy.visit("/");
        cy.fixture("selectors").then((selectors) => {
          sel = selectors;
        });
      });

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

})