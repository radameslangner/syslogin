const Size = require('../entity/Size')

class SizeDAO{

    async create(size, description, status) {
        
        try{
            await Size.create({size, description, status})
            return true
        }
        catch(error){
            return false
        }
}


    async update(id, size, description, status) {
        try{
            await Size.update({ size, description, status }, { where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }


    async delete(id) {  //id de req.params.id
        try{
            await Size.destroy({ where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }


    async getOne(id) {
        try{
            return await Size.findByPk(id)
        }
        catch(error){
            return null
        }
    }



    async getAll() {
        try{
            return await Size.findAll()
        }
        catch(error){
            return null
        }
    }

}


module.exports = SizeDAO