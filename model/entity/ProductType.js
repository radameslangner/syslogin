const  Sequelize = require('sequelize')

class ProductType extends Sequelize.Model {

        static init(sequelize) {
            super.init(
                {
                    id: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },

                    productType: {
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
                    modelName: 'productType',
                    freezeTableName: true
                }

            )
        }
}

module.exports = ProductType