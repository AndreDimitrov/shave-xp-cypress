/// <reference types="cypress"/>

// No JS funções e variáveis são construídas com padrão Camel Case
// No JS classes ou módulos com padrão pascal case

import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'
import header from '../support/components/header/index'

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
                nome: 'André',
                email: 'andrepdimitrov@gmail.com',
                password: 'teste123'
            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)


        })

        it('não deve logar com email não cadastrado', () => {
            const user = {
                nome: 'André',
                email: 'andrepdimitrov@404.com',
                password: 'teste123'
            }

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

        const passwords = [
            1,
            12,
            123,
            1234,
            12345
        ]

        passwords.forEach((p) => {
            it(`não deve logar com a senha ${p}`, () => {
                loginPage.submit('andrepdimitrov@gmail.com', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')
            })
        })    
    })

    context('e-mail no formato incorreto', () => {

        const emails = [
            'andre&gmail.com',
            'andrepdimitrov.com.br',
            '@gmail.com',
            '@',
            'andrepdimitrov@',
            '121323',
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