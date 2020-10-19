
const fs = require('fs')

// 路由操作
const rqListener = (req, res) => {
  // req監聽瀏覽器端是否發出request請求
  // res服務端返回操作
  const url = req.url
  const method = req.method
  res.setHeader("Content-Type", "text/html;charset=utf-8")

  if (url === '/') {
    res.write(`<html>
    <body>
      <h1>首頁</h1>
      <a href="/from">輸入表單</a>
    </body>
    </html>`)
  } else if (url === '/from') {
    res.write(`<html>
    <body>
      <h1>輸入表單</h1>
      <a href="/">首頁</a>
      <form method="post" action="/getMsg">
        <input type="text" name="message" />
        <input type="submit" value="提交" />
      </form>
    </body>
    </html>`)
  }

  if (url === '/getMsg' && method === "POST") {
    const body = []
    req.on('data', chunk => {
      body.push(chunk)
    })
    return req.on('end', () => {
      const parseBody = Buffer.concat(body)
      console.log(parseBody.toString())
      const message = parseBody.toString()
      message.split('=')[0]

      fs.writeFile('message.txt', message, err => {
        res.writeHead(302, {location: '/'}) 
        res.end()
      })
    })
  }

  return res.end()
}

const text = '測試文字56'

// 導出路由
module.exports = {rqListener, text}