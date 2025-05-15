describe("validate the invalid sign up functionality", () => {
  let password = "Hbon@1234";
  let sel;

  beforeEach(() => {
    cy.on('uncaught:exception', () => {
      return false
    })
    cy.visit("/");
  });

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


});

/*

// Validate invalid email handle
Given('the user are on the signup page', () => {
  
});

When('the user enters an invalid email format @gmail.com', () => {
})
Then('an error message should be displayed: Invalid email format. Please enter a valid email.', () => {
  
});

// Validate invalid email handle
Given('the user enters an invalid email format username@', () => {
	return true;
});

When('the user tries to proceed', () => {
	return true;
});

Then('an error message should be displayed: Invalid email format. Please enter a valid email.', () => {
	return true;
});


// Validate invalid email handle
Given('the user enters an invalid email format usernamegmail.com', () => {
	return true;
});

When('the user tries to proceed', () => {
	return true;
});

Then('an error message should be displayed: Invalid email format. Please enter a valid email.', () => {
	return true;
});


// Validate invalid mobile number
Given('the user selects Nigeria as the country', () => {
	return true;
});

Then('enters a phone number +2344659874', () => {
	return true;
});

When('the user tries to proceed', () => {
	return true;
});

Then('an error message should be displayed: Invalid phone number length for selected country.', () => {
	return true;
});


// Validate invalid password handle
Given('the user enters a password password@1234', () => {
	return true;
});

When('the user tries to proceed', () => {
	return true;
});

Then('an error message should be displayed: Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.', () => {
	return true;
});


// Validate invalid password handle
Given('the user enters a password Password123', () => {
	return true;
});

When('the user tries to proceed', () => {
	return true;
});

Then('an error message should be displayed: Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.', () => {
	return true;
});


// Validate invalid password handle
Given('the user enters a password Password@', () => {
	return true;
});

When('the user tries to proceed', () => {
	return true;
});

Then('an error message should be displayed: Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.', () => {
	return true;
});


// Validate invalid password handle
Given('the user enters a password PASSWORD@123', () => {
	return true;
});

When('the user tries to proceed', () => {
	return true;
});

Then('an error message should be displayed: Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.', () => {
	return true;
});


// Validate invalid password handle
Given('the user enters Password@1234 in the password field$', () => {
	return true;
});

Then('enters PASSWORD@1234 in the confirm password field$', () => {
	return true;
});

When('the user tries to proceed', () => {
	return true;
});

Then('an error message should be displayed: Passwords do not match.', () => {
	return true;
});
*/
