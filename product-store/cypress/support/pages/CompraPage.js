import dadosPedido from '../../fixtures/order.json'
import BasePage from './BasePage';

class CompraPage extends BasePage {

    clicarNoProduto(produto) {
        cy.contains('a', produto).click();
    }

    adicionarProdutoNoCarrinhoEValidarMensagem() {
        cy.intercept('POST', '**/addtocart').as('postAddCart');
        const stub = cy.stub();
        cy.on('window:alert', stub);

        cy.contains('a', 'Add to cart').click();
        
        cy.wait('@postAddCart').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
    });
        cy.wrap(stub).should('have.been.calledWith', Cypress.sinon.match('Product added.'));
    }

    validarProdutoNoCarrinho(produto) {
        cy.contains('td', produto).should('exist');
    }

    botaoDeCompra() {
        cy.contains('button', 'Place Order').click();
    }

    preencherFormularioDeCompra() {
        cy.get('#name').type(dadosPedido.name);
        cy.get('#country').type(dadosPedido.country);
        cy.get('#city').type(dadosPedido.city);
        cy.get('#card').type(dadosPedido.card);
        cy.get('#month').type(dadosPedido.month);
        cy.get('#year').type(dadosPedido.year);
    }

    finalizarCompraEValidarMensagem() {
        cy.contains('button', 'Purchase').should('exist').click();

        cy.contains('h2', 'Thank you for your purchase!').should('exist');

        cy.contains('button', 'OK').should('exist').click();
    }

    validarTotalCarrinho() {
        let somaCarrinho = 0;

        cy.get('tbody tr.success').should('have.length.at.least', 1)
            .each(($linha) => {
            const precoTexto = $linha.find('td').eq(2).text();
            somaCarrinho += Number(precoTexto);
        }).then(() => {
            cy.get('#totalp').invoke('text').then((textoTotal) => {
                const totalExibido = Number(textoTotal);
                expect(totalExibido).to.eq(somaCarrinho);
            });
        });
    }

    removerProdutoDoCarrinho() {
        cy.contains('a', 'Delete').should('exist').click()
    }

    validarProdutoNaoEstaNoCarrinho(produto) {
        cy.contains('td', produto, { timeout: 10000 }).should('not.exist');
    }

    validarSucessoCompra() {
        cy.get('.sweet-alert').should('be.visible');
        cy.contains('h2', 'Thank you for your purchase!').should('be.visible');

        cy.wait(1000);

        cy.get('.confirm').should('exist').click({ force: true });
    }    

    limparCarrinho() {
        cy.visit('https://www.demoblaze.com/cart.html');
        
        cy.get('body').then($body => {
            if ($body.find('tbody tr.success').length > 0) {
                cy.intercept('POST', '**/deleteitem').as('deleteItem');

                cy.get('a[onclick*="deleteItem"]').each($btn => {
                    cy.wrap($btn).click();
                    cy.wait('@deleteItem');
                });
                cy.get('tbody tr.success').should('not.exist');
            }
        });
    }
}

export default new CompraPage