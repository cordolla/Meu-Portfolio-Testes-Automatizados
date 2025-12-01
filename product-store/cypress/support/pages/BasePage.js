class BasePage{
    validarAlerta(mensagemEsperada) {
        const sub = cy.stub();
        cy.on('window:alert', sub);
    }

    clicarEValidarAlerta(seletorBotao, mensagemEsperada) {
        const stub = cy.stub();
        cy.on('window:alert', stub);

        cy.get(seletorBotao).click();

        cy.wrap(stub).should('have.been.calledWith', mensagemEsperada);
    }
}

export default BasePage;