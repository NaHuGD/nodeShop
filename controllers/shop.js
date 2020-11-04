const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        title: '首頁',
        activeShop: true
      })
    }).catch(err => console.log('取得首頁錯誤', err))
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        title: '產品中心',
        activeProductList: true
      })
    })
}

exports.getCart = (req, res, next) => {
  // 獲取購物車內容
  req.user.getCart().then(cart => {
    cart.getProducts().then(products => {
      res.render('shop/cart', {
        title: '購物車',
        activeCart: true,
        cartProducts: products,
        // totalPrice: cart.totalPrice,
      })
    })
  })
}

// 刪除購物車
exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId
  req.user.getCart().then(cart => {
    // 比對產品內容
    return cart.getProducts({ where: { id: productId } })
      .then(products => {
        const product = products[0]
        return product.cartItem.destroy()
      })
      .then(result => {
        res.redirect('/cart')
      })
  })
    .catch(err => console.log('購物車刪除錯誤'))
}

exports.postAddToCart = (req, res, next) => {
  const productId = req.body.productId

  let newQuantity = 1
  let fetchedCart
  req.user
    .getCart()
    .then(cart => {
      if (!cart) {
        // 沒有購物車時默認創建
        req.user.createCart().then(cart => {
          fetchedCart = cart
          return cart.getProducts({ where: { id: productId } })
        })
        return
      } else {
        // 有購物車則直接返回數據
        fetchedCart = cart
        return cart.getProducts({ where: { id: productId } })
      }
    })
    .then(products => {
      if (products.length === 0) {
        return Product.findByPk(productId);
      } else {
        // 長度不等於0時，購物車數量需累加
        let product = products[0]
        newQuantity = product.cartItem.quantity + 1
        return product
      }
    })
    .then(product => {
      // 取得當前產品訊息
      return fetchedCart.addProduct(product, { through: { quantity: newQuantity } })
    })
    .then(() => {
      res.redirect('/cart')
    })
    .catch(err => console.log('加入購物車錯誤', err))
}

exports.getProductDetail = (req, res, next) => {
  const productId = req.params.productId

  Product.findByPk(productId)
    .then((products) => {
      res.render('shop/product-detail', {
        title: '產品詳情',
        product: products,
        activeProductList: true
      })
    })
    .catch(err => console.log('產品詳情錯誤', err))
}

// 生成訂單
exports.postCreateOrder = (req, res, next) => {
  let fetchedCart
  req.user
    .getCart()
    .then(cart => {
      // 返回購物車資料
      fetchedCart = cart
      return cart.getProducts()
    })
    .then(products => {
      // 創建訂單
      return req.user.createOrder().then(order => {
        order.addProducts(
          products.map(product => {
            product.orderItem = { quantity: product.cartItem.quantity }
            return product
          })
        )
      })
    })
    .then(result => {
      return fetchedCart.setProducts(null)
    })
    .then(result => {
      res.redirect('/checkout')
    })
    .catch(err => console.log('生成訂單錯誤'))
}

exports.getCheckout = (req, res, next) => {
  // include 獲得對應產品內容
  // req.user.getOrders({ include: ['products'] }).then(orders => {
  req.user.getOrders().then(orders => {
    res.render('shop/checkout', {
      title: '訂單管理',
      path: '/',
      orders,
      activeCheckout: true
    })
  })
}