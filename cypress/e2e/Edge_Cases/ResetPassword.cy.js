describe('validate all possible scenario for the reset password functionality',()=>{
    let password = "Hbon@1234";
    let newPassword = "Hbon@1111"
    let sel
    beforeEach(() => {
        cy.fixture('selectors').then((selectors)=>{
            sel=selectors
        })
        cy.on('uncaught:exception', () => {
          return false
        })
        cy.visit('/');
      });

      it('validate that users are able to change their password succesfully',()=>{
        cy.successfulLogin();
        cy.findByText('FT').click();
        cy.findByText('Change Password').click();
        cy.get(sel.resetPasswordField).eq(0).type(password)
        cy.get(sel.resetPasswordField).eq(1).type(newPassword)
        cy.get(sel.resetPasswordField).eq(2).type(newPassword)
        cy.findAllByRole('button', { name: 'Change Password' }).last().click({force:true});
        cy.findByText('Password changed successfully').should('be.visible');
        cy.findByText('FT').click();
        cy.findByText('Log Out').click();
        cy.wait(3000);
        cy.findByPlaceholderText('Email').clear({force:true}).type('phemii.tester@gmail.com');
        cy.findByPlaceholderText('Password').clear({force:true}).type(newPassword);
        cy.findByText('Sign in with email').click();
        cy.findByText('Dashboard').should('be.visible');
      })
      it('validates invalid current password',()=>{
        cy.successfulLogin();
        cy.findByText('FT').click();
        cy.findByText('Change Password').click();
        cy.get(sel.resetPasswordField).eq(0).type('hbon@34674')
        cy.get(sel.resetPasswordField).eq(1).type(newPassword)
        cy.get(sel.resetPasswordField).eq(2).type(newPassword)
        cy.findAllByRole('button', { name: 'Change Password' }).last().click({force:true});
        cy.findByText('Current password not correct!').should('be.visible');
      })

      it('validates same current and new password',()=>{
        cy.successfulLogin();
        cy.findByText('FT').click();
        cy.findByText('Change Password').click();
        cy.get(sel.resetPasswordField).eq(0).type(password)
        cy.get(sel.resetPasswordField).eq(1).type(password)
        cy.get(sel.resetPasswordField).eq(2).type(password)
        cy.findAllByRole('button', { name: 'Change Password' }).last().click({force:true});
        cy.findByText("Please choose a password that's different from your current one.").should('be.visible');
      })
      it('validates different new and confirmatory password',()=>{
        cy.successfulLogin();
        cy.findByText('FT').click();
        cy.findByText('Change Password').click();
        cy.get(sel.resetPasswordField).eq(0).type(password)
        cy.get(sel.resetPasswordField).eq(1).type(newPassword)
        cy.get(sel.resetPasswordField).eq(2).type('Hbon@2222')
        cy.findAllByRole('button', { name: 'Change Password' }).last().click({force:true});
        cy.findByText('New passwords do not match').should('be.visible');
      })

      it('validates same current and confirmatory password',()=>{
        cy.successfulLogin();
        cy.findByText('FT').click();
        cy.findByText('Change Password').click();
        cy.get(sel.resetPasswordField).eq(0).type(password)
        cy.get(sel.resetPasswordField).eq(1).type(newPassword)
        cy.get(sel.resetPasswordField).eq(2).type(password)
        cy.findAllByRole('button', { name: 'Change Password' }).last().click({force:true});
        cy.findByText('New passwords do not match').should('be.visible');
      })

      it('validates same current and new password',()=>{
        cy.successfulLogin();
        cy.findByText('FT').click();
        cy.findByText('Change Password').click();
        cy.get(sel.resetPasswordField).eq(0).type(password)
        cy.get(sel.resetPasswordField).eq(1).type(password)
        cy.get(sel.resetPasswordField).eq(2).type(newPassword)
        cy.findAllByRole('button', { name: 'Change Password' }).last().click({force:true});
        cy.findByText('New passwords do not match').should('be.visible');
      })

      it.only('validates new password meets password requirement',()=>{
        cy.successfulLogin();
        cy.findByText('FT').click();
        cy.findByText('Change Password').click();
        cy.get(sel.resetPasswordField).eq(0).type(password)
        cy.get(sel.resetPasswordField).eq(1).type('hbon@1234')
        cy.get(sel.resetPasswordField).eq(2).type('hbon@1234')
        cy.findAllByRole('button', { name: 'Change Password' }).last().click({force:true});
        cy.findByText('Password must contain lowercase, uppercase, numbers, and special characters').should('be.visible');
      })

})
