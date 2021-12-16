const express = require('express')
const autorizacao = require('../autorizacao/autorizacao')

const NcmDAO = require('../model/dao/NcmDAO')
const Ncm = require('../model/entity/Ncm')

const routes = express.Router()


routes.get('/fiscal', (req, res) => {

    res.render("fiscal/fiscal", { user: req.session.user })
})


module.exports = routes