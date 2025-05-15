describe('validate every possible edge cases for guest',()=>{
    let sel
let password = 'Hbon@1234'

    beforeEach(()=>{
        cy.on('uncaught:exception', () => {
            return false
          })
    cy.fixture('selectors').then((selectors)=>{
        sel=selectors
    })
})

it('If an event is disabled, accessing the link redirects to “This event is not available at the moment.',()=>{
    cy.visit('https://event-parcel.vercel.app/preview?code=p7nxei9z')
    cy.findByText('No event data found').should('be.visible');
})
it('If an event is deleted, accessing the link redirects to “This event is not available at the moment.',()=>{
    cy.visit('https://event-parcel.vercel.app/preview?code=86abl2gx')
    cy.findByText('No event data found').should('be.visible');
})

})