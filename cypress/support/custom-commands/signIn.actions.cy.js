 
let password = 'Hbon@1234'
let sel
  
  
       beforeEach(()=>{
           cy.fixture('selectors').then((selectors)=>{
            sel=selectors
        })
       })

 Cypress.Commands.add('successfulLogin', () => { 
    cy.get(sel.signInEmailField).clear().type('phemii.tester@gmail.com');
    cy.get(sel.signInPasswordField).type(password);
    cy.get(sel.loginButton).should('be.visible').click();
 })