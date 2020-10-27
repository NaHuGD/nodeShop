const rootDir = require('../util/path')
const path = require('path')
const fs = require('fs')
const dirPath = path.join(rootDir, 'data')
const filePath = path.join(dirPath, 'product.json')
// 引入uuid
const { v4: uuidv4 } = require('uuid')

const getProductsFromFile = (callback) => {
  Product.checkFile().then(result => {
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

class Product {
  constructor(title, imgUrl, description, price) {
    this.title = title;
    this.imgUrl = imgUrl;
    this.description = description;
    this.price = price;
  }

  save = (productId) => {
    if (!productId) {
      // 沒有productId參數則新增商品
      this.id = uuidv4()
      getProductsFromFile((products) => {
        products.push(this)

        fs.writeFile(filePath, JSON.stringify(products), (err) => {
          console.log(err)
        })
      })
    } else {
      // 有id則進行修改
      getProductsFromFile((products) => {
        const existingProductIndex = products.findIndex(prod => prod.id === productId)
        const updateProducts = [...products]

        updateProducts[existingProductIndex] = { ...updateProducts[existingProductIndex], ...this }
        fs.writeFile(filePath, JSON.stringify(updateProducts), (err) => {
          console.log(err)
        })
      })
    }
  }

  static checkFile = () => {
    const promise = new Promise((res, rej) => {
      // 確認該目錄是否存在
      fs.exists(dirPath, result => {
        if (!result) {
          // 不存在目錄時創建
          fs.mkdir(dirPath, err => {
            if (!err) {
              // 寫入一個 []
              fs.writeFile(filePath, '[]', err => {
                res(true)
              })
            }
          })
        } else {
          res(true)
        }
      })
    })
    return promise
  }

  static fetchAll = (callback) => {
    getProductsFromFile(callback)
  }

  static findById = (id, cacllBack) => {
    getProductsFromFile(products => {
      // 比對傳遞的id與產品id
      const product = products.find(p => p.id === id)
      cacllBack(product)
    })
  }

  static deleteById = (id) => {
    getProductsFromFile((products) => {
      // id相同的產品=>刪除，不相同的保留
      const updateProducts = products.filter(prod => prod.id !== id)

      fs.writeFile(filePath, JSON.stringify(updateProducts), err => {
        console.log('刪除', err)
      })
    })
  }

}

module.exports = Product