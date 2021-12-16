const express = require('express')
const autorizacao = require('../autorizacao/autorizacao')

const Size = require('../model/entity/Size')
const SizeDAO = require('../model/dao/SizeDAO')

const routes = express.Router()


routes.get('/size', autorizacao, async (req, res) => {
    
    let sizeDAO = new SizeDAO()
    let sizes = await sizeDAO.getAll()
    res.render("size/size", { user: req.session.user, sizes: sizes })  
})



routes.get('/size/novo', autorizacao, (req, res) => {

    res.render("size/novo", { user: req.session.user })
})


routes.post('/size/save', autorizacao, async (req, res) => {
    let {size, description} = req.body
    
    let sizeDAO = new SizeDAO()

        if (await sizeDAO.create(size, description )) {
            res.redirect('/size')
        }
        else {res.render('erro', {msg: 'Falha na tentativa de cadastro de novo Tamanho!.'})}
})



routes.get('/size/edit/:id', autorizacao, async (req, res) => {
    let id = req.params.id
    let sizeDAO = new SizeDAO()
    let size = await sizeDAO.getOne(id)

    if (size) {
        res.render('size/edit', {size: size, user: req.session.user})
    }
    else res.render('erro', { msg: 'Falha na tentativa de busca dos dados de Tamanho.' })
})


routes.post('/size/edit', autorizacao, async (req, res) => {
    let {id, size, description, status} = req.body

    let sizeDAO = new SizeDAO()
    if ( await sizeDAO.update(id, size, description, status)){
   
        res.redirect('/size')
    }
    else {res.render('erro', {msg: 'Falha na tentativa de edição de Tamanho.'})}
})


routes.get('/size/excluir/:id', async (req,res) => {
    let id = req.params.id
    let sizeDAO = new SizeDAO()
    if (await sizeDAO.delete(id)){
        res.redirect('/size')
    }
    else {res.render('erro', {msg: 'Falha na tentativa de excluir Tamanho.'})}
})



module.exports = routes