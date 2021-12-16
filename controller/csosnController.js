const express = require('express')
const autorizacao = require('../autorizacao/autorizacao')

const Csosn = require('../model/entity/Csosn')
const CsosnDAO = require('../model/dao/CsosnDAO')

const routes = express.Router()


routes.get('/csosn', autorizacao, async (req, res) => {
    
    let csosnDAO = new CsosnDAO()
    let csosns = await csosnDAO.getAll()
    res.render("csosn/csosn", { user: req.session.user, csosns: csosns })  
})




routes.get('/csosn/novo', autorizacao, (req, res) => {

    res.render("csosn/novo", { user: req.session.user })
})


routes.post('/csosn/save', autorizacao, async (req, res) => {
    let { description, csosn} = req.body
    
    let csosnDAO = new CsosnDAO()

        if (await csosnDAO.create( description, csosn)) {
            res.redirect('/csosn')
        }
        else {res.render('erro', {msg: 'Falha na tentativa de cadastro do novo CSOSN.'})}
})



routes.get('/csosn/edit/:id', autorizacao, async (req, res) => {
    let id = req.params.id
    let csosnDAO = new CsosnDAO()
    let csosn = await csosnDAO.getOne(id)

    if (csosn) {
        res.render('csosn/edit', {csosn: csosn, user: req.session.user})
    }
    else res.render('erro', { msg: 'Falha na tentativa de busca dos dados de CSOSN.' })
})


routes.post('/csosn/edit', autorizacao, async (req, res) => {
    let {id, description, csosn, status} = req.body

    let csosnDAO = new CsosnDAO()
    console.log('id: ', id, description, csosn, status)
    if ( await csosnDAO.update(id, description, csosn, status)){
        console.log('id: ',id, description, csosn, status)
        res.redirect('/csosn')
    }
    else {res.render('erro', {msg: 'Falha na tentativa de edição do Código CSOSN.'})}
})


routes.get('/csosn/excluir/:id', async (req,res) => {
    let id = req.params.id
    let csosnDAO = new CsosnDAO()
    if (await csosnDAO.delete(id)){
        res.redirect('/csosn')
    }
    else {res.render('erro', {msg: 'Falha na tentativa de excluir cadastro de CSOSN.'})}
})


module.exports = routes