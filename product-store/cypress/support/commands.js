// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('preencherCadastro', (username, password) => {
    cy.visit('https://www.demoblaze.com/');
    cy.get('#signin2').click();
    cy.get('#signInModalLabel', { timeout: 10000 }).should('be.visible');

    if (username) cy.get('#sign-username').clear().type(username);
    if (password) cy.get('#sign-password').clear().type(password);
})

Cypress.Commands.add('preencherLogin', (username, password) => {
    cy.visit('https://www.demoblaze.com/');
    cy.get('#login2').click();
    cy.get('#logInModalLabel', { timeout: 10000 }).should('be.visible');

    if (username) cy.get('#loginusername').type(username);
    if (password) cy.get('#loginpassword').type(password);

    cy.get('button[onclick="logIn()"]').click();
})

Cypress.Commands.add('clicarEValidarAlerta', (textoBotao, mensagemEsperada) => {
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.contains('button', textoBotao).click();

    cy.wrap(stub).should('have.been.calledWith', mensagemEsperada);
});