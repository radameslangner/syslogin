const express = require('express')
const autorizacao = require('../autorizacao/autorizacao')

const NcmDAO = require('../model/dao/NcmDAO')
const Ncm = require('../model/entity/Ncm')

const routes = express.Router()


routes.get('/ncm', autorizacao, async (req, res) => {
    
    let ncmDAO = new NcmDAO()
    let ncms = await ncmDAO.getAll()
    res.render("ncm/ncm", { user: req.session.user, ncms: ncms })
    
    
})



routes.get('/ncm/novo', autorizacao, (req, res) => {

    res.render("ncm/novo", { user: req.session.user })
})


routes.post('/ncm/save', autorizacao, async (req, res) => {
    let { description, ncm} = req.body
    
    let ncmDAO = new NcmDAO()

        if (await ncmDAO.create( description, ncm)) {
            res.redirect('/ncm')
        }
        else {res.render('erro', {msg: 'Falha na tentativa de cadastro do novo NCM.'})}
    
})



routes.get('/ncm/edit/:id', autorizacao, async (req, res) => {
    let id = req.params.id
    let ncmDAO = new NcmDAO()
    let ncm = await ncmDAO.getOne(id)

    if (ncm) {
        res.render('ncm/edit', {ncm: ncm, user: req.session.user})
    }
    else res.render('erro', { msg: 'Falha na tentativa de busca dos dados de nNCM.' })
})



routes.post('/ncm/edit', autorizacao, async (req, res) => {
    let {id, description, ncm, status} = req.body

    let ncmDAO = new NcmDAO()
    if ( await ncmDAO.update(id, description, ncm, status)){
        console.log(id, description, ncm, status)
        res.redirect('/ncm')
    }
    else {res.render('erro', {msg: 'Falha na tentativa de edição do novo NCM.'})}
})



routes.get('/ncm/excluir/:id', autorizacao,  async (req,res) => {
    let id = req.params.id
    let ncmDAO = new NcmDAO()
    if (await ncmDAO.delete(id)){
        res.redirect('/ncm')
    }
    else {res.render('erro', {msg: 'Falha na tentativa de edição do novo NCM.'})}
})
module.exports = routes