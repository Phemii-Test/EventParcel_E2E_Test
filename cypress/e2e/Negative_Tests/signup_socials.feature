Feature: Invalid signup with social account

 Scenario: Failed authentication via Google login
    Given the user is on the profile creation page
    When the user clicks on "Sign up with Google"
    Then the system should redirect the user to the Google authentication page
    When the authentication fails
    Then the user should be redirected to the app landing page

    Scenario: Failed authentication via Facebook login
    Given the user is on the profile creation page
    When the user clicks on "Sign up with Facebook"
    Then the system should redirect the user to the Facebook authentication page
    When the authentication fails
    Then the user should be redirected to the app landing page

    Scenario: Failed authentication via Apple login
    Given the user is on the profile creation page
    When the user clicks on "Sign up with Apple"
    Then the system should redirect the user to the Apple authentication page
    When the authentication fails
    Then the user should be redirected to the app landing page

    Scenario: User cancels third-party authentication
    Given the user is on the profile creation page
    When the user clicks on "Sign up with Google"
    Then the system should redirect the user to the Google authentication page
    When the user cancels the authentication process
    Then the user should be redirected to the app landing page