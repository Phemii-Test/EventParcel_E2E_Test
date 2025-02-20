
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
            cy.get(sel.invalidLoginToastRespons,{ timeout: 10000 }).should('be.visible').and('have.text','Incorrect email/Password. Please try again')
         });

         it('validate the sign in with incorrect password',()=>{
            cy.get(sel.signInEmailField).type('phemii.tester@gmail.com');
            cy.get(sel.signInPasswordField).type('hbon1234@');
            cy.get(sel.loginButton).should('be.visible').click();
            cy.get(sel.invalidLoginToastRespons,{ timeout: 5000 }).should('be.visible').and('have.text','Incorrect email/Password. Please try again')
         });

         it('validate the sign in with incorrect password and email',()=>{
            cy.get(sel.signInEmailField).type('tester@gmail.com');
            cy.get(sel.signInPasswordField).type('hbon1234@');
            cy.get(sel.loginButton).should('be.visible').click();
            cy.get(sel.invalidLoginToastRespons, { timeout: 5000 }).should('be.visible').and('have.text','Incorrect email/Password. Please try again')
         });

         it('validate that the password field is case sensitive',()=>{
            cy.get(sel.signInEmailField).type('phemii.tester@gmail.com');
            cy.get(sel.signInPasswordField).type('hbon@1234');
            cy.get(sel.loginButton).should('be.visible').click();
            cy.get(sel.invalidLoginToastRespons, { timeout: 5000 }).should('be.visible').and('have.text','Incorrect email/Password. Please try again')
         });

         it('validate that those who signup with socails cannot sign in with password',()=>{
            cy.get(sel.signInEmailField).type('ohlufehmii@gmail.com');
            cy.get(sel.signInPasswordField).type(password);
            cy.get(sel.loginButton).should('be.visible').click();
            cy.get(sel.invalidLoginToastRespons,{ timeout: 5000 }).should('be.visible').and('have.text','Incorrect email/Password. Please try again')
         });

    })