Feature: Valid login 

  Scenario: Display sign-in form with required fields
    Given the user lands on the sign-in page
    Then the user should see the following fields:
      | Field Name    | Type          | Required |
      | Email Address | Alpha-numeric | Yes      |
      | Password      | Alpha-numeric | Yes      |
    And the "Sign In" button should be disabled

    Scenario: Enable sign-in button when email and password are entered
    Given the user enters an email "user@example.com"
    And the user enters a password "P@ssw0rd!"
    Then the "Sign In" button should be enabled

    Scenario: Successful sign-in with valid email and password
    Given the user enters a valid email "Tester@gmail.com"
    And the user enters the correct password Password@1234"
    When the user clicks "Sign In"
    Then the system should display the message: "Congratulations. You are in!"
    And the user should be redirected to the app experience

    Scenario: Social login user sets a password via reset password route
    Given the user registered using social login (Google, Facebook, or Apple)
    And the user requests a password reset
    When the user sets a new password successfully
    Then the user should be able to sign in using both email/password and social login