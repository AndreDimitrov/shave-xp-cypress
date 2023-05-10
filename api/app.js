const bcrypt = require('bcrypt')
const Joi = require('joi')
const express = require('express')

const validator = require('express-joi-validation').createValidator({
    passError: true
})

const app = express()

// Para que esa api trabalhe com a representação JSON 
app.use(express.json())

const { deleteUser, insertUser, findToken } = require('./db')


// Criando o esquema que vai modelar a entrada de dados
// Garantindo a integridade dos dados
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    is_shaver: Joi.boolean().required()
})

// Criando o esquema, sendo uma rota, para informar o email que será coletado.
app.get('/token/:email', async function (req, res) {
    const { email } = req.params
    // Uma vez que o resultado é devolvido eu acrescento a constante ""token".
    const token = await findToken(email)

    // "!token" >> quer dizer quando o token é nulo.
    if (!token) {
        return res.status(404).end()
    }

    res.status(200).json(token)
})

// app.get('/', function (req, res) {
//   res.send('Ola QAx')

app.get('/welcome', function (req, res) {
    res.json({ message: 'Ola QAx' })
})

app.delete('/user/:email', async function (req, res) {
    // console.log(req.params)
    const { email } = req.params
    await deleteUser(email)
    res.status(204).end()
})

// "Validator", valida o corpo do body para verificar se os dados estão de acordo om a modelagem definida com o "schema".
app.post('/user', validator.body(userSchema), async function (req, res) {
    const { name, email, password, is_shaver } = req.body
    const hashPass = await bcrypt.hash(password, 8)

    const user = {
        name: name,
        email: email,
        password: hashPass,
        is_shaver: is_shaver
    }

    // Faz a verificação se os campos abaixo são nulos.
    // if (!user.name || !user.email || !user.password) {
    //     return res.status(400).json({ message: 'Every field is required.' }) }

    console.log(user)

    try {
        await deleteUser(user.email)
        const id = await insertUser(user)
        // console.log(hashPass)
        res.status(201).json({ user_id: id })
    } catch (error) {
        res.status(500).json({ error: 'Ocorreu um erro.', stack: error })
    }
})

app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        // we had a joi error, let's return a custom 400 json response
        res.status(400).json({
            type: err.type, // will be "query" here, but could be "headers", "body", or "params"
            message: err.error.toString()
        });
    } else {
        // pass on to another error handler
        next(err);
    }
});

app.listen(5000)