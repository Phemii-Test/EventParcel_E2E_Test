describe('validate OTP',()=>{

    const serverId='zbfbnq90'
    const userName = Math.random().toString(36).substring(2, 8);
    const testEmail = `${userName}@${serverId}.mailosaur.net`;
    let password = 'Hbon@1234'
    before(()=>{
        cy.visit('https://dev.idonatio.com/donee')
    })
    it('validate OTP',()=>{
        cy.get('button[class="btn btn-primary font-medium bg-blue-500"]').click();
        cy.get('input[value="individual"]').click({force:true});
        cy.get('div[class="MuiBox-root css-1l6mdcf"] div button[type="button"]').click();
        cy.get('#mui-1').type(testEmail);
        cy.get('#mui-2').type(password)
        cy.get('#mui-3').type(password)
        cy.get('input[type="checkbox"]').click();
        cy.get('button[type="submit"]').click();
        cy.get('div[class="MuiDialogActions-root MuiDialogActions-spacing css-14b29qc"] button[type="button"]').click();

        cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVER_ID'), {
            sentTo: testEmail,
          }).then((email) => {
            cy.log(email.html.body); 
            const parser = new DOMParser();
            const doc = parser.parseFromString(email.html.body, "text/html");
          
            const otpElement = doc.querySelector('tbody tr p:nth-child(3)'); // Adjust selector based on email format
            const otpCode = otpElement ? otpElement.textContent.trim() : null;
          
        cy.get('#verify').type(otpCode);
    })
})

})