/// <reference types="cypress" />

describe('Auth0 Login Tests', () => {
  const baseUrl = 'http://localhost:5173'; 
  const authUrl = 'https://dev-rivnyssike6d26bk.us.auth0.com'; 
  const email = 'luukmsn2004@gmail.com'; 
  const password = 'Leavy999!'; 

  beforeEach(() => {
    cy.visit(`${baseUrl}/login`); // Navigeer naar de inlogpagina van je applicatie
  });

  it('Should login successfully via Auth0', () => {
    // Klik op de login knop die naar Auth0 leidt
    cy.get('button#login-button').click();

    // Wacht tot de Auth0 inlogpagina wordt geladen
    cy.origin(authUrl, { args: { email, password } }, ({ email, password }) => {
      cy.get('input[name="username"]').type(email);
      cy.get('input[name="password"]').type(password);
      cy.get('button[data-action-button-primary="true"]').click();
    });
    
    // Controleer of de gebruiker is doorgestuurd naar het dashboard
    cy.url().should('include', '/dashboard');
  });
});
