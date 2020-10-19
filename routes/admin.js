const express = require('express')
const path = require('path')
// 引入
const productControllers = require('../controllers/product')

const router = express.Router()

router.get('/add-product', productControllers.getAddProduct)

router.post('/add-product', productControllers.postAddProduct)

module.exports = router