const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
require('./utils/db.config')

const authRoutes = require('./routes/authRoutes')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

// app.set('trust proxy', 1)
app.use(session({
  secret: '028951b24e5dc360e65db1711698187102d8becb',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use('/', authRoutes)

app.get('/', (req, res) => {
  req.session.views = (req.session.views || 0) + 1
  console.log(`You have visited ${req.session.views} times`)
  return res.render('index')
})

app.listen(8085, () => {
  console.log('server running at 8085')
})

module.exports = app
