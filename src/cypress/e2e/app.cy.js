describe('My Application Tests', () => {
  beforeEach(() => {
    // Visit your application's URL before each test
    cy.visit('http://localhost:5176/'); // Replace with your local server URL
  });

  it('renders welcome message', () => {
    // Check if the welcome message is visible
    cy.contains('Välkomna').should('be.visible'); // Replace 'Välkomna' with your actual welcome message
  });

  it('renders the search input', () => {
    // Check if the search input is present
    cy.get('input[placeholder="Sök recept..."]').should('exist'); // Ensure this matches your actual input
  });

  it('navigates to categories', () => {
    // Example of clicking a button or link that navigates to categories
    cy.contains('Kategorier').click(); // Replace with the actual button text
  });
});
