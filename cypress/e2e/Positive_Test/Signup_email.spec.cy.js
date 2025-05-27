
describe("validate the valid sign up functionality", () => {

  beforeEach(() => {
    cy.on('uncaught:exception', () => {
      return false
    })
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
  it('Validate signup with OTP',()=>{
    cy.signUpWithOTP();
  })
  it('Validate signup with email link verification',()=>{
    cy.signUpWithEmailVerificationLink();
});

it('validate signup with used OTP',()=>{
  cy.signupWithUseddOTP();
})
});
