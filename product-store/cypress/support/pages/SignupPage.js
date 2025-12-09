import BasePage from './BasePage';

class SignupPage extends BasePage{
    preencherFormularioCadastro(username, password){
        if(username){
            cy.get('#sign-username').should('be.visible').invoke('val', username).trigger('change')
        } else {
            cy.get('#sign-username').clear();
        }

        if(password){
            cy.get('#sign-password').should('be.visible').invoke('val', password).trigger('change');
        } else {
            cy.get('#sign-password').clear();
        }
    }

    registrarEValidar(mensagemEsperada) {
        const seletorBotao = 'button[onclick="register()"]';
        this.clicarEValidarAlerta(seletorBotao, mensagemEsperada);
    }
}

export default new SignupPage;