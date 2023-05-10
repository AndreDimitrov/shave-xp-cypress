/// <reference types="cypress"/>

import fpPage from '../support/pages/views/forgot-pass'
import rpPage from '../support/pages/views/reset-pass'
import loginPage from '../support/pages/views/login'
import shaversPage from '../support/pages/views/shavers'

describe('esqueci minha senha', () => {


    it('deve poder solicitar o ressgate de senha', () => {

        const user = {
            name: 'André Esquecido',
            email: 'andre@gmail.com',
            password: 'teste123',
            is_shaver: false
        }

        cy.createUser(user)

        fpPage.go()
        fpPage.submit(user.email)

        const message = 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'

        fpPage.noticeShouldBe(message)

    })

    // IMPORTANTE >> Obs.: Toda vez que vc precisar usar o "Cypress.env" para definir uma variáve de ambiente, tem que colocar dentro de um "context", para poder usar dentro do "it", por causa do JS ser assíncrono, não vai dar tempo e gerar a informação. 

    context('quando o usuário solicita o resgate de senha', () => {

        // Definição da massa.
        const user = {
            name: 'Will Souza',
            email: 'will@yahoo.com',
            password: 'teste123',
            is_shaver: false
        }

        // Colocar dentro de um beforeEach para ele finalizar a implementação.
        beforeEach(() => {
            // Criação da massa.
            cy.createUser(user)

            // Request para solicitar o resgate de senha, via POST.
            cy.recoveryPass(user.email)

            // Mais uma request para obter o TOKEN.
            cy.getToken(user.email)

        })


        // no step de complemento e ele consegue ter acesso a informação.
        it('deve poder cadastrar uma nova senha', () => {

            // Podemos deixar melhor com o request informado abaixo para criação do token.
            // fpPage.go()
            // fpPage.submit(user.email)

            // const message = 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'

            // fpPage.noticeShouldBe(message)

            // Pegar o valor da variável de ambiente que foi geraa no bloco anterior para informar na tela.
            rpPage.go(Cypress.env('passToken'))
            rpPage.submit('teste12', 'teste12')

            const message = 'Agora você já pode logar com a sua nova senha secreta.'
            rpPage.noticeShouldBe(message)

            // cy.log(Cypress.env('passToken'))

        })

        // Como a massa de testes está apartada do "it", vc pode criar um "afterEach".
        // Essa "afterEach" é uma validação pós cenário. Não faz parte do teste, é apenas um double check.
        // Aqui vc testa o login.
        afterEach(() => {
            loginPage.submit(user.email, 'teste12')
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })

    })

})