Feature: Verify the sign up process with email link

 Scenario: Fill every required field
    Given the user has filled all required fields correctly
    And has checked the terms and conditions checkbox
    When the user clicks the "Proceed" button
    Then the user should see an interface to enter the OTP

    Scenario: Verify account using email link
    Given the user has received an email with a verification link
    When the user clicks the link
    Then the system should confirm the account as verified
    And the user should be redirected to the app