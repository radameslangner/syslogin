const express = require('express')
const autorizacao = require('../autorizacao/autorizacao')

const IcmDAO = require('../model/dao/IcmDAO')
const Icm = require('../model/entity/Icm')

const routes = express.Router()


routes.get('/icm', autorizacao, async (req, res) => {
    
    let icmDAO = new IcmDAO()
    let icms = await icmDAO.getAll()
    res.render("icm/icm", { user: req.session.user, icms: icms })
    
})



routes.get('/icm/novo', autorizacao, (req, res) => {

    res.render("icm/novo", { user: req.session.user })
})


routes.post('/icm/save', autorizacao, async (req, res) => {
    let { aliquota} = req.body
    
    let icmDAO = new IcmDAO()

        if (await icmDAO.create( aliquota)) {
            res.redirect('/icm')
        }
        else {res.render('erro', {msg: 'Falha na tentativa de cadastro de Alíquota de ICMS.'})}
    
})



routes.get('/icm/edit/:id', autorizacao, async (req, res) => {
    let id = req.params.id
    let icmDAO = new IcmDAO()
    let icm = await icmDAO.getOne(id)

    if (icm) {
        res.render('icm/edit', {icm: icm, user: req.session.user})
    }
    else res.render('erro', { msg: 'Falha na tentativa de busca dos dados de Alíquota de ICMS.' })
})



routes.post('/icm/edit', autorizacao, async (req, res) => {
    let {id, aliquota, status} = req.body

    let icmDAO = new IcmDAO()
    if ( await icmDAO.update(id, aliquota, status)){
        console.log(id, aliquota, status)
        res.redirect('/icm')
    }
    else {res.render('erro', { msg: 'Falha na tentativa de edição da nova Alíquota de ICMS.'})}
})



routes.get('/icm/excluir/:id', autorizacao,  async (req,res) => {
    let id = req.params.id
    let icmDAO = new IcmDAO()
    if (await icmDAO.delete(id)){
        res.redirect('/icm')
    }
    else {res.render('erro', {msg: 'Falha na tentativa de edição da Alíquota de ICMS.'})}
})


module.exports = routes