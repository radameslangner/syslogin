const  Sequelize = require('sequelize')

class Imgproduct extends Sequelize.Model {

    static init(sequelize) {
        super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                imgname: Sequelize.STRING,
                path: Sequelize.STRING
                
            },
            {
                sequelize,
                modelName: 'imgproduct',
                freezeTableName: true
            }

        )   
    }
}

module.exports = Imgproduct
