const express = require('express')
require('./utils/db.config')

const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  return res.render('index')
})

app.listen(8085, () => {
  console.log('server running at 8085')
})

module.exports = app
