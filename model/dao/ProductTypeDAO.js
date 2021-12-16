const ProductType = require('../entity/ProductType')

class ProductTypeDAO{

    async create( productType) {
        
        try{
            await ProductType.create({ productType })
            return true
        }
        catch(error){
            return false
        }
}


    async update(id, productType, status) {
        try{
            await ProductType.update({ productType, status }, { where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }


    async delete(id) {  //id de req.params.id
        try{
            await ProductType.destroy({ where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }


    async getOne(id) {
        try{
            return await ProductType.findByPk(id)
        }
        catch(error){
            return null
        }
    }



    async getAll() {
        try{
            return await ProductType.findAll()
        }
        catch(error){
            return null
        }
    }

}


module.exports = ProductTypeDAO