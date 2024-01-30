/// <reference types="cypress"/>

import loginPage from '../support/pages/login2/index2'
import shaversPage from '../support/pages/shavers2/index2'
import header from '../support/components/header/index2'
import login from '../support/pages/login'
// import { context } from 'mocha'

describe('login', () => {

    context('quando submeto o formulário', () => {

        it('deve logar com sucesso', () => {
            const user = {
                name: 'André',
                email: 'andrepdimitrov@gmail.com',
                password: 'q@x@123'
            }

            loginPage.submit(user.email, user.password)
            shaversPage.header.userShouldBeLoggedIn(user.name)

        })

        it('não deve logar com senha incorreta', () => {
            const user = {
                name: 'André',
                email: 'andrepdimitrov@yahoo.com',
                password: '123456'
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.noticeShouldBe(message)


        })

        it('não deve logar com email não cadastrado', () => {
            const user = {
                name: 'André',
                email: 'andrepdimitrov@404.com',
                password: '123456'
            }

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
        const passwords = [
            '1',
            '12',
            '123',
            '1234',
            '12345'
        ]

        passwords.forEach((p) => {
            // it('não deve logar com a senha ' + p, () => {
            it(`não deve logar com a senha: ${p}`, () => {
                loginPage.submit('andrepdimitrov@gmail.com', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')

            })
        })

    })

    context('email no formato incorreto', () => {

        const emails = [
            'andrepdimitrov&gmail.com',
            'andrepdimitrov.com.br',
            '@gmaill.com',
            '@',
            'andrepdimitrov@',
            '123123',
            '@#$@#$',
            'xpto123'
        ]

        emails.forEach((e) => {
            it(`não deve logar com o email: ${e}`, () => {
                loginPage.submit(e, 'q@x@123')
                loginPage.alertShouldBe('Informe um email válido')
            })
        })
    })

})