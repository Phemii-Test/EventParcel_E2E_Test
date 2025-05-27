describe('validate the forgot password edge cases',()=>{
    let password = "Hbon@1234";
    let sel;
    const serverId='tfs9ad1h'
    const testEmail = '9qlrm4@tfs9ad1h.mailosaur.net'

    beforeEach(() => {
      cy.on('uncaught:exception', () => {
        return false
      })
      cy.visit('/');
    });

    it('validates the reset password functionality with unregistered email',()=>{
        cy.findByText('Forgot Password?').click();
        cy.findByPlaceholderText('Enter your email').type('the@gmail.com')
        cy.findByText('Send Reset Link').click();
        cy.findByText('User not found!')
    })
    it('validates that users gets an OTP with the Reset password functionality',()=>{
        cy.findByText('Forgot Password?').click();
        cy.findByPlaceholderText('Enter your email').type('9qlrm4@tfs9ad1h.mailosaur.net')
        cy.findByText('Send Reset Link').click();
        cy.wait(5000)
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
        cy.findByText('Forgot Password?').click();
        cy.findByPlaceholderText('Enter your email').type('9qlrm4@tfs9ad1h.mailosaur.net')
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
        cy.findByPlaceholderText('New Password').type('password');
        cy.findByPlaceholderText('Confirm Password').type(password);
        cy.findByText('Reset Password').click();

    })
    })

})