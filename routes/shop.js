const express = require('express')
const path = require('path')
const productController = require('../controllers/product')

const rootDir = require('../util/path')


const router = express.Router()

router.get('/', productController.getProducts)

module.exports = router