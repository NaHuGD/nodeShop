const { Sequelize } = require('sequelize')

const sequelize = require('../util/dataBase')
// 對應table資料庫位置
const OrderItem = sequelize.define('orderItem', {
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

module.exports = OrderItem