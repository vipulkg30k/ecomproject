const express = require('express')
const bodyParser = require('body-parser')
require('./utils/db.config')

const authRoutes = require('./routes/authRoutes')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.use('/', authRoutes)

app.get('/', (req, res) => {
  return res.render('index')
})

app.listen(8085, () => {
  console.log('server running at 8085')
})

module.exports = app
