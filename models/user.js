const { Sequelize } = require('sequelize')

const sequelize = require('../util/dataBase')
// 對應table資料庫位置
const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER, 
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING
})

module.exports = User