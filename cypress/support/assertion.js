
Cypress.Commands.add('checkAddress', (fixture)  => { 
    cy.fixture(fixture).then((fixture) => { 

        const normalizeText = (s) => s.replace(/\s/g, '').toLowerCase();    //Check direction to be eql
        let text
        cy.get(fixture.ad1).then(($ad1) => {                                // ad1 to string
            text = normalizeText($ad1.text())                               // Saved on text var
        })   
        cy.get(fixture.ad2).should(($ad2) => {
            const secondtext = normalizeText($ad2.text());
            expect(secondtext).to.equal(text);                              //Assertion

        })
    })
})