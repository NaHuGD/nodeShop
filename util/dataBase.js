const mysql = require('mysql2')

// 連結mySql資料庫
// host主機地址
// user用戶名稱
// database連結數據庫
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Bb27955439',
  database: 'nodejs-shop'
})

module.exports = pool.promise()