const Unity = require('../entity/Unity')

class UnityDAO{

    async create(unity, description, status) {
        
        try{
            await Unity.create({unity, description, status})
            return true
        }
        catch(error){
            return false
        }
}


    async update(id, unity, description, status) {
        try{
            await Unity.update({ unity, description, status }, { where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }


    async delete(id) {  //id de req.params.id
        try{
            await Unity.destroy({ where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }


    async getOne(id) {
        try{
            return await Unity.findByPk(id)
        }
        catch(error){
            return null
        }
    }



    async getAll() {
        try{
            return await Unity.findAll()
        }
        catch(error){
            return null
        }
    }

}


module.exports = UnityDAO