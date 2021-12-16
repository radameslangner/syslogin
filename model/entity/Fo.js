const  Sequelize = require('sequelize')
const Cfop = require('./Cfop')
const Csosn = require('./Csosn')
const Icm = require('./Icm')

class Fo extends Sequelize.Model {

        static init(sequelize) {
            super.init(
                {
                    id: 
                    {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },

                    fiscalOperation: 
                    {
                        type: Sequelize.STRING,
                        unique: true
                    },

                    status: 
                    {
                        type: Sequelize.BOOLEAN,
                        defaultValue: true
                    },

                    cfopId: 
                    {
                        type: Sequelize.INTEGER,
                        references: 
                        {
                          model: Cfop,
                          key: 'id'
                        },
                        unique: 'compositeIndex'
                    },   
                    
                    csosnId: 
                    {
                        type: Sequelize.INTEGER,
                        references: 
                        {
                          model: Csosn, 
                          key: 'id'
                        },
                        unique: 'compositeIndex'
                    },
                                         
                    icmId: 
                    {
                        type: Sequelize.INTEGER,
                        references: 
                        {
                          model: Icm,
                          key: 'id'
                        },
                        unique: 'compositeIndex'

                    }  
                    
                                     
                },
                
                {
                    sequelize,
                    modelName: 'fo',
                    freezeTableName: true
                }

            )

            Fo.relations()
        }

        
        static relations(){
            Cfop.hasMany(Fo, {  onDelete: 'RESTRICT',  onUpdate: 'CASCADE'})    
            Fo.belongsTo(Cfop) 
            
            Csosn.hasMany(Fo, {  onDelete: 'RESTRICT',  onUpdate: 'CASCADE'})
            Fo.belongsTo(Csosn)

            Icm.hasMany(Fo, {  onDelete: 'RESTRICT',  onUpdate: 'CASCADE'})
            Fo.belongsTo(Icm)
            
        }
        
}

module.exports = Fo