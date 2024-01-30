Cypress.Commands.add('createUser', (user) => {
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

Cypress.Commands.add('deleteUser', (user) => {

    // Como eu criei no arquivo "app.js" a linha await(deleteUser(user.email)), então nem precisarei dessa linha em commands.
    cy.request({
        method: 'DELETE',
        url: 'http://localhost:5000/user/' + user.email
    }).then(function (response) {
        expect(response.status).to.eq(204)
    })

    // cy.task('removeUser', user.email)
    //     .then(function (result) {
    //         cy.log(result)
    //     })

    // Verificar a quantidade de campos imformados.
    // "stringify" >> para eu conseguir ler o conteúdo de user.


})


// Arquivo "recovery-pass".
// Request para solicitar o resgate de senha, via POST.
Cypress.Commands.add('recoveryPass', (email) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/password/forgot',
        body: {
            email: email
        }
    }).then(result => {
        expect(result.status).to.eql(204)
    })
})

// Arquivo "recovery-pass".
// Mais uma request para obter o TOKEN.
Cypress.Commands.add('getToken', (email) => {
    cy.request({
        method: 'GET',
        url: 'http://localhost:5000/token/' + email

    }).then(result => {
        expect(result.status).to.eql(200)
        // Linha abaixo para identificar o TOKEN.
        // cy.log(JSON.stringify(result.body))
        // Linha abaixo para apresentar o TOKEN.
        cy.log(result.body.token)
        // Utilizr o TOKEN no próximo bloco.
        // Criar a variável de ambiente "token", com o valor que consta em "result.body.token".
        Cypress.env('passToken', result.body.token)
    })
})

// Estou fazendo uma requisição POST na api do shaverXP para poder autenticar via api o usuário que quero logar.
Cypress.Commands.add('apiLogin', (user) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/sessions',
        body: { email: user.email, password: user.password }
    }).then(response => {
        expec(response.status).to.eql(200) 
        
        // A aplicação pega essa resposta da api e joga no local storage do navegador.
        const {user, token} = response.body

        // Linhas localizadas em Storage da página ao inspecionar >> F12 >> Application.
        window.localStorage.setItem('@ShaveXP:token', token)
        // Mas o "user" é um objeto que tem ID, ID, NAME. Stringify pra jogar lá dentro como uma string, em uma linha cmo string.
        window.localStorage.setItem('@ShaveXP:user', JSON.stringify(user))
    })

    // Para chamar a página.
    cy.visit('/')
    


})
