const express = require('express')
const autorizacao = require('../autorizacao/autorizacao')
const routes = express.Router()

routes.get('/', (req, res) => {
    res.render('login', {msg: ''})
})


routes.get('/index', autorizacao, (req, res) => {
    res.render('index', {user: req.session.user, msg: ''})
})


module.exports = routes