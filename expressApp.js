// 引入express模塊
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
// controllers
const errorControllers = require('./controllers/error')
// 引入sequelize
const sequelize = require('./util/dataBase')
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')

// 引入 自訂模塊
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// EJS模塊引擎
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views', 'ejs'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// 保存用戶資料
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user
      // console.log('OBJ', Object.keys(User.prototype))
      next()
    }).catch(err => console.log('存取用戶資料err', err))
})

app.use(shopRoutes)

app.use('/admin', adminRoutes)

app.use(errorControllers.getError)

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)

Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })
// 訂單對應用戶
Order.belongsTo(User)
// User擁有很多訂單
User.hasMany(Order)
Order.belongsToMany(Product, { through: OrderItem })


// 建立sequelize連線
// force 每次重建資料庫資料
sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1)
  })
  .then(user => {
    // 判斷無用戶時創建一個
    if (!user) {
      return User.create({ name: 'Vane', email: '55688@gmail.com' })
    }
    return user
  })
  .then(user => {
    // 用戶有資料時建立連線
    if (user) {
      app.listen(3000, () => {
				console.log('App listening on port 3000!');
      })
    }
  })
  .catch(err => {
    console.log('連線建立錯誤', err)
  })
