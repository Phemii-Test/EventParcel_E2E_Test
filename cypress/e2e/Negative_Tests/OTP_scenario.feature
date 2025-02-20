Feature: OTP Validation

    Scenario: Verify the OTP field with invalid code
    Given the user has received an OTP via email
    When the user enters an incorrect OTP within 15 minutes
    Then an error message should be displayed: "Invalid OTP entered! Please enter the correct code."

    Scenario: Used OTP cannot be reused
    Given the user has entered a correct OTP and verified their account
    When the user tries to enter the same OTP again
    Then an error message should be displayed: "OTP already used. Please request a new one."

    Scenario: Resend OTP after 60 seconds
    Given the user has requested an OTP
    When the user tries to request a new OTP before 60 seconds
    Then the "Resend OTP" button should be disabled
    And a countdown timer should be displayed