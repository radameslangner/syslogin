const express = require('express')
const autorizacao = require('../autorizacao/autorizacao')

const Product = require('../model/entity/Product')
const ProductDAO = require('../model/dao/ProductDAO')

const ProductType = require('../model/entity/ProductType')
const ProductTypeDAO = require('../model/dao/ProductTypeDAO')

const Unity = require('../model/entity/Unity')
const UnityDAO = require('../model/dao/UnityDAO')

const Size = require('../model/entity/Size')
const SizeDAO = require('../model/dao/SizeDAO')


const Ncm = require('../model/entity/Ncm')
const NcmDAO = require('../model/dao/NcmDAO')

const FiscalOperation = require('../model/entity/FiscalOperation')
const FiscalOperationDAO = require('../model/dao/FiscalOperationDAO')

const routes = express.Router()


routes.get('/product', autorizacao, async (req, res) => {

    let productDAO = new ProductDAO()
    let products = await productDAO.getAll()
        

    res.render("product/product", { user: req.session.user, products: products })
})


routes.get('/product/novo', autorizacao, async (req, res) => {

    let productTypeDAO = new ProductTypeDAO()
    let productTypes = await productTypeDAO.getAll()

    let unityDAO = new UnityDAO()
    let unities = await unityDAO.getAll()

    let sizeDAO = new SizeDAO()
    let sizes = await sizeDAO.getAll()

    let ncmDAO = new NcmDAO()
    let ncms = await ncmDAO.getAll()    

    let fiscalOperationDAO = new FiscalOperationDAO()
    let fiscalOperations = await fiscalOperationDAO.getAll()

    res.render("product/novo", { user: req.session.user, productTypes: productTypes, unities: unities, sizes: sizes, ncms: ncms, fiscalOperations: fiscalOperations })
})


routes.post('/product/save', autorizacao, async (req, res) => {
    let { description, reference, cost, price, productTypeId, unityId, sizeId, ncmId, fiscalOperationId } = req.body
    
        let productDAO = new ProductDAO()

        if (await productDAO.create( description, reference, parseFloat(cost), parseFloat(price), productTypeId, unityId, sizeId, ncmId, fiscalOperationId )) {
            res.redirect('/product')
        }
        else {res.render('erro', {msg: 'Falha na tentativa de cadastro de Produto.'})}
})




module.exports = routes