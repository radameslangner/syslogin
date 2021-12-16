const express = require('express')
const autorizacao = require('../autorizacao/autorizacao')

const Imgproduct = require('../model/entity/Imgproduct')
const ImgprodcutDAO = require('../model/dao/ImgprodcutDAO')

const routes = express.Router()


routes.get('/imgproduct', autorizacao, async (req, res) => {
    
    let ImgprodcutDAO = new ImgprodcutDAO()
    let imgproducts = await ImgprodcutDAO.getAll()
    res.render("unity/unity", { user: req.session.user, imgproducts: imgproducts })  
})

/*

routes.get('/unity/novo', autorizacao, (req, res) => {

    res.render("unity/novo", { user: req.session.user })
})


routes.post('/unity/save', autorizacao, async (req, res) => {
    let {unity, description} = req.body
    
    let unityDAO = new UnityDAO()

        if (await unityDAO.create(unity, description )) {
            res.redirect('/unity')
        }
        else {res.render('erro', {msg: 'Falha na tentativa de cadastro do nova Unidade.'})}
})



routes.get('/unity/edit/:id', autorizacao, async (req, res) => {
    let id = req.params.id
    let unityDAO = new UnityDAO()
    let unity = await unityDAO.getOne(id)

    if (unity) {
        res.render('unity/edit', {unity: unity, user: req.session.user})
    }
    else res.render('erro', { msg: 'Falha na tentativa de busca dos dados da Unidade.' })
})


routes.post('/unity/edit', autorizacao, async (req, res) => {
    let {id, unity, description, status} = req.body

    let unityDAO = new UnityDAO()
    if ( await unityDAO.update(id, unity, description, status)){
   
        res.redirect('/unity')
    }
    else {res.render('erro', {msg: 'Falha na tentativa de edição da Unidade.'})}
})


routes.get('/unity/excluir/:id', async (req,res) => {
    let id = req.params.id
    let unityDAO = new UnityDAO()
    if (await unityDAO.delete(id)){
        res.redirect('/unity')
    }
    else {res.render('erro', {msg: 'Falha na tentativa de excluir Unidade.'})}
})

*/

module.exports = routes