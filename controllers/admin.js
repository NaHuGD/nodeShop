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
  // 判斷尋找符合的產品
  req.user.getProducts({ where: { id: productId } }).then(products => {
    const product = products[0]
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

  req.user
    .createProduct({ title, imgUrl, description, price })
    .then(result => {
      res.redirect('/admin/products')
    })
    .catch(err => console.log('新增產品錯誤', err))
}

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId
  const title = req.body.title
  const imgUrl = req.body.imgUrl
  const description = req.body.description
  const price = req.body.price

  req.user.setProducts([1, 2]).then(user => {
    // console.log(user)
  })

  Product.update({ title, imgUrl, description, price }, { where: { id: productId } })
    .then(([num]) => {
      res.redirect('/admin/products')
    })
    .catch(err => console.log('編輯錯誤', err))
}

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId

  Product.destroy({ where: { id: productId } })
    .then(result => {
      res.redirect('/admin/products')
    })
    .catch(err => console.log('刪除資料異常', err))
}

exports.getProducts = (req, res, next) => {
  req.user.getProducts().then(products => {
    res.render('admin/products', {
      prods: products,
      title: '產品管理',
      activeProductManage: true
    })
  })
} 
