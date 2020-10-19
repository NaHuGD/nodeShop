exports.getError = (req, res, next) => {
  // res.status(404).sendFile(path.join(rootDir, 'views', 'err-page.html'))
  res.render('err-page', { title: '頁面無法顯示' })
}