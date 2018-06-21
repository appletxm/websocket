const server = require('http').createServer(handler)
const io = require('socket.io').listen(server)
const fs = require('fs')
const host = '127.0.0.1'
const port = 3000

function handler (req, res) {
  // fs.readFile(__dirname + '/index.html',
  //   function (err, data) {
  //     if (err) {
  //       res.writeHead(500)
  //       return res.end('Error loading index.html')
  //     }

  //     res.writeHead(200)
  //     res.end(data)
  //   })
}

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' })
  socket.on('my other event', function (data) {
    console.log(data)
  })
})

server.listen(port, host, () => {
  console.info('socket server run at http://' + host + ':' + port)
})
