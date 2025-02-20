
describe("validate the valid sign up functionality", () => {

  beforeEach(() => {
    cy.visit('/');
  });

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
  ``;
  /* 
    it ('validates that the proceed button is enabled when all info is filled',()=>{
        //click the get started button
        cy.get(getStartedButton).should('be.visible').and('have.text','Get Started').click();
        cy.get(firstNameField).type('Tester');
        cy.get(lastNameField).type('Test');
        cy.get(emailField).type(emailAddress);
        cy.get(mobilenumField).type('814737677');
        cy.get(passwordField).type(password);
        cy.get(signupButton).click();

        cy.mailosaurListMessages(serverID)
  .then((result) => {
    const latestMessage = result.items[0];

    return cy.mailosaurGetMessageById(latestMessage.id)
     .then((message) => {
    const emailBody = message.html.body; // Extract the email body
    const otpCode = emailBody.match(/\b\d{6}\b/); // Extract the 6-digit OTP from the email
    cy.log(`Extracted OTP: ${otpCode}`);
  const otpDigits = otpCode.split(""); 
  otpDigits.forEach((digit, index) => {
    cy.get(`#otp-${index}`).type(digit); 
  });
  });  

/*        cy.mailslurp().then(Email => Email.waitForLatestEmail(inboxId, 60000, true))
        .then(email => {
            emailBody = email.body
            const extractor = new DOMParser()
            const doc = extractor.parseFromString(emailBody, "text/html")
            const otp = doc.querySelector('strong').textContent
            cy.get(OTPfield).type(otp)
        });
        */
});
