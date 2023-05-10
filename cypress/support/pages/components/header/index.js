class Header {
    userShouldBeLoggedIn(name) {

        // André Dimitrov
        // "split" é uma função do JS que separa strings.
        // Isso se transforma em um array de strings, André na posição "0" a Dimitrov na posição "1".
        const firstName = name.split(' ')[0]

        cy.get('.logged-user div a')
            .should('be.visible')
            .should('have.text', 'Olá, ' + firstName)
    }
}

export default new Header()