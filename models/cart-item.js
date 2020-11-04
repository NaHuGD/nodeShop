const { Sequelize } = require('sequelize')

const sequelize = require('../util/dataBase')
// 對應table資料庫位置
const CartItem = sequelize.define('cartItem', {
  id: {
    type: Sequelize.INTEGER, 
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
  }
})

module.exports = CartItem