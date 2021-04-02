const Sequelize = require('sequelize')
const User = require('../entity/User')


const connection = new Sequelize('radames', 'postgres', 'pgsql', {
    host: '100.127.10.122',
    dialect: 'postgres',
    timezone: '-03:00'
})

User.init(connection)

connection.sync({force: false})

module.exports = connection