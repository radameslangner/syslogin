const express = require('express')
const formataData = require('./public/js/utils/util')
const session = require('express-session');
const connection = require('./model/dao/connection')
const admController = require('./controller/admController')
const userController = require('./controller/userController')
const fiscalController = require('./controller/fiscalController')

const cfopController = require('./controller/cfopcontroller')
const csosnController = require('./controller/csosnController')
const icmController = require('./controller/icmController')
const fiscalOperationController = require('./controller/fiscalOperationController')

const productTypeController = require('./controller/productTypeController')
const unityController = require('./controller/unityController')
const sizeController = require('./controller/sizeController')
const ncmController = require('./controller/ncmController')
const imgproductController = require('./controller/imgproductController')
const productController = require('./controller/productController')


const app = express()

const autorizacao = require("./autorizacao/autorizacao")

app.use(session({ secret: "Um%55kjds", resave: true, saveUninitialized: true }));

app.use(express.urlencoded(({ extended: true })))

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.use(admController, 
        userController,
        fiscalController, 
        cfopController, 
        csosnController,
        icmController,
        fiscalOperationController, 
        productTypeController,
        unityController,
        sizeController, 
        ncmController, 
        imgproductController,
        productController)

app.listen(3000, () => {
    console.log('Aplicação em execução na porta 3000.')
})

