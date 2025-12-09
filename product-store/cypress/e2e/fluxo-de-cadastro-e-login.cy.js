import { generateUser } from '../support/userFactory';
import signupPage from '../support/pages/SignupPage';
import homePage from '../support/pages/HomePage';
import loginPage from '../support/pages/LoginPage';

describe('Fluxo de cadastro', () => {    

    const usuarioCadastro = generateUser();

    beforeEach(() => {
        homePage.acessar();
        homePage.abrirCadastro();
    })

    it('CL_01 - Cadastrar usuario com Username e Password válido', () => {        
        signupPage.preencherFormularioCadastro(usuarioCadastro.username, usuarioCadastro.password, {setTimeout : 10000});
        signupPage.registrarEValidar('Sign up successful.');
    })

    it('CL_02 - Cadastrar usuario com Username ja cadastrado', () => {
        signupPage.preencherFormularioCadastro('TesteInvalido', usuarioCadastro.password);
        signupPage.registrarEValidar('This user already exist.')
    })

    it('CL_03 - Validar obrigatoriedade do Username no cadastro', () => {
        signupPage.preencherFormularioCadastro('', usuarioCadastro.password);
        signupPage.registrarEValidar('Please fill out Username and Password.')
    })

    it('CL_04 - Validar obrigatoriedade do Password no cadastro', () => {
        signupPage.preencherFormularioCadastro(usuarioCadastro.username, '');
        signupPage.registrarEValidar('Please fill out Username and Password.')
    })
});

describe('Login', () => {

    const usuarioLogin = generateUser();

    before(() => {
        homePage.acessar();
        homePage.abrirCadastro();
        signupPage.preencherFormularioCadastro(usuarioLogin.username, usuarioLogin.password);
        signupPage.registrarEValidar('Sign up successful.');
    }); 

    beforeEach(() => {
        homePage.acessar();
        homePage.abrirLogin();
    }) 

    it('CL_06 - Realizar login com usuario cadastrado com sucesso', () => {
        loginPage.preencherFormularioLogin(usuarioLogin.username, usuarioLogin.password);
        loginPage.loginEValidar(usuarioLogin.username);
    })

    it('CL_09 - Realizar Logout', () => {
        loginPage.preencherFormularioLogin(usuarioLogin.username, usuarioLogin.password);
        loginPage.loginEValidar(usuarioLogin.username);

        homePage.realizarLogout();        
    })

    it('CL_07 - Realizar login com dados de usuario invalido', () => {
        loginPage.preencherFormularioLogin('usuarioinvalido123321', usuarioLogin.password);
        loginPage.logarEValidarErro('User does not exist.');
    })
    it('CL_08 - Realizar login com senha invalida', () => {
        loginPage.preencherFormularioLogin(usuarioLogin.username, 'testeinvalido123321');
        loginPage.logarEValidarErro('Wrong password.');
    })
});