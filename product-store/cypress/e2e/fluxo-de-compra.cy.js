import dadosPedido from '../fixtures/order.json';

describe('Fluxo de Compra', () => {
    it('CP_01, CP_02 - Adicionar produto ao carrinho e visualizar carrinho', () => {
        cy.visit('https://www.demoblaze.com/');
        cy.contains('a', 'Samsung galaxy s6').click(); w

        const stub = cy.stub();
        cy.on('window:alert', stub);

        cy.contains('a', 'Add to cart').click();

        cy.wrap(stub).should('have.been.calledWith', 'Product added');

        cy.contains('a', 'Cart').click();
        cy.contains('td', 'Samsung galaxy s6');
    })

    it('CL_03 - Finalizar compra', () => {
        cy.visit('https://www.demoblaze.com/');
        cy.contains('a', 'Samsung galaxy s6').click();
        cy.contains('h2', 'Samsung galaxy s6').should('be.visible');

        const stub = cy.stub();
        cy.on('window:alert', stub);

        cy.contains('a', 'Add to cart').click();

        cy.wrap(stub).should('have.been.calledWith', 'Product added');

        cy.contains('a', 'Cart').click();
        cy.contains('td', 'Samsung galaxy s6');

        cy.contains('button', 'Place Order').click();

        cy.get('#name').type(dadosPedido.name);
        cy.get('#country').type(dadosPedido.country);
        cy.get('#city').type(dadosPedido.city);
        cy.get('#card').type(dadosPedido.card);
        cy.get('#month').type(dadosPedido.month);
        cy.get('#year').type(dadosPedido.year);

        cy.contains('button', 'Purchase').click();

        cy.contains('h2', 'Thank you for your purchase!');

        cy.contains('button', 'OK').click();

    })

    it('CL_04 - Validar cálculo total do carrinho', () => {
        cy.visit('https://www.demoblaze.com/');
        cy.contains('a', 'Samsung galaxy s6').click();
        cy.contains('h2', 'Samsung galaxy s6').should('be.visible');

                const stub = cy.stub();
        cy.on('window:alert', stub);

        cy.contains('a', 'Add to cart').click();

        cy.wrap(stub).should('have.been.calledWith', 'Product added');

        cy.visit('https://www.demoblaze.com/');
        cy.contains('a', 'Nokia lumia 1520').click();
        cy.contains('h2', 'Nokia lumia 1520').should('be.visible');

        const stub1 = cy.stub();
        cy.on('window:alert', stub1);

        cy.contains('a', 'Add to cart').click();

        cy.wrap(stub1).should('have.been.calledWith', 'Product added');

        cy.contains('a', 'Cart').click();
        
        cy.contains('td', 'Samsung galaxy s6').should('exist');
        
        cy.contains('td', 'Nokia lumia 1520').should('exist');

        cy.contains('h3', '1180').should('exist')

    })

    it('CL_05 - Remover produto do carrinho', () => {
        cy.visit('https://www.demoblaze.com/');
        cy.contains('a', 'Samsung galaxy s6').click();

        const stub = cy.stub();
        cy.on('window:alert', stub);

        cy.contains('a', 'Add to cart').click();

        cy.wrap(stub).should('have.been.calledWith', 'Product added');

        cy.contains('a', 'Cart').click();
        cy.contains('td', 'Samsung galaxy s6');

        cy.contains('a', 'Delete').should('exist').click()

        cy.contains('td', 'Samsung galaxy s6', { timeout: 10000 }).should('not.exist');
    })

    it.only('CL_06 - Após compra com sucesso redirecionar para a "Home Page"', () => {
        cy.visit('https://www.demoblaze.com/');
        cy.contains('a', 'Samsung galaxy s6').click();
        cy.contains('h2', 'Samsung galaxy s6').should('be.visible');

        const stub = cy.stub();
        cy.on('window:alert', stub);

        cy.contains('a', 'Add to cart').click();

        cy.wrap(stub).should('have.been.calledWith', 'Product added');

        cy.contains('a', 'Cart').click();
        cy.contains('td', 'Samsung galaxy s6');

        cy.contains('button', 'Place Order').click();

        cy.get('#name').type(dadosPedido.name);
        cy.get('#country').type(dadosPedido.country);
        cy.get('#city').type(dadosPedido.city);
        cy.get('#card').type(dadosPedido.card);
        cy.get('#month').type(dadosPedido.month);
        cy.get('#year').type(dadosPedido.year);

        cy.contains('button', 'Purchase').click();

        cy.contains('h2', 'Thank you for your purchase!');

        cy.contains('button', 'OK').click();

        cy.url({ timeout: 10000 }).should('include', 'index.html');
    })
})