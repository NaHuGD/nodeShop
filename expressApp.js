// 引入express模塊
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
// controllers
const errorControllers = require('./controllers/error')
// 引入mysql db
const db = require('./util/database')

// express-handlebars
const expressHbs = require('express-handlebars')

// 引入 自訂模塊
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')

// 取得mysql連結資料
// db.getConnection().then(connect => {
//   // SQL語法 => 取得資料
//   const res = connect.query('SELECT * FROM products')
//   connect.release()
//   return res
// }).then(result => {
//   console.log(result)
// })
db.execute('SELECT * FROM `nodejs-shop`.products')
.then((result) => {
  console.log('成功', result)
  return result
}).catch((err) => {
  console.log('錯誤', err)
})

// EJS模塊引擎
app.set('view engine' ,'ejs')
app.set('views', path.join(__dirname, 'views', 'ejs'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(shopRoutes)

app.use('/admin', adminRoutes)

app.use(errorControllers.getError)

app.listen(3000)