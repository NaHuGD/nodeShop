const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      title: '首頁',
      activeShop: true
    })
  })
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      title: '產品中心',
      activeProductList: true
    })
  })
}

exports.getCart = (req, res, next) => {
  // 查詢購物車
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      // 取出購物車資料，組成新的array
      const cartProducts = []
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id)

        if (cartProductData) {
          cartProducts.push({ ...product, qty: cartProductData.qty })
        }
      }

      return res.render('shop/cart', {
        title: '購物車',
        activeCart: true,
        cartProducts,
        totalPrice: cart.totalPrice,
      })

    })
  })
}

// 刪除購物車
exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId
  Product.findById(productId, product => {
    // 取得點擊產品資料
    Cart.deleteProduct(productId, product.price)
  })
  res.redirect('/cart')
}

exports.postAddToCart = (req, res, next) => {
  const productId = req.body.productId
  // 傳入產品價格
  Product.findById(productId, product => {
    // 將資料帶入購物車
    Cart.addProduct(productId, product.price)
  })

  res.redirect('/cart')
}

exports.getProductDetail = (req, res, next) => {
  const productId = req.params.productId

  Product.findById(productId, (product) => {

    res.render('shop/product-detail', {
      title: '產品詳情',
      product,
      activeProductList: true
    })

  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    title: '訂單管理',
    path: '/',
    activeCheckout: true
  })
}