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

    it.only('successfully update the event name',()=>{
        cy.successfulLogin();
        cy.get(sel.eventCreationButton).click();
        cy.get(sel.createdEventTitle).eq(0).click();
        cy.wait(3000)
        cy.get(sel.menuOption).click();
        cy.findByText(sel.editEvent).click();
        cy.get(sel.eventName).clear().type('OluBola2026',{force:true});
        cy.get(sel.createEventButton).click()
        // cy.get(sel.createdEventTitle)

    })
    it('successfully update the event date',()=>{
        
    })
    it('validate that host cannot update event without filling out any of the compulsory fields',()=>{
        
    })
    it('validate that host cannot update event whose date has passed',()=>{
        
    })

})