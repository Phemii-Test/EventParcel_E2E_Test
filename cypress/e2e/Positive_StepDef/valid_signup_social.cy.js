/*
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
    Then the user should be redirected to the app experience*/

    describe('validate the valid sign up with social logins',()=>{
        let sel
        beforeEach(()=>{
            cy.visit('/');
            cy.fixture('selectors').then((selectors)=>{
                sel=selectors
            })
        })


        it('displays social signup',()=>{
            cy.get(sel.getStartedButton).click();
            cy.get(sel.googleSignUpButton).should('be.visible');
            cy.get(sel.faceBookSignUpButton).should('be.visible');
            cy.get(sel.appleSignupButton).should('be.visible');
            cy.get(sel.TandCtext).should('be.visible');
        })

        it('signs up successfuly with google',()=>{
            cy.get(sel.getStartedButton).click();
            cy.get(sel.googleSignUpButton).click();
            cy.get('body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > form:nth-child(1) > span:nth-child(1) > section:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > ul:nth-child(1) > li:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)').click();
            
        })
    })