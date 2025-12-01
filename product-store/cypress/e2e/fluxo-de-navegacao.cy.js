describe('Fluxo de Navegação e Catálogo', () => {

    it('NV_01 - Validar exibição dos produtos na Home Page', () => {
        cy.visit('https://www.demoblaze.com/');
        cy.contains('a', 'Samsung galaxy s6').should('exist');
        cy.contains('a', 'Nokia lumia 1520').should('exist');
    })

    it('NL_02 - Filtrar produtos por categoria "Laptops"', () => {
        cy.visit('https://www.demoblaze.com/');
        cy.contains('a', 'Laptops').click();
        cy.contains('.card-title', 'Samsung galaxy s6').should('not.exist');
        cy.contains('.card-title', 'Apple monitor 24').should('not.exist');
    })

    it('NL_03 - Filtrar produtos por categoria "Monitors"', () => {
        cy.visit('https://www.demoblaze.com/');
        cy.contains('a', 'Monitors').click();
        cy.contains('.card-title', 'Samsung galaxy s6').should('not.exist');
        cy.contains('.card-title', 'Sony vaio i5').should('not.exist');
    })

    it('NL_04 - Navegar entre páginas (Paginação)', () => {
        cy.visit('https://www.demoblaze.com/');
        cy.contains('.card-title', 'Samsung galaxy s6').should('exist');
        cy.get('#next2').click();
        cy.contains('a', 'Apple monitor 24', { timeout: 10000 }).should('be.visible');
        cy.get('#prev2').click();
        cy.contains('.card-title', 'Samsung galaxy s7', { timeout: 10000 }).should('exist');
    })

    it('NL_05 - Acessar detalhes do produto', () => {
        cy.visit('https://www.demoblaze.com/');
        cy.contains('a', 'Nexus 6').should('exist').click();
        cy.get('#more-information strong').should('be.visible').and('have.text', 'Product description');
        cy.get('a[onclick*="addToCart"]').should('exist');
    })
})