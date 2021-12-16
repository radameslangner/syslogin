const  Sequelize = require('sequelize')
const ProductType = require('./ProductType')
const Unity = require('./Unity')
const Size = require('./Size')
const Ncm = require('./Ncm')
const FiscalOperation = require('./FiscalOperation')

class Product extends Sequelize.Model {

        static init(sequelize) {
            super.init(
                {
                    id: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },

                    description: {
                        type: Sequelize.STRING,
                        unique: true
                    },

                    reference: {
                        type: Sequelize.STRING
                    },                      

                    cost: {
                        type: Sequelize.FLOAT
                    },                    
                    
                    price: {
                        type: Sequelize.FLOAT
                    },
                    
                    status: {
                        type: Sequelize.BOOLEAN,
                        defaultValue: true
                    }
                },
                {
                    sequelize,
                    modelName: 'product',
                    freezeTableName: true
                }

            )

            Product.relations()
        }

        static relations(){
            
            ProductType.hasOne(Product)
            Product.belongsTo(ProductType)

            Unity.hasOne(Product)
            Product.belongsTo(Unity)

            Size.hasOne(Product)
            Product.belongsTo(Size)

            Ncm.hasOne(Product)
            Product.belongsTo(Ncm)

            FiscalOperation.hasOne(Product)
            Product.belongsTo(FiscalOperation)            
        }
}

module.exports = Product