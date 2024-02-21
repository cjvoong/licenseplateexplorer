describe('Test registration search', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000');
    //check page title is Search for your license plate
    cy.title().should('eq', 'Search for your license plate');
    cy.get('#registrationNumberInput').type('YK06SSX');
    
    cy.get('button[type="submit"]').click();

    cy.title().should('eq','Registration Details');

    cy.contains('YK06SSX');
  })
})