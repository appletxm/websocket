const express = require('express')
const nodeExcel = require('excel-export')
const app = express()
const excel = require('../excel')

const port = 3001
const host = '127.0.0.1'

app.get('/', (req, res, next) => {
  console.info('-------server /------')
  res.send('abc')
  res.end()
})

app.get('/excel', (req, res) => {
  console.info('-------server /excel------')
  let excelFile = excel.getExcelFile()
  res.setHeader('Content-Type', 'application/octet-stream;charset=UTF-8')
  res.setHeader('Content-Disposition', 'attachment; filename=' + new Date().toLocaleString() + '.xlsx')
  res.statusCode = 200
  res.end(excelFile, 'binary')
})

app.listen(port, host, () => {
  console.log('server start at http://' + host + ':' + port)
})
