const Cfop = require('../entity/Cfop')

class CfopDAO{

    async create(description, cfop, status) {
        
        try{
            await Cfop.create({description, cfop, status})
            return true
        }
        catch(error){
            return false
        }
}


    async update(id, description, cfop, status) {
        try{
            await Cfop.update({ description, cfop, status }, { where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }


    async delete(id) {  //id de req.params.id
        try{
            await Cfop.destroy({ where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }


    async getOne(id) {
        try{
            return await Cfop.findByPk(id)
        }
        catch(error){
            return null
        }
    }



    async getAll() {
        try{
            return await Cfop.findAll()
        }
        catch(error){
            return null
        }
    }



}

module.exports = CfopDAO