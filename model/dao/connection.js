const Sequelize = require('sequelize')
const User = require('../entity/User')

const Cfop = require('../entity/Cfop')
const Csosn = require('../entity/Csosn')
const Icm = require('../entity/Icm')
const FiscalOperation = require('../entity/FiscalOperation')

const Fo = require('../entity/Fo')


const Ncm = require('../entity/Ncm')
const Unity = require('../entity/Unity')
const Size = require('../entity/Size')
const ProductType = require('../entity/ProductType')
const Imgproduct = require('../entity/Imgproduct')
const Product = require('../entity/Product')

const connection = new Sequelize('tccteste', 'root', 'rada', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
})

User.init(connection)

Cfop.init(connection)
Csosn.init(connection)
Icm.init(connection)
FiscalOperation.init(connection)

Fo.init(connection)



Ncm.init(connection)
Unity.init(connection)
Size.init(connection)
ProductType.init(connection)
Imgproduct.init(connection)
Product.init(connection)


connection.sync({force: false})

module.exports = connection