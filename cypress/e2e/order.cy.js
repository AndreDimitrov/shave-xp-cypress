/// <reference types="cypress"/>

import data from '../fixtures/order.json'
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/views/shavers'
import catalogPage from '../support/pages/views/catalog'
import orderPage from '../support/pages/views/order'

describe('pedido', () => {

    // Vou pegar customer, shaver, service de "data"
    const {customer, shaver, service} = data

    before(() => {
        // Arquivo de Commands: E agora temos duas cutom commands que encapsulam os dois steps de login que já estão na camada de page object.
        cy.createUser(customer)
        // Login pela aplicação.
        // cy.uiLogin(customer)
        // Login pela API.
        cy.apiLogin(customer)

        // Recortado para o arquivo commands
        // loginPage.submit(customer.email, customer.password)
        // Linha abaixo usada como um check point, para sabermos que já estamos onde queremos, no caso, na página de usuário logado.
        // shaversPage.header.userShouldBeLoggedIn(customer.name)
    })

    it('deve poder solicitar serviços', () => {
        // Incluído no arquivo Shavers >> index.js
        // Busca no arquivo "order.js", de fixtures, para pegar massa de dados.
        shaversPage.selectShaver(shaver.name)
        catalogPage.hasShaver(shaver.name)

        catalogPage.selectService(service.description)
        catalogPage.hasTitle(service.description)

        catalogPage.confirmOrder()
        orderPage.hasOrder()
    })
})