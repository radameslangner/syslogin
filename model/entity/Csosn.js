const  Sequelize = require('sequelize')

class Csosn extends Sequelize.Model {

        static init(sequelize) {
            super.init(
                {
                    id: 
                    {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },

                    csosn: 
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
                    modelName: 'csosn',
                    freezeTableName: true
                }

            )
        }
}

module.exports = Csosn