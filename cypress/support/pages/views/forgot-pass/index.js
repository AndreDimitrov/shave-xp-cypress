class ForgotPassPage {

    go() {
        cy.visit('/Forgot-password')

        // Chackpoint para garantir que estamos indo para o lugar certo.
        cy.get('form h1')
            .should('have.text', 'Recuperar senha')
    }

    submit(email) {
        // Usando o símbolo de "$" para pegar final da palavra, pois o traço do e-mail pode dr problema mais pra frente, dessa forma com expressão regular, fica melhor.
        cy.get('input[placeholder$=mail]')
            .type(email)

        cy.contains('button', 'Recuperar')
            .click()

    }

    noticeShouldBe(expectedText) {
        cy.get('.notice p', { timeout: 10000 })
            .should('be.visible')
            .should('have.text', expectedText)
    }
}

export default new ForgotPassPage()