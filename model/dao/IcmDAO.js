const Icm = require('../entity/Icm')

class IcmDAO{

    async create(aliquota, status) {
        
        try{
            await Icm.create({ aliquota, status })
            return true
        }
        catch(error){
            return false
        }
}

    async update(id, aliquota, status) {
        try{
            await Icm.update({ aliquota, status }, { where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }


    async delete(id) {  //id de req.params.id
        try{
            await Icm.destroy({ where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }


    async getOne(id) {
        try{
            return await Icm.findByPk(id)
        }
        catch(error){
            return null
        }
    }



    async getAll() {
        try{
            return await Icm.findAll()
        }
        catch(error){
            return null
        }
    }



}




module.exports = IcmDAO