/// <reference types="cypress"/>

// No JS funções e variáveis são construídas com padrão Camel Case
// No JS classes ou módulos com padrão pascal case

import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'
import header from '../support/components/header/index'
// forma de importar "data" em 100% JS
import data from '../fixtures/users-login.json'

describe('login', () => {

    // Desas forma é 100% cypress.
    // beforeEach(() => {
    //     cy.fixture('users-login').then(function(data){
    //         this.data = data
    //     })
    // })

    context('quando submeto o formulário', () => {

        // Quando utilizar a arrow function, o JS não tem acesso ao contexto "this". Se a função for convencional, ele tem acesso ao contexto "this". CY tudo é orientado a função. 
        it.only('deve logar com sucesso', () => {

            // dado que eu tenho um NOVO usuário cadastrado
            const user = data.success
            // const user = this.data

            // Função criada e incluída em Commands
            cy.createUser(user)

            // quando submeto o form de login com esse usuário
            loginPage.submit(user.email, user.password)

            // então devo ser logado co sucesso
            shaversPage.header.userShouldBeLoggedIn(user.name)

            // Forma abaixo é uma outra alternativa de utilizar as massas de dados através da fixture.
            // cy.fixture('users-login').then(function(data) {
            //     loginPage.submit(data.email, data.password)
            //     shaversPage.header.userShouldBeLoggedIn(data.name)

        })

        it('não deve logar com senha incorreta', () => {
            const user = data.invpass

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)


        })

        it('não deve logar com email não cadastrado', () => {
            const user = data.email404

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)

        })

        it('campos obrigatórios', () => {
            loginPage.submit()
            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')
            // cy.contains('.alert-error', 'E-mail é obrigatório')
            //     .should('be.visible')

            // cy.contains('.alert-error', 'Senha é obrigatória')
            //     .should('be.visible')

            // IMPORTANTE: Obs.: Apenas usar esta estratégia quando for testar dois campos.
        })

    })

    context('senha muito curta', () => {
        // Posso usar direto o data.shortpass, pois já é um array com os valores.
        data.shortpass.forEach((p) => {
            it(`não deve logar com a senha ${p}`, () => {
                loginPage.submit('andrepdimitrov@gmail.com', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('e-mail no formato incorreto', () => {
        // Posso usar direto o data.shortpass, pois já é um array com os valores.
        data.invemails.forEach((e) => {
            it(`não deve logar com o email: ${e}`, () => {
                loginPage.submit(e, 'q@x@123')
                loginPage.alertShouldBe('Informe um email válido')
            })
        })
    })

    // Obs.: Nesa validação isolada, para que, caso o e-mail apresente erro, é feito a validação do campo "senha", dessa forma, é realizado ambas as validações, mesmo se a primeira falhar.
    // Porém, é muio trabalhoso para validar apenas campos mais simples no processo de validação.
    // context('campos obrigatórios', () => {
    //     beforeEach(() => {
    //         loginPage.submit()
    //     })

    //     it('deve validar e-mail', () => {
    //         cy.get('.alert-error')
    //             .should('have.length', 2)
    //             .and(($small) => {              // O dollar na frente é pra deixar caro que ele está buscando um elemento HTML.
    //                 expect($small.get(0).textContent).to.equal('E-mail é obrigatório')

    //             })
    //     })

    //     it('deve validar senha', () => {
    //         cy.get('.alert-error')
    //             .should('have.length', 2)
    //             .and(($small) => {              // O dollar na frente é pra deixar caro que ele está buscando um elemento HTML.
    //                 expect($small.get(1).textContent).to.equal('Senha é obrigatória')
    //             })

    //     })
    // })
})