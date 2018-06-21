const fs = require('fs')
const path = require('path')

function getPathFileAndExtName (req) {
  let assetsFileName = req.originalUrl.match(/.+(.[^\\]+\..+)$/)[1]
  let assetsFileExtName = req.originalUrl.match(/.+\.(.+)$/)[1]
  return {assetsFileName, assetsFileExtName}
}

function getContentType (fileExtName) {
  switch (fileExtName) {
    case 'png':
      return 'image/png'
    case 'ico':
      return 'image/x-icon'
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'gif':
      return 'image/gif'
    case 'css':
      return 'text/css'
    case 'js':
      return 'application/x-javascript'
    default:
      return 'text/html;charset=utf-8'
  }
}

function getFile (req, res, absPath) {
  // let assetsFileName = req.originalUrl.match(/.+(.[^\\]+\..+)$/)[1]
  // let assetsFileExtName = req.originalUrl.match(/.+\.(.+)$/)[1]

  let {assetsFileExtName} = getPathFileAndExtName(req)
  let assetsPath = path.resolve(__dirname, (absPath || '../..') + req.originalUrl)
  let binaryFile
  let contentType

  // console.info(__dirname, __filename)

  contentType = getContentType(assetsFileExtName)
  binaryFile = fs.readFileSync(assetsPath)
  res.setHeader('Content-Type', contentType)
  res.end(binaryFile)
}

module.exports = {
  assign(app, homePage) {
    app.use('*', (req, res, next) => {
      // console.info('[REQUEST ' + req.method + ']', req.baseUrl, req.originalUrl, req.params, req.query)
      console.info('[REQUEST ' + req.method + ']', req.baseUrl, req.params, req.query)
      next()
    })

    app.use('/chat', (req, res, next) => {
      let html = fs.readFileSync(path.resolve(__dirname, '../../templates/socket-chat.html'))
      res.setHeader('Content-Type', 'text/html;charset=utf-8')
      res.end(html, 'utf8')
    })

    app.use('/assets/imgs/*', (req, res, next) => {
      getFile(req, res, '../..')
    })

    app.use('/node_modules/*/*.js', (req, res, next) => {
      getFile(req, res, '../../..')
    })

    app.use('/*/*.css', (req, res, next) => {
      getFile(req, res)
    })

    app.get('/', (req, res, next) => {
      let html = fs.readFileSync(path.resolve(__dirname, homePage))
      res.setHeader('Content-Type', 'text/html;charset=utf-8')
      res.end(html, 'utf8')
    })
  }
}
