const { Pool } = require('pg')

const dbconfig = {
    host: 'motty.db.elephantsql.com',
    user: 'txqcfxkf',
    password: '6iN2kr4gDy8nVkdSmn7MoS9onV-iWjzU',
    database: 'txqcfxkf',
    port: 5432
}

const pool = new Pool(dbconfig)

async function deleteUser(email) {
    await pool.query('DELETE FROM users WHERE email = $1', [email])
}

async function insertUser(user) {
    const sql = 'INSERT INTO users (name, email, password, is_shaver) VALUES ($1, $2, $3, $4) returning id'
    const data = [user.name, user.email, user.password, user.is_shaver]

    const result = await pool.query(sql, data)
    const { id } = result.rows[0]

    return id
}

// Fazer esse select no banco e receber o email como argumento pra poder trazer o token.
// Em seguida impementar uma rota em "app.js".
async function findToken(email) {
    const sql = 'select B.token from users A inner join user_tokens B on A.id = B.user_id where A.email = $1 order by B.created_at desc limit 1'

    const result = await pool.query(sql, [email])

    // ".rows" para trazer apenas as informações que eu preciso, e na posição "0".
    console.log(result.rows[0])

    // Agora essa função está devolvendo um resultado.
    return result.rows[0]
}

module.exports = {
    deleteUser,
    insertUser,
    findToken
}