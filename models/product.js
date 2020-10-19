const rootDir = require('../util/path')
const path = require('path')
const fs = require('fs')
const dirPath = path.join(rootDir, 'data')
const filePath = path.join(dirPath, 'product.json')

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
  constructor(t) {
    this.title = t
  }

  save() {
    // 確認是否有文件
    // this.constructor.checkFile().then(result => {
    //   if (result) {
    //     let products = []
    //     fs.readFile(filePath, (err, data) => {
    //       if (err) {
    //         products = JSON.parse(data)
    //       }
    //     })
    //     products.push(this)

    //     fs.writeFile(filePath, JSON.stringify(products), (err) => {
    //       console.log(err)
    //     })
    //   }
    // })
    getProductsFromFile(products => {
      products.push(this)

      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.log(err)
      })
    })
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

  static fetchAll(callback) {
    getProductsFromFile(callback)
  }

}

module.exports = Product