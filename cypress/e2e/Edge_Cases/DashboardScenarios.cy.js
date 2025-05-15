describe('verify every scenarios for the host dashboard',()=>{
    let sel
    let password = 'Hbon@1234'
    
        beforeEach(()=>{
            cy.on('uncaught:exception', () => {
                return false
              })
        cy.fixture('selectors').then((selectors)=>{
            sel=selectors
        })
    })
    it('validates that Dashboard displays summary metrics: Total Orders, Total Invites, Total Delivered, Pending Orders',()=>{
        cy.successfulLogin();
        cy.findByText('Total Orders').should('be.visible');
        cy.findByText('Total Invites').should('be.visible');
        cy.findByText('Total Delivered').should('be.visible');
        cy.findByText('Pending Orders').should('be.visible');
    })
    it('validate that the Total order card is functional, and updates upon order',()=>{
        cy.successfulLogin();
        cy.get(sel.totalOrderValue).invoke('text').then((TotalValue)=>{
            const previousTotalValue = parseInt(TotalValue.trim())
            cy.visit('https://event-parcel.vercel.app/preview?code=b176zbdg')
            cy.findByText('Add to Cart').click();
            cy.findByText('Checkout').click();
            cy.findByText('Pickup').click()
            cy.findByPlaceholderText('Enter your first name').type('Olaitan')
            cy.findByPlaceholderText('Enter your last name').type('Sholade')
            cy.findByPlaceholderText('Enter your email address').type('ohlufehmii@gmail.com')
            cy.findByPlaceholderText('1 (702) 123-4567').type('8140095998')
            cy.findByText('Proceed to Payment').click()
            cy.findByText('Make Payment').click()
            cy.findByText('Success').click()
        })
    })
    it('Validate that Orders are listed and correctly categorized by status: Pending, Shipped, Delivered',()=>{
        cy.successfulLogin();
        cy.findByText('Pending').should('be.visible');
        cy.findByText('Shipped').should('be.visible');
        cy.findByText('Completed').should('be.visible');
    })

    it('validate that Clicking an order reveals detailed order information.',()=>{
        cy.successfulLogin();

    })

    it.only('validate that host can mark pending order as shipped.',()=>{
        cy.successfulLogin();
        cy.wait(4000)
        cy.get(sel.OrderTitle).first().scrollIntoView({ force: true }).click();
        cy.findByText('Mark as Shipped').click();
        cy.findByText('Shipped').scrollIntoView({ force: true }).should('be.visible');
    })
    it.only('validate that host can mark pending order as delivered, and the status button become disabled',()=>{
        cy.findByText('Dashboard').click();
        cy.wait(4000)
        cy.get(sel.OrderTitle).eq(1).scrollIntoView({ force: true }).click();
        cy.findByText('Mark as Shipped').click();
        cy.findByText('Mark as Delivered').click();
        cy.findByText('Delivered').scrollIntoView({ force: true }).should('be.visible');
        cy.findByText('Order Completed').should('be.visible').and('be.disabled');
    })
})
