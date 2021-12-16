const FiscalOperation = require('../entity/FiscalOperation')
const Cfop = require('../entity/Cfop')
const Csosn = require('../entity/Csosn')
const Icm = require('../entity/Icm')

class FiscalOperationDAO{

    async create(fiscalOperation, cfopId, csosnId, icmId) {
        
        try{
            await FiscalOperation.create({fiscalOperation, cfopId, csosnId, icmId})
            return true
        }
        catch(error){
            return false
        }
}


    async update(id, fiscalOperation, status, cfopId, csosnId, icmId) {
        try{
            await FiscalOperation.update({ fiscalOperation, status, cfopId, csosnId, icmId }, { where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }


    async delete(id) {  //id de req.params.id
        try{
            await FiscalOperation.destroy({ where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }


    async getOne(id) {
        try{
            return await FiscalOperation.findByPk(id)
        }
        catch(error){
            return null
        }
    }



    async getAll() {
        try{
            return await FiscalOperation.findAll( { include: [{model: Cfop}, {model: Csosn}, {model: Icm}] })
        }
        catch(error){
            return null
        }
    }

}


module.exports = FiscalOperationDAO