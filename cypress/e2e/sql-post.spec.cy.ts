/// <reference types="cypress" />

describe('SQL Injection Tests', () => {
  it('Should fail when SQL injection is attempted in email', () => {
    const maliciousPayload = {
      email: "malicious@example.com'; DROP TABLE Users;--"
    };

    cy.request({
      method: 'POST',
      url: 'https://localhost:7291/api/Users', // Zorg ervoor dat de URL correct is
      body: maliciousPayload,
      failOnStatusCode: false // Zorg ervoor dat Cypress niet faalt bij een niet-2xx statuscode
    }).then((response) => {
      // Controleer of het verzoek is mislukt met een statuscode die geen 201 is
      expect(response.status).to.not.eq(201);

      // Afhankelijk van hoe de server is geconfigureerd, controleer op een specifieke foutstatuscode
      // Bijvoorbeeld: 400 (Bad Request)
      expect([400, 404]).to.include(response.status); // Controleer op 400 of 404 statuscode
      if (response.status === 400) {
        expect(response.body.message).to.include('Invalid email address');
      }
    });
  });
});
