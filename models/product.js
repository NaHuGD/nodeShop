const { Sequelize } = require('sequelize')

const sequelize = require('../util/dataBase')

const Product = sequelize.define('Product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: { type: Sequelize.DOUBLE, allowNull: false },
  imgUrl: { type: Sequelize.STRING, allowNull: false },
  description: { type: Sequelize.TEXT, allowNull: false },
})

module.exports = Product