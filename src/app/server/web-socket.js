const app = require('express')()
const fs = require('fs')
const path = require('path')
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const router = require('../router')

const host = '127.0.0.1'
const port = 3000
const messages = []

let chat

server.listen(port, host, () => {
  console.info('socket server run at http://' + host + ':' + port)
})

router.assign(app, '../../templates/socket.html')

io.sockets.on('connection', (socket) => {

  socket.broadcast.emit('user-connected-broadcast', {msg: 'to all users'})

  socket.emit('news', { msg: 'Hello PP' })

  socket.on('client-customize-msg', (data) => {
    console.log(data)
  })

  socket.on('message', (msg) => {
    console.log('[WEBSOCKET Received] ', msg)
    messages.push(msg)
    socket.broadcast.emit('message', msg)
  })
// send messages to new clients
// messages.forEach((msg) => {
//   socket.send(msg)
// })
})

chat = io.of('/chat').on('connection', (socket) => {
  // socket.emit('chat-all-message', {
  //   that: 'only',
  //   '/chat': 'will get',
  //   msg: 'chat PP'
  // })

  chat.emit('chat-message', {
    everyone: 'in',
    '/chat': 'will get',
    msg: 'chat PP'
  })
})
