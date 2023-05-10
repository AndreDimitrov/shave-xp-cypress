import registerUserPage from '../support/pages/views/register-user'
import data from '../fixtures/users-register.json'
// import registerUser from '../support/pages/views/register-user'

describe('faça seu cadastro', () => {
    context('quando submeto o formulário', () => {
        it('deve cadastrar usuário com sucesso', () => {
            const user = data.success

            registerUserPage.go()

            cy.deleteUser(user)

            registerUserPage.submit(user.name, user.email, user.password)

            const message = 'Boas vindas, faça login para solicitar serviços!'
            registerUser.shared.noticeSuccessShouldBe(message)
        })

        it('não deve recadastrar um email que já existe', () => {
            const user = data.sameEmail

            registerUserPage.go()

            cy.createUser(user)

            registerUserPage.submit(user.name, user.email, user.password)

            const message = 'Oops! E-mail já cadastrado.'
            registerUserPage.shared.noticeErrorShouldBe(message)

        })

        it('campos obrigatórios', () => {
            registerUserPage.submit()

            registerUserPage.requiredFields('Nome é obrigatório', 'E-mail é obrigatório')
    
        })
    })

    context('senha muito curta', () => {
        data.shortpass.forEach((p) => {
            it(`não deve cadastrar com a senha: ${p}`, () => {
                registerUser.submit('Papito Rocks', 'papito@teste.com.br', p)
                registerUser.shared.alertShouldBe('Pelo menos 6 caracteres')
            })
        })
    })

    context('email no formato incorreto', () => {
        data.invemails.forEach((e) => {
            it(`não deve cadastrar com o email: ${e}`, () => {
                registerUser.submit('Agatha França', e, 'pwd123')
                registerUser.shared.alertShouldBe('Informe um email válido')
            })
        })
    })
})