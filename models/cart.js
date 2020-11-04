const { Sequelize } = require('sequelize')

const sequelize = require('../util/dataBase')
// 對應table資料庫位置
const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER, 
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  }
})

module.exports = Cart