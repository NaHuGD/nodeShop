const rootDir = require('../util/path')
const path = require('path')
const fs = require('fs')
const cartPath = path.join(rootDir, 'data')
const filePath = path.join(cartPath, 'cart.json')

const getCartFromFile = (callback) => {
  Cart.checkFile().then(result => {
    if (result) {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          callback([])
        } else {
          // 讀取正確
          callback(JSON.parse(data))
        }
      })
    }
  })
}

class Cart {
  static checkFile = () => {
    const promise = new Promise((res, rej) => {
      // 確認cart目錄存在
      fs.exists(cartPath, result => {
        if (!result) {
          // 不存在目錄時創建
          fs.mkdir(cartPath, err => {
            if (!err) {
              // 初始化數值
              fs.writeFile(filePath, '{"products":[],"totalPrice": 0}', err => {
                res(true)
              })
            }
          })
        } else {
          // 確認cart.json文件存在
          fs.exists(filePath, check => {
            if (!check) {
              fs.writeFile(filePath, '{"products":[],"totalPrice": 0}', err => {
                res(true)
              })
            } else {
              res(true)
            }
          })
        }
      })
    })
    return promise
  }

  static addProduct(id, productPrice) {
    getCartFromFile(cart => {
      // 先進行查詢匹配
      const existsProductIndex = cart.products.findIndex((prod) => prod.id === id)
      let updateProduct = false

      if (existsProductIndex === -1) {
        updateProduct = { id: id, qty: 1 }
        cart.products.push(updateProduct)
      } else {
        let existsProduct = cart.products[existsProductIndex]
        updateProduct = { ...existsProduct }
        updateProduct.qty = existsProduct.qty + 1
        cart.products[existsProductIndex] = updateProduct
      }
      // +productPrice = string => number
      cart.totalPrice = cart.totalPrice + +productPrice


      fs.writeFile(filePath, JSON.stringify(cart), (err) => {
        console.log(err)
      })
    })
  }

  // 取得購物車內容
  static getCart(callback) {
    getCartFromFile(cart => {
      callback(cart)
    })
  }

  // 刪除購物車
  static deleteProduct (id, productPrice) {
    getCartFromFile(cart => {
      const updateCart = {...cart}
      const product = updateCart.products.find(prod => prod.id !== id)
      if (!product) {
        // 不等於點擊的產品
        return
      }
      // const productQty = product.qty
      // 過濾點選擊品
      updateCart.products = updateCart.products.filter(prod => prod.id !== id)
      // 統計price
      updateCart.totalPrice = updateCart.totalPrice - productPrice 
      // 更新 cart.json檔案
      fs.writeFile(filePath, JSON.stringify(updateCart), err => {
        console.log(err)
      })
    })
  }

}

module.exports = Cart