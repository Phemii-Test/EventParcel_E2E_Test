Feature: Validate the failed social login

 Scenario Outline: Failed authentication using Google
    Given the user clicks Sign in with Google
    Then the system should redirect the user to the Google authentication page
    When authentication fails due to incorrect credentials or provider error
    Then the system should display the message: Unfortunately, we could not sign you in. Please, check your Google credentials and try again.
    And the user should be redirected to the app landing page

    Scenario Outline: Failed authentication using Facebook
    Given the user clicks Sign in with Facebook
    Then the system should redirect the user to the Facebook authentication page
    When authentication fails due to incorrect credentials or provider error
    Then the system should display the message: Unfortunately, we could not sign you in. Please, check your Google credentials and try again.
    And the user should be redirected to the app landing page

    Scenario Outline: Failed authentication using Apple
    Given the user clicks Sign in with Apple
    Then the system should redirect the user to the Apple authentication page
    When authentication fails due to incorrect credentials or provider error
    Then the system should display the message: Unfortunately, we could not sign you in. Please, check your Google credentials and try again.
    And the user should be redirected to the app landing page