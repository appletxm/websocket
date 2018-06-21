const express = require('express')
const router = require('../router')
const app = express()
const server = {}

router.assign(app, '../../templates/index.html')

server.start = function start (host, port) {
  if (app) {
    app.listen(port, host, () => {
      console.info('client started at http://' + host + ':' + port)
    })
  }
}

module.exports = server
