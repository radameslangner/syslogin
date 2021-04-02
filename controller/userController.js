const express = require('express')
const autorizacao = require('../autorizacao/autorizacao')
const sendMailForgets = require('../public/js/utils/sendMailForgets')
const criptograf = require('../public/js/utils/cripograf')
const compare = require('../public/js/utils/compare')
const codeRandomString = require('../public/js/utils/codeRandomString')
const UserDAO = require('../model/dao/UserDAO')
const bcrypt = require('bcryptjs')
const routes = express.Router()
const nodemailer = require('nodemailer')


//Rotas do usuário.

routes.post('/login', async (req, res) => {
    let { email, senha } = req.body
    let userDAO = new UserDAO()
    let user = await userDAO.getByLogin(email, senha)
    if (user) {
        req.session.user = user
        res.render('index', { user: req.session.user })
    }
    else
        res.render('login', { msg: 'Usuário ou senha inválidos.' })
})



routes.get('/logout', (req, res) => {
    req.session.user = undefined
    res.redirect("/")
})


routes.get('/user/new', (req, res) => {
    res.render("user/user")
})


routes.post('/user/save', async (req, res) => {
    let { nome, email, senha, confirmaSenha } = req.body
    let forgets = ''
    let userDAO = new UserDAO()
    if (senha != '' && senha == confirmaSenha) {
        if (await userDAO.getByMail(email)) {
            res.render('erro', {msg: 'e-mail já cadastrado!'})
        } else 
        if (await userDAO.create(nome, email, senha, forgets)) {
            res.render('login', {msg: 'Usuário cadastrado, realize o login!'})
        }
        else {res.render('erro', {msg: 'Falha na tentativa de cadastro do novo usuário.'})}
    } else {res.render('erro', {msg: 'Senha e confirma senha devem ser iguais!'})}
})


routes.post('/user/recoveryPasswd', autorizacao, async (req, res) => {
    let {id, email, novaSenha, confirmaSenha} = req.body
    let userDAO = new UserDAO()
    if (novaSenha != '' && novaSenha == confirmaSenha){
    if (await userDAO.resetPasswd(id, novaSenha)) {
        res.redirect('/index')
    }
    else {
        res.render('erro', {msg: 'Falha na tentativa de atualizar cadastro de usuario!'})
    }
} else res.render('erro', {msg: 'Nova Senha deve ser igual a confirmar senha!'}) 
})



routes.get('/user/excluir/:id', autorizacao, async (req, res) => {
    let userDAO = new UserDAO()
    if (await userDAO.delete(req.params.id))
        res.render('user/user')
    else
        res.render('erro', { msg: 'Falha na tentativa de alteração dos dados de um usuário.' })
})



routes.get('/user/edit/:id', autorizacao, async (req, res) => {
    let userDAO = new UserDAO()
    let user = await userDAO.getOne(req.params.id)
    if (user) {
        res.render('user/edit', {user: user })
    } else
    res.render('erro', { msg: 'Falha na tentativa de alteração dos dados de um usuário.' })
    
})


routes.post('/user/update', autorizacao, async (req, res) => {
    let { id, nome, email, senhaAtual, senhaBanco} = req.body
      
    if (compare(senhaAtual, senhaBanco)) {
            let userDAO = new UserDAO()
            if (await userDAO.update(id, nome, email )) {
                res.redirect('/index')
            } res.render('erro', {msg: 'Falha na tentativa de atualizar cadastro de usuario!'})
    } else res.render('erro', {msg: 'Senha Atual Incorreta!'})
})


routes.get('/user/updatePassWord/:id', autorizacao, async (req, res) => {
    let userDAO = new UserDAO()
    let user = await userDAO.getOne(req.params.id)
    if (user) {
        res.render('user/updatePassWord', {user: user})
    } else
        res.render('erro', { msg: 'Falha na tentativa de alteração da senha do um usuário.' })
})


routes.post('/user/resetPasswd', async (req, res) => {
    let { id, nome, email, novaSenha, confirmaSenha, senhaAtual, senhaBanco} = req.body
      
    if (compare(senhaAtual, senhaBanco)) {
        let senha = novaSenha
        if ( novaSenha != '' && novaSenha == confirmaSenha) {
            let userDAO = new UserDAO()
            if (await userDAO.resetPasswd(id, senha )) {
                res.redirect('/index')
            }
            else {
                res.render('erro', {msg: 'Falha na tentativa de atualizar cadastro de usuario!'})
            }
        } else res.render('erro', {msg: 'Nova Senha deve ser igual a confirmar senha!'}) 
    } else res.render('erro', {msg: 'Senha Atual Incorreta!'})

})

routes.get('/user/forgets', (req, res) => {
    res.render('user/forgets')
})


routes.post('/user/sendMail', async (req, res) => {
    let {email} = req.body
    let forgets = codeRandomString()
    let userDAO = new UserDAO() 
    if (await userDAO.updateForgets(email, criptograf(forgets))) {
        sendMailForgets(email, forgets)  
        res.render('user/checkCodeForgets')
    } else res.render('erro', {msg: 'Falha na tentativa de recuperar senha do usuario!'})
       

}) 


routes.post('/user/openSessionForgets', async  (req, res) => {
    let {email, forgets} = req.body
    forgets = forgets.toUpperCase()
    console.log(forgets)
    let userDAO = new UserDAO()
    let user = await userDAO.checkForgets(email, forgets) 
    if (user) {
        req.session.user = user
        res.render('user/definePassword', {user: req.session.user})
    } else 
        res.render('login', {msg: "Código de recuperação ou e-mail inválido."})
})

module.exports = routes