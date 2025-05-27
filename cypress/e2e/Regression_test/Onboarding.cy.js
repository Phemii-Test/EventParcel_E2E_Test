describe("Test the onboarding functionality", () => {
    let password = "Hbon@1234";
    let newPassword = "Hbon@1111";
    let sel;
    const serverId='tfs9ad1h'

    beforeEach(() => {
        cy.fixture('selectors').then((selectors)=>{
            sel=selectors
        })
      cy.on('uncaught:exception', () => {
        return false
      })
      cy.visit('/');
    });
//   SignUp 
    it("Validate that the required fields are displayed.", () => {
      cy.displayAllRequiredFields();
    });
  
    it("validates that the signup button is disabled when first name is not filled", () => {
      cy.emptyFirstNameField();
    });
  
    it("validates that the signup button is disabled when last name is not filled", () => {
      cy.emptyLastNameField();
    });
  
    it("validates that the signup button is disabled when email is not filled", () => {
      cy.emptyEmailField();
    });
  
    it("validates that the signup button is disabled when mobile number is not filled", () => {
      cy.emptyMobileNumField();
    });
  
    it("validates that the signup button is disabled when password is not filled", () => {
      cy.emptyPasswordField();
    });
  
    it("validates that the proceed button is enabled when all info is filled", () => {
      cy.allSignupFieldFilled();
    });
  
    it("validates that the proceed button is enabled when all info is filled", () => {
      cy.successfulSignUpForm();
    });
    it('Validate signup with OTP',()=>{
      cy.signUpWithOTP();
    })
    it('Validate signup with email link verification',()=>{
      cy.signUpWithEmailVerificationLink();
  });
  
  it('validate signup with used OTP',()=>{
    cy.signupWithUseddOTP();
  })
  it("validates the error displayed when @gmail is entered in the email", () => {
    cy.noUsernameError();
  });

  it("validates the error displayed when no domain is added to email", () => {
    cy.NoDomainError();
  });

  it("validates the error displayed when @ is not added on the email", () => {
    cy.noSymbolError();
  });
  it("validates phone number functionality with number with less required length", () => {
    cy.invalidMobileNumberError();
  });

  it("validates password functionality by adding password without upperCase", () => {
    cy.noUpperCaseInPasswordError();
  });
  it("validates password functionality by adding password without LowerCase", () => {
    cy.noLowerCaseInPasswordError();
  });

  it("validates password functionality by adding password without Special character", () => {
    cy.noSpecialcharacterInPasswordError();
  });

  it("validates password functionality by adding password without a number", () => {
    cy.noNumberInPasswordError();
  });

  it("validates password functionality by adding password with character less than 8", () => {
    cy.passwordWithShortLengthError();
  });

//   Login

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

 it('validates the reset password functionality with unregistered email',()=>{
    cy.findByText('Forgot Password?').click();
    cy.findByPlaceholderText('Enter your email').type('the@gmail.com')
    cy.findByText('Send Reset Link').click();
    cy.findByText('User not found!')
})
it('validates that users gets an OTP with the Reset password functionality',()=>{
    const testEmail = '9qlrm4@tfs9ad1h.mailosaur.net'
    cy.findByText('Forgot Password?').click();
    cy.findByPlaceholderText('Enter your email').type('9qlrm4@tfs9ad1h.mailosaur.net')
    cy.findByText('Send Reset Link').click();
    cy.wait(10000)
    cy.mailosaurListMessages(Cypress.env("MAILOSAUR_SERVER_ID"), {
        sentTo: testEmail,
      })
        .then((result) => {
          const latestMessage = result.items[0];
          return cy.mailosaurGetMessageById(latestMessage.id);
        })
        .then((email) => {
          cy.get(email.html.body);
          expect(email.subject).to.equal("Kindly reset your password");
          expect(email.from[0].name).to.equal("Event Parcel Team");
          expect(email.from[0].email).to.equal("noreply@eventparcel.com");
  
          const div = document.createElement("div");
          div.innerHTML = email.html.body;
          const plainText = div.innerText;
          expect(plainText).to.include(
            "Below is your One Time Password (OTP) to reset your password."
          );
        });
});

it('validate that users reset password succesfully',()=>{
    const testEmail = '9qlrm4@tfs9ad1h.mailosaur.net'
    cy.findByText('Forgot Password?').click();
    cy.findByPlaceholderText('Enter your email').type(testEmail)
    cy.findByText('Send Reset Link').click();
    cy.wait(10000)
    cy.mailosaurListMessages(Cypress.env('MAILOSAUR_SERVER_ID'), {
        sentTo: testEmail
      }).then((result) => {
        const latestMessage = result.items[0];
        return cy.mailosaurGetMessageById(latestMessage.id);
      })
        .then((email)=>{
        cy.log(email.html.body); 
        const parser = new DOMParser();
        const doc = parser.parseFromString(email.html.body, "text/html");
      
        const otpElement = doc.querySelector('strong'); 
        const otp = otpElement ? otpElement.textContent.replace(/\D/g, "").trim() : null;
        cy.get('[id^="otp-"]').each(($el, index) => {
      cy.wrap($el).type(otp[index]); 
    });
    cy.findByText('Reset Your Password').should('be.visible');
    cy.findByPlaceholderText('New Password').type(password);
    cy.findByPlaceholderText('Confirm Password').type(password);
    cy.findByText('Reset Password').click();

    

})
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

  it('validates new password meets password requirement',()=>{
    cy.successfulLogin();
    cy.findByText('FT').click();
    cy.findByText('Change Password').click();
    cy.get(sel.resetPasswordField).eq(0).type(password)
    cy.get(sel.resetPasswordField).eq(1).type('hbon@1234')
    cy.get(sel.resetPasswordField).eq(2).type('hbon@1234')
    cy.findAllByRole('button', { name: 'Change Password' }).last().click({force:true});
    cy.findByText('Password must contain lowercase, uppercase, numbers, and special characters').should('be.visible');
  })
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

  });