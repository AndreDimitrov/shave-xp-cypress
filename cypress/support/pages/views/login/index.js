import shared from '../../shared'

class LoginPage {

    constructor() {
        this.alertError = '.alert-error'
        this.shared = shared
    }

    submit(email = null, password = null) {
        // cy.viewport(1920, 1080)
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
    }

    requiredFields(emailMessage, passwordMessage) {
        cy.get(this.alertError)
            .should('have.length', 2)
            .and(($small) => {              // O dollar na frente é pra deixar caro que ele está buscando um elemento HTML.
                expect($small.get(0).textContent).to.equal(emailMessage)
                expect($small.get(1).textContent).to.equal(passwordMessage)
            })
    }

}

export default new LoginPage