const  Sequelize = require('sequelize')

class Size extends Sequelize.Model {

        static init(sequelize) {
            super.init(
                {
                    id: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },

                    size: {
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
                    modelName: 'size',
                    freezeTableName: true
                }

            )
        }
}

module.exports = Size