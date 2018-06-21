const express = require('express')
const app = express()
const port = 3002
const host = '127.0.0.1'

app.get('/', (req, res, next) => {
  res.send('abc')
  res.end()
  next()
})

app.get('/excel', (req, res, next) => {
  console.info('-------2------')
  res.send('aaaaaaaaaaa')
  res.end()
  next()
})

app.listen(port, host, () => {
  console.info('proxy server started at http://' + host + ':' + host)
})
