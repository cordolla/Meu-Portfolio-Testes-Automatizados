import BasePage from "./BasePage";

class LoginPage extends BasePage{
    
    preencherFormularioLogin(username, password) {
        cy.wait(500);
        cy.get('#loginusername').clear();
        cy.get('#loginpassword').clear();

        if (username) cy.get('#loginusername').type(username);
        if (password) cy.get('#loginpassword').type(password);
    }
    loginEValidar(username) {
        const seletorBotao = 'button[onclick="logIn()"]';
        cy.get(seletorBotao).click();
        cy.contains('a', `Welcome ${username}`)
          .should('be.visible');
    }

    logarEValidarErro(mensagemEsperada){
        const stub = cy.stub();
        cy.on('window:alert', stub);

        cy.get('button[onclick="logIn()"]').click();

        cy.wrap(stub).should('have.been.calledWith', mensagemEsperada);
    }
}

export default new LoginPage;