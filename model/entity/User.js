const  Sequelize = require('sequelize')

class User extends Sequelize.Model {

        static init(sequelize) {
            super.init(
                {
                    id: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },
                    nome: Sequelize.STRING,
                    email:{
                        type:Sequelize.STRING,
                        unique: true
                    } ,
                    senha: Sequelize.STRING,
                    forgets: Sequelize.STRING
                },
                {
                    sequelize,
                    modelName: 'user',
                    freezeTableName: true
                }

            )
        }
}

module.exports = User