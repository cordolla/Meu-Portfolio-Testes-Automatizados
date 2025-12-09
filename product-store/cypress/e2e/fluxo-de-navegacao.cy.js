import homePage from '../support/pages/HomePage';
import navegacaoPage from '../support/pages/NavegacaoPage'
import compraPage from '../support/pages/CompraPage';

describe('Fluxo de Navegação e Catálogo', () => {

    it('NV_01 - Validar exibição dos produtos na Home Page', {tags: ['@smoke', '@catalogo']}, () => {
        homePage.acessar();
        navegacaoPage.validarProdutoNaHome('Samsung galaxy s6');
        navegacaoPage.validarProdutoNaHome('Nokia lumia 1520');
    })

    it('NL_02 - Filtrar produtos por categoria "Laptops"', {tags: ['@regressao', '@catalogo']}, () => {
        homePage.acessar();
        navegacaoPage.clicarCategorias('Laptops');
        navegacaoPage.validarAusenciaDeProduto('Samsung galaxy s6');
        navegacaoPage.validarAusenciaDeProduto('Apple monitor 24');
    })

    it('NL_03 - Filtrar produtos por categoria "Monitors"', {tags: ['@regressao', '@catalogo']}, () => {
        homePage.acessar();
        navegacaoPage.clicarCategorias('Monitors');
        navegacaoPage.validarAusenciaDeProduto('Samsung galaxy s6');
        navegacaoPage.validarAusenciaDeProduto('Sony vaio i5');
    })

    it('NL_04 - Navegar entre páginas (Paginação)', {tags: ['@regressao', '@catalogo']}, () => {
        homePage.acessar();
        navegacaoPage.validarProdutoNaHome('Samsung galaxy s6');
        navegacaoPage.avancarPaginacao();
        navegacaoPage.validarProdutoNaHome('Apple monitor 24');
        navegacaoPage.voltarPaginacao();
        navegacaoPage.validarProdutoNaHome('Samsung galaxy s7');
    })

    it('NL_05 - Acessar detalhes do produto', {tags: ['@regressao', '@catalogo']}, () => {
        homePage.acessar();
        compraPage.clicarNoProduto('Nexus 6');
        navegacaoPage.validarDescricaoDoProduto();
        navegacaoPage.validarBotaoDeAddCart();        
    })
})