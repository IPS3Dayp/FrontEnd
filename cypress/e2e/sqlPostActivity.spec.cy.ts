describe('SQL Injection Test', () => {
  it('should test for SQL injection vulnerability', () => {
    const maliciousInput = "' OR '1'='1'; -- ";
    
    const requestBody = {
      activityName: maliciousInput,
      startTime: '2024-05-22T10:00:00Z',
      endTime: '2024-05-22T12:00:00Z'
    };

    cy.request({
      method: 'POST',
      url: 'https://localhost:7291/api/PlannedActivities',
      body: requestBody,
      failOnStatusCode: false // prevent Cypress from failing the test on non-2xx status codes
    }).then((response) => {
      // Log the response for inspection
      cy.log(response);

      // Check the response status code
      expect(response.status).to.not.equal(201);

      // Ensure the malicious input was not saved
      cy.request('GET', 'https://localhost:7291/api/PlannedActivities')
        .then((getResponse) => {
          const activities = getResponse.body;
          const found = activities.some(activity => activity.activityName === maliciousInput);
          expect(found).to.be.false;
        });
    });
  });
});

