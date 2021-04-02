const bcrypt = require('bcryptjs')
const criptograf = require('../../public/js/utils/cripograf')
const compare = require('../../public/js/utils/compare')
const User = require('../entity/User')


class UserDAO{

    async create(nome, email, senha, forgets) {
    senha = criptograf(senha)
    try{
        await User.create({nome, email, senha, forgets})
        return true
    }
    catch(error){
        return false
    }
}


async resetPasswd(id, senha) {
    senha = criptograf(senha)
    try{
        await User.update({ senha }, { where: { id: id } })
        return true
    }
    catch(error){
        return false
    }
}


    async getByLogin(email, senha) {
        try{
            let user = await User.findOne({ where: { email: email } })
            if(user)
                if (compare(senha, user.senha)) {
                    return user
                } else return null
        }
        catch(error){
            return null
        }
    }  


    async checkForgets(email, forgets) {
        try{
            let user = await User.findOne({ where: { email: email } })
            if(user)
                if (compare(forgets, user.forgets)) {
                    return user
                } else return null
        }
        catch(error){
            return null
        }
    }  


    async update(id, nome, email) {
        try{
            await User.update({ nome, email }, { where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }

    async updateForgets(email, forgets) {
        try{
            await User.update({forgets}, { where: { email: email } })
            return true
        }
        catch(error){
            return false
        }
        
    }



    async delete(id) {  //id de req.params.id
        try{
            await User.destroy({ where: { id: id } })
            return true
        }
        catch(error){
            return false
        }
    }

    async getOne(id) {
        try{
            return await User.findByPk(id)
        }
        catch(error){
            return null
        }
    }

async getByMail(email) {
    try{
        if (await User.findOne({ where: {email: email} })) {
            return true
        } else return false
    }
    catch(error){
        return false
    }  
}

    async getAll() {
        try{
            return await User.findAll()
        }
        catch(error){
            return null
        }
    }


}




module.exports = UserDAO