import BasePage from './BasePage';

class SignupPage extends BasePage{
    preencherFormularioCadastro(username, password){
        cy.wait(500);
        cy.get('#sign-username').clear();
        cy.get('#sign-password').clear();

        if(username) cy.get('#sign-username').type(username);
        if(password) cy.get('#sign-password').type(password);
    }

    registrarEValidar(mensagemEsperada) {
        const seletorBotao = 'button[onclick="register()"]';
        this.clicarEValidarAlerta(seletorBotao, mensagemEsperada);
    }
}

export default new SignupPage;