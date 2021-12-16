
const Imgproduct = require('../entity/Imgproduct')

class ImgproductDAO{

    async create(imgname, path) {
        
        try{
            await Imgproduct.create({imgname, path})
            return true
        }
        catch(error){
            return false
        }
}


    async update(id, imgname, path) {
        try{
            await Imgproduct.update({ imgname, path }, { where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }


    async delete(id) {  //id de req.params.id
        try{
            await Imgproduct.destroy({ where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }


    async getOne(id) {
        try{
            return await Imgproduct.findByPk(id)
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


module.exports = ImgproductDAO