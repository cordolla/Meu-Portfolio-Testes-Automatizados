import { generateUser } from '../support/userFactory';


describe('Cadastro', () => {    
    const userNew = generateUser();
    it('CL_01 - Cadastrar usuario com Username e Password válido', () => {
        cy.preencherCadastro(userNew.username, userNew.password);
        cy.clicarEValidarAlerta('Sign up', 'Sign up successful.')
    })
    it('CL_02 - Cadastrar usuario com Username ja cadastrado', () => {
        cy.preencherCadastro(userNew.username, userNew.password);
        cy.clicarEValidarAlerta('Sign up', 'This user already exist.')
    })

    it('CL_03 - Validar obrigatoriedade do Username no cadastro', () => {
        cy.preencherCadastro('', userNew.password);
        cy.clicarEValidarAlerta('Sign up', 'Please fill out Username and Password.')
    })

    it('CL_04 - Validar obrigatoriedade do Password no cadastro', () => {
        cy.preencherCadastro(userNew.username, '');
        cy.clicarEValidarAlerta('Sign up', 'Please fill out Username and Password.')
    })
});

describe('Login', () => {
    
    it('CL_06 - Realizar login com usuario cadastrado com sucesso', () => {
        cy.visit('https://www.demoblaze.com/');
        cy.get('#login2').click();
        cy.get('#logInModalLabel').should('be.visible');
        cy.get('#loginusername').clear();
        cy.get('#loginpassword').clear();
        cy.get('#loginusername').type('testevalido123');
        cy.get('#loginpassword').type('testevalido123');
        cy.get('button[onclick="logIn()"]').click();
        cy.contains('a', 'Welcome testevalido123', { timeout: 10000 })
            .should('be.visible');
    })

    it('CL_09 - Realizar Logout', () => {
        cy.visit('https://www.demoblaze.com/');
        cy.get('#login2').click();
        cy.get('#logInModalLabel').should('be.visible');
        cy.get('#loginusername').clear()
        cy.get('#loginpassword').clear()
        cy.get('#loginusername').type('testevalido123')
        cy.get('#loginpassword').type('testevalido123')
        cy.get('button[onclick="logIn()"]').click();
        cy.contains('a', 'Welcome testevalido123', { timeout: 10000 })
            .should('be.visible');
        cy.get('#logout2', { timeout: 10000 })
            .should('be.visible')
            .click();
        cy.get('#login2', { timeout: 10000 }).should('be.visible');
    })

    it('CL_07 - Realizar login com usuario cadastrado com sucesso', () => {
        cy.visit('https://www.demoblaze.com/');
        cy.get('#login2').click();
        cy.get('#logInModalLabel').should('be.visible');
        cy.get('#loginusername').clear()
        cy.get('#loginpassword').clear()
        cy.get('#loginusername').type('testeinvalido12341')
        cy.get('#loginpassword').type('testevalido123')

        const stub = cy.stub();
        cy.on('window:alert', stub);

        cy.contains('button', 'Log in').click();

        cy.wrap(stub).should('have.been.calledWith', 'User does not exist.');
    })
    it('CL_08 - Realizar login com senha invalida', () => {
        cy.visit('https://www.demoblaze.com/');
        cy.get('#login2').click();
        cy.get('#logInModalLabel').should('be.visible');
        cy.get('#loginusername').clear()
        cy.get('#loginpassword').clear()
        cy.get('#loginusername').type('testevalido123')
        cy.get('#loginpassword').type('senhainvalida123')

        const stub = cy.stub();
        cy.on('window:alert', stub);

        cy.contains('button', 'Log in').click();

        cy.wrap(stub).should('have.been.calledWith', 'Wrong password.');
    })
});