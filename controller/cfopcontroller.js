const express = require('express')
const autorizacao = require('../autorizacao/autorizacao')

const Cfop = require('../model/entity/Cfop')
const CfopDAO = require('../model/dao/CfopDAO')

const routes = express.Router()


routes.get('/cfop', autorizacao, async (req, res) => {
    
    let cfopDAO = new CfopDAO()
    let cfops = await cfopDAO.getAll()
    res.render("cfop/cfop", { user: req.session.user, cfops: cfops })  
})


routes.get('/cfop/novo', autorizacao, (req, res) => {

    res.render("cfop/novo", { user: req.session.user })
})


routes.post('/cfop/save', autorizacao, async (req, res) => {
    let { description, cfop} = req.body
    
    let cfopDAO = new CfopDAO()

        if (await cfopDAO.create( description, cfop)) {
            res.redirect('/cfop')
        }
        else {res.render('erro', {msg: 'Falha na tentativa de cadastro do novo CFOP.'})}
})



routes.get('/cfop/edit/:id', autorizacao, async (req, res) => {
    let id = req.params.id
    let cfopDAO = new CfopDAO()
    let cfop = await cfopDAO.getOne(id)

    if (cfop) {
        res.render('cfop/edit', {cfop: cfop, user: req.session.user})
    }
    else res.render('erro', { msg: 'Falha na tentativa de busca dos dados de CFOP.' })
})


routes.post('/cfop/edit', autorizacao, async (req, res) => {
    let {id, description, cfop, status} = req.body

    let cfopDAO = new CfopDAO()
    if ( await cfopDAO.update(id, description, cfop, status)){
   
        res.redirect('/cfop')
    }
    else {res.render('erro', {msg: 'Falha na tentativa de edição do Código CFOP.'})}
})


routes.get('/cfop/excluir/:id', async (req,res) => {
    let id = req.params.id
    let cfopDAO = new CfopDAO()
    if (await cfopDAO.delete(id)){
        res.redirect('/cfop')
    }
    else {res.render('erro', {msg: 'Falha na tentativa de excluir cadastro de CFOP.'})}
})


module.exports = routes