// 引入express模塊
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
// controllers
const errorControllers = require('./controllers/error')

// express-handlebars
const expressHbs = require('express-handlebars')

//引入 自訂模塊
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
// pug 模塊引擎
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views', 'pug'))

// express-handlebars 模塊引擎
app.engine('hbs', expressHbs({extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views', 'handlebars'))

// EJS模塊引擎
app.set('view engine' ,'ejs')
app.set('views', path.join(__dirname, 'views', 'ejs'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(shopRoutes)

app.use('/admin', adminRoutes)

app.use(errorControllers.getError)

app.listen(3001, '127.0.0.1')