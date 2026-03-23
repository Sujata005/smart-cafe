describe('Smart Cafe E2E Tests', () => {
  it('should load the home page and display menu', () => {
    cy.visit('/')
    cy.contains('Welcome to HiGa').should('be.visible')
    cy.get('[data-testid="menu-item"]').should('have.length.greaterThan', 0)
  })

  it('should allow adding item to cart and proceed to checkout', () => {
    cy.visit('/')
    // Assuming there's a way to add to cart, e.g., button with data-testid
    cy.get('[data-testid="add-to-cart-button"]').first().click()
    cy.get('[data-testid="cart-count"]').should('contain', '1')
    // Navigate to cart or checkout
    cy.get('[data-testid="checkout-button"]').click()
    cy.contains('Order Summary').should('be.visible')
    // Fill form
    cy.get('[data-testid="name"]').type('Test User')
    cy.get('[data-testid="phone"]').type('1234567890')
    cy.get('[data-testid="submit-order"]').click()
    // Check success or redirect - since it's alert, check if it stays or redirects
    // For now, just check the button is clicked without error
  })
})