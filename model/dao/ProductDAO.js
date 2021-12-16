const Product = require('../entity/Product')
const ProductType = require('../entity/ProductType')
const Unity = require('../entity/Unity')
const Size = require('../entity/Size')
const Ncm = require('../entity/Ncm')

const Cfop = require('../entity/Cfop')
const Csosn = require('../entity/Csosn')
const Icm = require('../entity/Icm')


const FiscalOperation = require('../entity/FiscalOperation')

class ProductDAO{

    async create(description, reference, cost, price, productTypeId, unityId, sizeId, ncmId, fiscalOperationId) {
        
        try{
            await Product.create({description, reference, cost, price, productTypeId, unityId, sizeId, ncmId, fiscalOperationId})
            return true
        }
        catch(error){
            return false
        }
}


    async update(id, description, reference, cost, price, productTypeId, unityId, sizeId, ncmId, fiscalOperationId) {
        try{
            await Product.update({ description, reference, cost, price, productTypeId, unityId, sizeId, ncmId, fiscalOperationId }, { where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }


    async delete(id) {  //id de req.params.id
        try{
            await Product.destroy({ where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }


    async getOne(id) {
        try{
            return await Product.findByPk(id)
        }
        catch(error){
            return null
        }
    }



    async getAll() {
        try{
            return await Product.findAll( { include: [ {model: ProductType}, {model: Unity}, {model: Size}, {model: Ncm}, {model: FiscalOperation} ] } )
        }
        catch(error){
            return null
        }
    }

}


module.exports = ProductDAO