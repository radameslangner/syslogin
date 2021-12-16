const  Sequelize = require('sequelize')

class Unity extends Sequelize.Model {

        static init(sequelize) {
            super.init(
                {
                    id: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },

                    unity: {
                        type: Sequelize.STRING,
                        unique: true
                    },
                    description: { 
                        type: Sequelize.STRING,
                        unique: true
                    },

                    status: {
                        type: Sequelize.BOOLEAN,
                        defaultValue: true
                    }
                },
                {
                    sequelize,
                    modelName: 'unity',
                    freezeTableName: true
                }

            )
        }
}

module.exports = Unity