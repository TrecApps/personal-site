describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.url().should('contain', 'AboutMe');
    cy.get('#games-link').click();
    cy.url().should('contain', 'Games');

  })
})
