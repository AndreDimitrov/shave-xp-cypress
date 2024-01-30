

class LoginPage {

    constructor() {
        this.alertError = '.alert-error'
    }

    submit(email = null, password = null) {

        cy.visit('/')

        if (email) {
            cy.get('input[placeholder$=email]')
                .type(email)
        }

        if (password) {
            cy.get('input[placeholder*=senha]')
                .type(password)
        }

        cy.contains('button', 'Entrar')
            .click()
    }

    noticeShouldBe(message) {
        cy.get('.notice-container')
            .should('be.visible')
            .find('.error p')
            .should('have.text', message)
    }

    alertShouldBe(message) {
        cy.get(this.alertError)
            .should('be.visible')
            .should('have.text', message)
    }

    requiredFields(emailMessage, passwordMessage) {
        cy.get(this.alertError)
            .should('have.length', 2)
            .and(($small) => {
                expect($small.get(0).textContent).to.equal(emailMessage)
                expect($small.get(1).textContent).to.equal(passwordMessage)
            })
         }

}


export default new LoginPage()