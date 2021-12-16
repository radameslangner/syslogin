const Csosn = require('../entity/Csosn')

class CsosnDAO{

    async create(description, csosn, status) {
        
        try{
            await Csosn.create({description, csosn, status})
            return true
        }
        catch(error){
            return false
        }
}


    async update(id, description, csosn, status) {
        try{
            await Csosn.update({ description, csosn, status }, { where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }


    async delete(id) {  //id de req.params.id
        try{
            await Csosn.destroy({ where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }


    async getOne(id) {
        try{
            return await Csosn.findByPk(id)
        }
        catch(error){
            return null
        }
    }



    async getAll() {
        try{
            return await Csosn.findAll()
        }
        catch(error){
            return null
        }
    }



}

module.exports = CsosnDAO