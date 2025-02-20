Feature: Validate the socail login functionality for existing users

  Scenario: Display social login options on the sign-in page
    Given the user lands on the sign-in page
    Then the user should see the following social login options:
      | Social Login Provider |
      | Sign in with Google   |
      | Sign in with Facebook |
      | Sign in with Apple    |

    Scenario Outline: Successful authentication using Facebook
    Given the user clicks Sign in with Facebook
    Then the system should redirect the user to Facebook authentication page
    When the user enters valid credentials and completes authentication
    Then the system should display the message: You have been signed in successfully.
    And the user should be redirected to the app experience

    Scenario Outline: Successful authentication using Apple
    Given the user clicks Sign in with Apple
    Then the system should redirect the user to the Apple authentication page
    When the user enters valid credentials and completes the authentication
    Then the system should display the message: You have been signed in successfully.
    And the user should be redirected to the app experience

    Scenario Outline: Successful authentication using Google
    Given the user clicks Sign in with Google
    Then the system should redirect the user to Google authentication page
    When the user enters valid credentials and completes authentication
    Then the system should display the message: You have been signed in successfully.
    And the user should be redirected to the app experience

