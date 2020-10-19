const path = require('path')

console.log('UTIL PATH', path.dirname(process.mainModule.filename))

module.exports = path.dirname(process.mainModule.filename)