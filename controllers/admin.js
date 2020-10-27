// const products = []
const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  const editMode = req.query.edit

  res.render('admin/edit-product', {
    title: '添加商品',
    activeAddProduct: true,
    editing: editMode,
  })
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit

  // 判斷是否為編輯模式
  if (!editMode) {
    return res.redirect('/')
  }

  const productId = req.params.productId
  // 查詢產品ID是否符合
  Product.findById(productId, product => {
    if (!product) {
      return res.redirect('/')
    }

    res.render('admin/edit-product', {
      title: '修改商品',
      activeProductManage: true,
      editing: editMode,
      product,
    })
  })
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title
  const imgUrl = req.body.imgUrl
  const description = req.body.description
  const price = req.body.price
  const product = new Product(title, imgUrl, description, price)

  product.save()
  res.redirect('/')
}

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId
  const title = req.body.title
  const imgUrl = req.body.imgUrl
  const description = req.body.description
  const price = req.body.price
  
  const product = new Product(title, imgUrl, description, price)
  product.save(productId)
  res.redirect('/')
}

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId

  Product.deleteById(productId)
  res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(products => {
    // console.log('1',[products])
    res.render('admin/products', {
      prods: products,
      title: '產品管理',
      activeProductManage: true
    })
  })
}
