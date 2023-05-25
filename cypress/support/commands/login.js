Cypress.Commands.add('submitLogin', (email = null, password = null) => {
    cy.visit('/')

    // Estou garantindo de que os campo sestarão lá.
    cy.get('input[placeholder$=email]').as('email')
    cy.get('input[placeholder*=senha]').as('password')


    if (email) {
        cy.get('@email').type(email)
    }

    if (password) {
        cy.get('@password').type(password)
    }

    cy.contains('button', 'Entrar')
        .click()
})

Cypress.Commands.add('userShouldBeLoggedIn', (name) => {
    const firstName = name.split(' ')[0]

    cy.get('.logged-user div a')
        .should('be.visible')
        .should('have.text', 'Olá, ' + firstName)
})