const { BOOLEAN } = require('sequelize')
const  Sequelize = require('sequelize')

class Ncm extends Sequelize.Model {

    static init(sequelize) {
        super.init(
            {
                id: 
                {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                description: Sequelize.STRING,


                ncm: 
                {
                     type: Sequelize.STRING,
                     allowNull: false,
                     
                     validate: 
                     { 
                        len: [8, 8],
                        is: ["^[0-9]{8}$", 'i']
                     }
                },

                status: 
                {
                    type: Sequelize.BOOLEAN,
                    defaultValue: true
                }
            },
            {
                sequelize,
                modelName: 'ncm',
                freezeTableName: true
            }

        )
    }
}

module.exports = Ncm