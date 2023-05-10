
import header from '../../components/header'

// Aqui só existe o construtor paara poder dar acesso a página.
class ShaversPage {
    constructor() {
        this.header = header
    }

    selectShaver(name) {
        cy.contains('figcaption h3', name)
            .should('be.visible')
            .click()
    }
}

export default new ShaversPage()