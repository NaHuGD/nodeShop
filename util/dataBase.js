const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodejs-shop', 'root', 'Bb27955439', { 
  dialect: 'mysql',
  host: 'localhost',
  timezone: '+08:00',
})

module.exports = sequelize