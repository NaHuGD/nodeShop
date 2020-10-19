// const products = []
const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
  res.render('add-product', {
    title: '添加商品',
    path: '/admin/add-product',
    activeAdd: true
  })
}

exports.postAddProduct = (req, res, next) => {
  // products.push('title', { title: req.body.title })
  const product = new Product(req.body.title)
  product.save()
  res.redirect('/')
}

exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll(products => {
    res.render('shop', {
      prods: products,
      title: '我的產品',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true
    })
  })
  return products
}