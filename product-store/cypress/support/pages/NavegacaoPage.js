import BasePage from "./BasePage";

class NavegacaoPage extends BasePage{

    validarProdutoNaHome(produto){
        cy.contains('.hrefch', produto)
            .should('be.visible')
    }

    clicarCategorias(categoria){
        cy.contains('#itemc', categoria)
            .should('be.visible')
            .click();
    }

    validarAusenciaDeProduto(produto){
        cy.contains('.hrefch', produto).should('not.exist');
    }

    avancarPaginacao(){
        cy.get('#next2').click();
    }

    voltarPaginacao(){
        cy.get('#prev2').click();
    }

    validarDescricaoDoProduto(){
        cy.get('#more-information strong').should('be.visible').and('have.text', 'Product description');
    }

    validarBotaoDeAddCart(){
        cy.get('a[onclick*="addToCart"]').should('exist');
    }

}

export default new NavegacaoPage;