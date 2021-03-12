const express = require('express')
const app = express()

app.get('/', (req, res) => {
  return res.send('hello world')
})

app.listen(8085, () => {
  console.log('server running at 8085')
})

module.exports = app
