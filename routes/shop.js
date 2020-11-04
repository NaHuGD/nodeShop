const express = require('express')
const path = require('path')
const shopController = require('../controllers/shop')
const rootDir = require('../util/path')

const router = express.Router()

router.get('/', shopController.getIndex)

router.get('/product-list', shopController.getProducts)
// :參數 => 佔位設定
router.get('/product-detail/:productId', shopController.getProductDetail)
// 取得購物車資料
router.get('/cart', shopController.getCart)
// 添加購物車
router.post('/add-to-cart', shopController.postAddToCart)
// 生成訂單
router.post('/create-order', shopController.postCreateOrder)

// 刪除購物車
router.post('/cart-delete-product', shopController.postCartDeleteProduct)

router.get('/checkout', shopController.getCheckout)

module.exports = router