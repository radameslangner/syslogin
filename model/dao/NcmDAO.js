const Ncm = require('../entity/Ncm')

class NcmDAO{

    async create(description, ncm, status) {
        
        try{
            await Ncm.create({description, ncm, status})
            return true
        }
        catch(error){
            return false
        }
}

    async update(id, description, ncm, status) {
        try{
            await Ncm.update({ description, ncm, status }, { where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }


    async delete(id) {  //id de req.params.id
        try{
            await Ncm.destroy({ where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }


    async getOne(id) {
        try{
            return await Ncm.findByPk(id)
        }
        catch(error){
            return null
        }
    }



    async getAll() {
        try{
            return await Ncm.findAll()
        }
        catch(error){
            return null
        }
    }



}




module.exports = NcmDAO