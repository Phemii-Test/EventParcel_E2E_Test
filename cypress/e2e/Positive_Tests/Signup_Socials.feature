Feature: Positive signup using social login

  Scenario: Display social login options on the profile creation page
    Given the user lands on the profile creation page
    Then the user should see the following social login options:
      | Social Login Option |
      | Google             |
      | Facebook           |
      | Apple              |
    And the user should see a message under the sign-up buttons stating that proceeding means consenting to the terms and conditions

    Scenario: Successful authentication via Google login
    Given the user is on the profile creation page
    When the user clicks on "Sign up with Google"
    Then the system should redirect the user to the Google authentication page
    When the user selects an account and successfully authenticates
    Then the user should be redirected to the app experience

    Scenario: Successful authentication via Facebook login
    Given the user is on the profile creation page
    When the user clicks on "Sign up with Facebook"
    Then the system should redirect the user to the Facebook authentication page
    When the user successfully authenticates
    Then the user should be redirected to the app experience

     Scenario: Successful authentication via Apple login
    Given the user is on the profile creation page
    When the user clicks on "Sign up with Apple"
    Then the system should redirect the user to the Apple authentication page
    When the user successfully authenticates
    Then the user should be redirected to the app experience