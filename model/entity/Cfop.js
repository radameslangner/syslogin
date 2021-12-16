const  Sequelize = require('sequelize')

class Cfop extends Sequelize.Model {

        static init(sequelize) {
            super.init(
                {
                    id: 
                    {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },

                    cfop: 
                    {
                        type: Sequelize.STRING,
                        unique: true
                    }, 
                    
                    description: 
                    {
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
                    modelName: 'cfop',
                    freezeTableName: true
                }

            )

            
        }

}

module.exports = Cfop

