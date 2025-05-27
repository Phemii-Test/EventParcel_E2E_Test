/*

Scenario: Social login user sets a password via reset password route
Given the user registered using social login (Google, Facebook, or Apple)
And the user requests a password reset
When the user sets a new password successfully
Then the user should be able to sign in using both email/password and social login*/

describe('validate the sign in functionality',()=>{
 
    let sel
    let password = 'Hbon@1234'

    beforeEach(()=>{
        cy.on('uncaught:exception', () => {
            return false
          })
        cy.visit('/')
    cy.fixture('selectors').then((selectors)=>{
        sel=selectors
    })
})
    it('Validate that the login button is disabled without any input in the required fields.',()=>{
        cy.get(sel.signInEmailField).should('be.visible');
        cy.get(sel.signInPasswordField).should('be.visible');
        cy.get(sel.loginButton).should('be.visible').and('be.disabled');
    })
    
    it(' Validate that the login button is enabled when all required fields are filled.',()=>{
        cy.get(sel.signInEmailField).type('phemii.tester@gmail.com');
        cy.get(sel.signInPasswordField).type(password);
        cy.get(sel.loginButton).should('be.visible').and('be.enabled');
    })

    it('validate a successful sign in process',()=>{
        cy.get(sel.signInEmailField).type('phemii.tester@gmail.com');
        cy.get(sel.signInPasswordField).type(password);
        cy.get(sel.loginButton).should('be.visible').click();
        cy.findByText('Dashboard').should('be.visible')

    })
    it('validate that the email field is not case sensitive',()=>{
        cy.get(sel.signInEmailField).type('phemII.tesTer@gmail.com');
        cy.get(sel.signInPasswordField).type(password);
        cy.get(sel.loginButton).should('be.visible').click();
        cy.findByText('Dashboard').should('be.visible')

    })

    // it('validate socail login users can request password for sign in',()=>{


    // })
})