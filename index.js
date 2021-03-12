const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  return res.render('index')
})

app.listen(8085, () => {
  console.log('server running at 8085')
})

module.exports = app
