const db = require('../util/dataBase')

class Product {
  constructor(title, imgUrl, description, price) {
    this.title = title;
    this.imgUrl = imgUrl;
    this.description = description;
    this.price = price;
  }

  save = () => {
    const title = this.title;
    const imgUrl =this.imgUrl;
    const description = this.description;
    const price = this.price;
    // mysql新增產品
    // return db.execute(`INSERT INTO products (title, imgUrl, description, price) VALUES (${title}, ${imgUrl}, ${description}, ${price})`)
    return db.execute(`INSERT INTO products (title, imgUrl, description, price) VALUES (?, ?, ?, ?)`, [
      title,
      imgUrl,
      description,
      price
    ])
  }

  static fetchAll = () => {
    // 取得資料庫資料
    return db.execute('SELECT * FROM `nodejs-shop`.products').then(result => {
      return result[0]
    })
  }

  static findById = (id) => {
    // 查詢mysql符合關鍵字
    return db.execute('SELECT * FROM products WHERE id = ?', [id])
  }

  static deleteById = (id) => {
    console.log(id)
    return db.execute('DELETE FROM products WHERE id = ?', [id])
  }

}

module.exports = Product