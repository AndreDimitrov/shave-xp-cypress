/// <reference types="cypress"/>

import fpPage from '../support/pages/forgot-pass'

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
})