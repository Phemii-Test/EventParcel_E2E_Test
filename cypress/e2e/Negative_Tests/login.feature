Feature: Nagitive login scenarios

 Scenario: Unsuccessful sign-in with incorrect email
    Given the user enters an incorrect email "wrong@example.com"
    And the user enters a password "P@ssw0rd!"
    When the user clicks "Sign In"
    Then the system should display the message: "Incorrect Username/Password. Please try again"

    Scenario: Unsuccessful sign-in with incorrect password
    Given the user enters a valid email "Tester@gmail.com"
    And the user enters an incorrect password "WrongP@ss!"
    When the user clicks "Sign In"
    Then the system should display the message: "Incorrect Username/Password. Please try again"

    Scenario: Unsuccessful sign-in with both incorrect email and password
    Given the user enters an incorrect email "wrong@example.com"
    And the user enters an incorrect password "WrongP@ss!"
    When the user clicks "Sign In"
    Then the system should display the message: "Incorrect Username/Password. Please try again"

    Scenario: Validate that the Password field is case-sensitive
    Given the user enters a valid email "Tester@gmail.com"
    And the user enters an alternate caps password PAssWoRd@1234"
    When the user clicks "Sign In"
    Then the system should display the message: "Incorrect Username/Password. Please try again"

    Scenario: Social login user cannot sign in with email/password unless they reset password
    Given the user registered using social login (Google, Facebook, or Apple)
    When the user attempts to sign in with email and password
    Then the system should display the message: "Incorrect Username/Password. Please try again"