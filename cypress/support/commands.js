// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createUser', (user) => {

    // Como eu criei no arquivo "app.js" a linha await(deleteUser(user.email)), então nem precisarei dessa linha em commands.
    // cy.request({
    //     method: 'DELETE',
    //     url: 'http://localhost:5000/user/' + user.email
    // }).then(function (response) {
    //     expect(response.status).to.eq(204)
    // })

    // cy.task('removeUser', user.email)
    //     .then(function (result) {
    //         cy.log(result)
    //     })

    // Verificar a quantidade de campos imformados.
    // "stringify" >> para eu conseguir ler o conteúdo de user.
    cy.log(JSON.stringify(user))

    cy.request({
        method: 'POST',
        // Endereço API helper >> subir seviço "npx nodemon api/app.js"
        url: 'http://localhost:5000/user',
        // failOnStatusCode: false,
        body: user
    }).then(function (response) {
        expect(response.status).to.eq(201)
    })
})