const express = require('express')
const autorizacao = require('../autorizacao/autorizacao')

const FiscalOperation = require('../model/entity/FiscalOperation')
const FiscalOperationDAO = require('../model/dao/FiscalOperationDAO')

const Cfop = require('../model/entity/Cfop')
const CfopDAO = require('../model/dao/CfopDAO')

const Csosn = require('../model/entity/Csosn')
const CsosnDAO = require('../model/dao/CsosnDAO')

const Icm = require('../model/entity/Icm')
const IcmDAO = require('../model/dao/IcmDAO')

const routes = express.Router()


routes.get('/fiscalOperation', autorizacao, async (req, res) => {
    
    let fiscalOperationDAO = new FiscalOperationDAO()
    let fiscalOperations = await fiscalOperationDAO.getAll()
    
    res.render("fiscalOperation/fiscalOperation", { user: req.session.user, fiscalOperations: fiscalOperations })  
})



routes.get('/fiscalOperation/novo', autorizacao, async (req, res) => {

    let cfopDAO = new CfopDAO()
    let cfops = await cfopDAO.getAll()

    let csosnDAO = new CsosnDAO()
    let csosns = await csosnDAO.getAll()

    let icmDAO = new IcmDAO()
    let icms = await icmDAO.getAll()

    res.render("fiscalOperation/novo", { user: req.session.user, cfops: cfops, csosns: csosns, icms: icms })
})


routes.post('/fiscalOperation/save', autorizacao, async (req, res) => {
    let {fiscalOperation, cfopId, csosnId, icmId} = req.body
    
    console.log('req.body:', req.body)

    let fiscalOperationDAO = new FiscalOperationDAO()

        if (await fiscalOperationDAO.create(fiscalOperation, parseInt(cfopId), parseInt(csosnId), parseInt(icmId) )) {
            res.redirect('/fiscalOperation')
        }
        else {res.render('erro', {msg: 'Falha na tentativa de cadastro de Operação Fiscal.'})}
})



routes.get('/fiscalOperation/edit/:id', autorizacao, async (req, res) => {
    let id = req.params.id
    let fiscalOperationDAO = new FiscalOperationDAO()
    let fiscalOperation = await fiscalOperationDAO.getOne(id)

    let cfopDAO = new CfopDAO()
    let cfops = await cfopDAO.getAll()

    let csosnDAO = new CsosnDAO()
    let csosns = await csosnDAO.getAll()

    let icmDAO = new IcmDAO()
    let icms = await icmDAO.getAll()

    if (fiscalOperation) {
        res.render('fiscalOperation/edit', {fiscalOperation: fiscalOperation, cfops: cfops, csosns: csosns, icms: icms, user: req.session.user})
    }
    else res.render('erro', { msg: 'Falha na tentativa de busca dos dados da Unidade.' })
})


routes.post('/fiscalOperation/edit', autorizacao, async (req, res) => {
    let {id, fiscalOperation, status, cfopId, csosnId, icmId} = req.body

    let fiscalOperationDAO = new FiscalOperationDAO()
    if ( await fiscalOperationDAO.update(id, fiscalOperation, status, cfopId, csosnId, icmId)){
   
        res.redirect('/fiscaloperation')
    }
    else {res.render('erro', {msg: 'Falha na tentativa de edição da Unidade.'})}
})


routes.get('/fiscaloperation/excluir/:id', async (req,res) => {
    let id = req.params.id
    let fiscaloperationDAO = new FiscalOperationDAO()
    if (await fiscaloperationDAO.delete(id)){
        res.redirect('/fiscaloperation')
    }
    else {res.render('erro', {msg: 'Falha na tentativa de excluir Unidade.'})}
})



module.exports = routes