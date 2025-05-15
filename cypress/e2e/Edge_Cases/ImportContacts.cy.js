describe('validate every possible edge cases with importing contact',()=>{
    let sel;
  let password = "Hbon@1234";

  beforeEach(() => {
    cy.visit('/dashboard')
    cy.on('uncaught:exception', () => {
      return false
    })
    cy.fixture("selectors").then((selectors) => {
      sel = selectors;
    });
  });

  it('Successfully import contacts using a valid CSV file',()=>{
    cy.successfulLogin();
    cy.findByText('Events').click();
    cy.get(sel.createdEventTitle).first().click();
    cy.findByText('Send Invite').click();
    cy.findByText('Upload CSV').click();
    cy.findByText('Continue').click();
    cy.get(sel.attachFile).last().attachFile('contacts (3).csv');
    cy.findByText('Import').click();
    cy.get(sel.selectContact).click();
    cy.findByText('Import').click();
    cy.findByText('Invite Options').should('be.visible');
    cy.wait(3000);


  })

  it('Prevent submission when no file is uploaded',()=>{
    cy.findByText('Events').click();
    cy.get(sel.createdEventTitle).first().click();
    cy.findByText('Send Invite').click();
    cy.findByText('Upload CSV').click();
    cy.findByText('Continue').click();
    // cy.get(sel.attachFile).last().attachFile('');
    cy.findByText('Import').should('be.disabled');
  })
  it('Successfully import contacts using a valid CSV file',()=>{
    cy.findByText('Events').click();
    cy.get(sel.createdEventTitle).first().click();
    cy.findByText('Send Invite').click();
    cy.findByText('Upload CSV').click();
    cy.findByText('Continue').click();
    cy.get(sel.attachFile).attachFile('invalid Contact format.docx');
    cy.findByText('Import').should('be.disabled');
    cy.findByText('Please upload a valid CSV file.').should('be.visible');
  })

  it('Prevent import using an empty CSV file',()=>{
    cy.findByText('Events').click();
    cy.get(sel.createdEventTitle).first().click();
    cy.findByText('Send Invite').click();
    cy.findByText('Upload CSV').click();
    cy.findByText('Continue').click();
    cy.get(sel.attachFile).last().attachFile('emptyCSV.csv');
    cy.findByText('Import').click();
    cy.get(sel.invalidLoginToastRespons).should('be.visible').and('have.text','Extracted CSV file empty or invalid CSV template');
    

  })
  it('Handle partially valid records in a CSV file',()=>{
    cy.findByText('Events').click();
    cy.get(sel.createdEventTitle).first().click();
    cy.findByText('Send Invite').click();
    cy.findByText('Upload CSV').click();
    cy.findByText('Continue').click();
    cy.get(sel.attachFile).last().attachFile('Partial Valid details.csv');
    cy.findByText('Import').click();
    cy.get(sel.invalidLoginToastRespons).should('be.visible').and('have.text','Required columns (Name, Phone) not found.');
    
  })

  it('Successfully handle a large CSV file',()=>{
    cy.findByText('Events').click();
    cy.get(sel.createdEventTitle).first().click();
    cy.findByText('Send Invite').click();
    cy.findByText('Upload CSV').click();
    cy.findByText('Continue').click();
    cy.get(sel.attachFile).last().attachFile('large contact file.csv');
    cy.findByText('Import').click();
    cy.get(sel.selectContact).click();
    cy.findByText('Import').click();
    cy.findByText('Invite Options').should('be.visible');
    cy.wait(3000);


  })
})