const { BOOLEAN } = require('sequelize')
const  Sequelize = require('sequelize')

class Icm extends Sequelize.Model {

    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },

                aliquota: {
                    type: Sequelize.FLOAT.UNSIGNED,
                    defaultValue: 3
                },
                status: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: true
                }
            },
            {
                sequelize,
                modelName: 'icm',
                freezeTableName: true
            }

        )
    }
}

module.exports = Icm