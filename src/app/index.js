const server = require('./server/server-client')
const port = 9000
const host = '127.0.0.1'
const app = {}

app.bootstrap = function () {
  server.start(host, port)
}

module.exports = app
