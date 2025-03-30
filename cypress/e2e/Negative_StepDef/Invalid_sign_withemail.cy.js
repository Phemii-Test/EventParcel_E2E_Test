
    describe('validate that signin with invalid credentials',()=>{
        let sel
        let password = 'Hbon@1234'
        beforeEach(()=>{
            cy.visit('/')
            cy.fixture('selectors').then((selectors)=>{
                sel=selectors
            });
        })

        it('validate the sign in with incorrect email address',()=>{
            cy.get(sel.signInEmailField).type('phester@gmail.com');
            cy.get(sel.signInPasswordField).type(password);
            cy.get(sel.loginButton).should('be.visible').click();
            cy.get('[class="Toastify__toast Toastify__toast-theme--light Toastify__toast--error"]',{ timeout: 10000 }).should('be.visible').and('have.text','User not found')
         });

         it('validate the sign in with incorrect password',()=>{
            cy.get(sel.signInEmailField).type('phemii.tester@gmail.com');
            cy.get(sel.signInPasswordField).type('hbon1234@');
            cy.get(sel.loginButton).should('be.visible').click();
            cy.get(sel.invalidLoginToastRespons,{ timeout: 5000 }).should('be.visible').and('have.text','Password must contain lowercase, uppercase, numbers, and special characters')
         });

         it('validate the sign in with incorrect password and email',()=>{
            cy.get(sel.signInEmailField).type('tester@gmail.com');
            cy.get(sel.signInPasswordField).type('hbon1234@');
            cy.get(sel.loginButton).should('be.visible').click();
            cy.get(sel.invalidLoginToastRespons, { timeout: 5000 }).should('be.visible').and('have.text','Password must contain lowercase, uppercase, numbers, and special characters')
         });

         it('validate that the password field is case sensitive',()=>{
            cy.get(sel.signInEmailField).type('phemii.tester@gmail.com');
            cy.get(sel.signInPasswordField).type('hbon@1234');
            cy.get(sel.loginButton).should('be.visible').click();
            cy.get(sel.invalidLoginToastRespons, { timeout: 5000 }).should('be.visible').and('have.text','Password must contain lowercase, uppercase, numbers, and special characters')
         });

         it('validate that those who signup with socails cannot sign in with password',()=>{
            cy.get(sel.signInEmailField).type('ohlufehmii@gmail.com');
            cy.get(sel.signInPasswordField).type(password);
            cy.get(sel.loginButton).should('be.visible').click();
            cy.get(sel.invalidLoginToastRespons,{ timeout: 5000 }).should('be.visible').and('have.text','Account registered via social login. Please sign in using your Google, Facebook or Apple account.')
         });

    })