Feature: Profile Creation on Event Parcel WebApp

    Scenario: Validate email format
    Given the user enters an invalid email format @gmail.com
    When the user tries to proceed
    Then an error message should be displayed: Invalid email format. Please enter a valid email.

    Scenario: Validate email format
    Given the user enters an invalid email format username@
    When the user tries to proceed
    Then an error message should be displayed: Invalid email format. Please enter a valid email.

    Scenario: Validate email format
    Given the user enters an invalid email format usernamegmail.com
    When the user tries to proceed
    Then an error message should be displayed: Invalid email format. Please enter a valid email.

    Scenario: Validate phone number format based on country
    Given the user selects Nigeria as the country
    And enters a phone number +2344659874
    When the user tries to proceed
    Then an error message should be displayed: Invalid phone number length for selected country.

    Scenario: Validate password requirements
    Given the user enters a password password@123
    When the user tries to proceed
    Then an error message should be displayed: Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.

    Scenario: Validate password requirements
    Given the user enters a password Password123
    When the user tries to proceed
    Then an error message should be displayed: Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.

    Scenario: Validate password requirements
    Given the user enters a password Password@
    When the user tries to proceed
    Then an error message should be displayed: Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.

    Scenario: Validate password requirements
    Given the user enters a password PASSWORD@123
    When the user tries to proceed
    Then an error message should be displayed: Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.

    Scenario: Validate password confirmation
    Given the user enters Password@1234 in the password field
    And enters PASSWORD@1234 in the confirm password field
    When the user tries to proceed
    Then an error message should be displayed: Passwords do not match.

    

