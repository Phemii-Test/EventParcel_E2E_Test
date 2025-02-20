Feature: Profile Creation on Event Parcel WebApp

  Scenario: Display profile creation form with required fields
    Given the user lands on the profile creation page
    Then the user should see a form with the following fields:
      | Field Name         | Type          | Required |
      | First Name         | Text          | Yes      |
      | Last Name          | Text          | Yes      |
      | Email Address      | Alpha-numeric | Yes      |
      | Phone Number       | Integer       | Yes      |
      | Country Code       | Dropdown      | Yes      |
      | Password           | Alpha-numeric | Yes      |
      | Confirm Password   | Alpha-numeric | Yes      |
      | Terms & Conditions | Checkbox      | Yes      |

    Scenario: Ensure the proceed button is enabled only after all fields are valid
    Given the user has filled all required fields correctly except the name field
    And has checked the terms and conditions checkbox
    Then the "Proceed" button should remain disabled

    Scenario: Ensure the proceed button is enabled only after all fields are valid
    Given the user has filled all required fields correctly except the email field
    And has checked the terms and conditions checkbox
    Then the "Proceed" button should remain disabled

    Scenario: Ensure the proceed button is enabled only after all fields are valid
    Given the user has filled all required fields correctly except the number field
    And has checked the terms and conditions checkbox
    Then the "Proceed" button should remain disabled

    Scenario: Ensure the proceed button is enabled only after all fields are valid
    Given the user has filled all required fields correctly except the Password field
    And has checked the terms and conditions checkbox
    Then the "Proceed" button should remain disabled

    Scenario: Ensure the proceed button is enabled only after all fields are valid
    Given the user has filled all required fields correctly
    And have not checked the terms and conditions checkbox
    Then the "Proceed" button should remain disabled

    Scenario: Ensure the proceed button is enabled only after all fields are valid
    Given the user has filled all required fields correctly
    And has checked the terms and conditions checkbox
    Then the "Proceed" button should be enabled

    Scenario: Send OTP to email after clicking proceed
    Given the user clicks the "Proceed" button
    Then the user should see an interface to enter the OTP

    Scenario: Successfully verify account using OTP
    Given the user has received an OTP via email
    When the user enters the correct OTP within 15 minutes
    Then the system should confirm the account as verified
    And the user should be redirected to the app