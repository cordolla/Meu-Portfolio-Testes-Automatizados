import { generateUser } from '../support/userFactory';
import homePage from '../support/pages/HomePage';
import compraPage from '../support/pages/CompraPage'
import signupPage from '../support/pages/SignupPage';

describe('Fluxo de Compra', () => {

    const usuarioLogin = generateUser();

    before(() => {
        homePage.acessar();
        homePage.abrirCadastro();
        signupPage.preencherFormularioCadastro(usuarioLogin.username, usuarioLogin.password);
        signupPage.registrarEValidar('Sign up successful.');
    }); 

    beforeEach(() => {
        cy.loginViaSession(usuarioLogin.username, usuarioLogin.password);

        compraPage.limparCarrinho();

        homePage.acessar();

    }) 

    it('CP_01, CP_02 - Adicionar produto ao carrinho e visualizar carrinho', {tags: ['@smoke', '@checkout']}, () => {
        compraPage.clicarNoProduto('Samsung galaxy s6');
        compraPage.adicionarProdutoNoCarrinhoEValidarMensagem();
        homePage.clicarNoMenu('Cart')
        compraPage.validarProdutoNoCarrinho('Samsung galaxy s6');
    })

    it('CP_03 - Finalizar compra', {tags: ['@smoke', '@checkout']}, () => {
        compraPage.clicarNoProduto('Samsung galaxy s6');
        compraPage.adicionarProdutoNoCarrinhoEValidarMensagem();
        homePage.clicarNoMenu('Cart')
        compraPage.validarProdutoNoCarrinho('Samsung galaxy s6');
        compraPage.botaoDeCompra();
        compraPage.preencherFormularioDeCompra();
        compraPage.finalizarCompraEValidarMensagem();
    })

    it('CP_04 - Validar cálculo total do carrinho', {tags: ['@regressao', '@checkout']}, () => {
        compraPage.clicarNoProduto('Samsung galaxy s6');
        compraPage.adicionarProdutoNoCarrinhoEValidarMensagem();
        homePage.acessar();
        compraPage.clicarNoProduto('Nokia lumia 1520');
        compraPage.adicionarProdutoNoCarrinhoEValidarMensagem();
        homePage.clicarNoMenu('Cart')
        compraPage.validarProdutoNoCarrinho('Samsung galaxy s6');
        compraPage.validarProdutoNoCarrinho('Nokia lumia 1520');
        compraPage.validarTotalCarrinho();
    })

    it('CP_05 - Remover produto do carrinho', {tags: ['@regressao', '@checkout']}, () => {
        compraPage.clicarNoProduto('Samsung galaxy s6');
        compraPage.adicionarProdutoNoCarrinhoEValidarMensagem();
        homePage.clicarNoMenu('Cart')
        compraPage.validarProdutoNoCarrinho('Samsung galaxy s6');
        compraPage.removerProdutoDoCarrinho();
        compraPage.validarProdutoNaoEstaNoCarrinho('Samsung galaxy s6')
    })

    it('CP_06 - Após compra com sucesso redirecionar para a "Home Page"', {tags: ['@regressao', '@checkout']}, () => {
        compraPage.clicarNoProduto('Samsung galaxy s6');
        compraPage.adicionarProdutoNoCarrinhoEValidarMensagem();
        homePage.clicarNoMenu('Cart')
        compraPage.validarProdutoNoCarrinho('Samsung galaxy s6');
        compraPage.botaoDeCompra();
        compraPage.preencherFormularioDeCompra();
        compraPage.finalizarCompraEValidarMensagem();
        compraPage.validarSucessoCompra();
        homePage.validarHomePage();
    })  
})