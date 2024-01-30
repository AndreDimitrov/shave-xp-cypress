/// <reference types="cypress"/>

import loginPage from '../support/pages/login2/index2'
import shaversPage from '../support/pages/shavers2/index2'
import header from '../support/components/header/index2'
import login from '../support/pages/login'
// import { data } from 'cypress/types/jquery'
// import { context } from 'mocha'
import data from '../fixtures/users-login2.json'

describe('login', () => {

    context('quando submeto o formulário', () => {

        it('deve logar com sucesso', () => {
            const user = data.success

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)


            // Outra forma de utilizar com o callback em "data"    
            // cy.fixture('users-login2').then(function (data){

            //     loginPage.submit(data.email, data.password)
            //     shaversPage.header.userShouldBeLoggedIn(data.name)
            // })
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

            // símbolo "$" pra informar que está buscando um elemento HTML

            // cy.contains('.alert-error', 'E-mail é obrigatório')
            //     .should('be.visible')

            // cy.contains('.alert-error', 'Senha é obrigatória')
            //     .should('be.visible')
        })
    })

    context('senha muito curta', () => {
        // const passwords = data.shortpass

        data.shortpass.forEach((p) => {
            // it('não deve logar com a senha ' + p, () => {
            it(`não deve logar com a senha: ${p}`, () => {
                loginPage.submit('andrepdimitrov@gmail.com', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')

            })
        })

    })

    context('email no formato incorreto', () => {

        // const emails = data.invemails

        data.invemails.forEach((e) => {
            it(`não deve logar com o email: ${e}`, () => {
                loginPage.submit(e, 'q@x@123')
                loginPage.alertShouldBe('Informe um email válido')
            })
        })
    })

})