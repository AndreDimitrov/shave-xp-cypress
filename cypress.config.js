const { defineConfig } = require("cypress");

// const { removeUser } = require('./cypress/support/tasks/database')

const { Pool } = require('pg')

const dbconfig = {
  host: 'motty.db.elephantsql.com',
  user: 'txqcfxkf',
  password: '6iN2kr4gDy8nVkdSmn7MoS9onV-iWjzU',
  database: 'txqcfxkf',
  port: 5432
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        removeUser(email) {
          // PROMESSA EM JAVASCRIPT
          // como não é código cypress, os eventos não serão aguardados para serem executados, o que pode ocasionar em erro no delete e na criação de usuário.
          // dessa forma, será necessário criar uma procmessa, para que ele aguarde a promessa ser cumprida através do resolve.
          // com o return ele tem que retornar um dado que é o resultado da promessa
          return new Promise(function (resolve) {
            const pool = new Pool(dbconfig)

            // criamos um callback com a function para caso apresente ERRO ou RESULTADO OK
            pool.query('DELETE FROM users WHERE email = $1', [email], function(error, result){
              if(error) {
                throw error
              }
              // caso a promessa for resolvida, ele receberá o argumento de sucesso
              resolve({ success: result})
          })
        })
      }
    })
  },
    viewportWidth: 1920,
    viewportHeight: 1080,
    baseUrl: 'http://localhost:3000'
  },
});
