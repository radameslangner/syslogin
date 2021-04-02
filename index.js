const express = require('express')
const formataData = require('./public/js/utils/util')
const session = require('express-session');

const admController = require('./controller/admController')
const userController = require('./controller/userController')
const connection = require('./model/dao/connection')


const app = express()

const autorizacao = require("./autorizacao/autorizacao")

app.use(session({ secret: "Um%55kjds", resave: true, saveUninitialized: true }));

app.use(express.urlencoded(({ extended: true })))

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.use(admController, userController)

app.listen(3000, () => {
    console.log('Aplicação em execução na porta 3000.')
})

