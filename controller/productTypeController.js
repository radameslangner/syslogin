const express = require('express')
const autorizacao = require('../autorizacao/autorizacao')

const ProductType = require('../model/entity/ProductType')
const ProductTypeDAO = require('../model/dao/ProductTypeDAO')

const routes = express.Router()


routes.get('/productType', autorizacao, async (req, res) => {
    
    let productTypeDAO = new ProductTypeDAO()
    let productTypes = await productTypeDAO.getAll()
    res.render("productType/productType", { user: req.session.user, productTypes: productTypes })  
})



routes.get('/productType/novo', autorizacao, (req, res) => {

    res.render("productType/novo", { user: req.session.user })
})




routes.post('/productType/save', autorizacao, async (req, res) => {
    let { productType } = req.body
    
    let productTypeDAO = new ProductTypeDAO()

        if (await productTypeDAO.create( productType )) {
            res.redirect('/productType')
        }
        else {res.render('erro', {msg: 'Falha na Tentativa de Cadastro de Tipo de Produto!.'})}
})



routes.get('/productType/edit/:id', autorizacao, async (req, res) => {
    let id = req.params.id
    let productTypeDAO = new ProductTypeDAO()
    let productType = await productTypeDAO.getOne(id)

    if (productType) {
        res.render('productType/edit', {productType: productType, user: req.session.user})
    }
    else res.render('erro', { msg: 'Falha na tentativa de busca dos dados de Tamanho.' })
})



routes.post('/productType/edit', autorizacao, async (req, res) => {
    let {id, productType, status} = req.body

    let productTypeDAO = new ProductTypeDAO()
    if ( await productTypeDAO.update(id, productType, status)){
   
        res.redirect('/productType')
    }
    else {res.render('erro', {msg: 'Falha na tentativa de edição de Tamanho.'})}
})


routes.get('/productType/excluir/:id', async (req,res) => {
    let id = req.params.id
    let productTypeDAO = new ProductTypeDAO()
    if (await productTypeDAO.delete(id)){
        res.redirect('/productType')
    }
    else {res.render('erro', {msg: 'Falha na Tentativa de Excluir Tipo de Produto.'})}
})


module.exports = routes