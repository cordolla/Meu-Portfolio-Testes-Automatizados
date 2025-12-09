import BasePage from './BasePage';

class HomePage extends BasePage{
    acessar() {
        cy.visit('https://www.demoblaze.com/');
    }

    clicarNoMenu(opcao) {
        cy.contains('a', opcao).click();
    }

    abrirLogin() {
        cy.get('#login2').click();
        cy.get('#logInModalLabel', { timeout: 10000 }).should('be.visible')
    }

    abrirCadastro() {
        cy.get('#signin2').click();
        cy.get('#signInModalLabel', { timeout: 10000 }).should('be.visible');
        cy.get('#sign-username').should('be.visible');
    }

    realizarLogout() {
        cy.get('#logout2', { timeout: 10000 }).should('be.visible').click();
        cy.get('#login2', { timeout: 10000 }).should('be.visible');
    }

    validarHomePage() {
        cy.url({ timeout: 10000 }).should('include', 'index.html');
        cy.get('#cat').should('be.visible');
    }
}

export default new HomePage;