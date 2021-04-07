require('dotenv').config()
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const logger = require('morgan')
require('./utils/db.config')
const MongoStore = require('connect-mongo')(session)
const mongoDbConnection = require('./utils/db.config')
const passport = require('passport')
require('./utils/authStrategies/localStrategies')
const authMiddleware = require('./middlewares/authMiddleware')

const authRoutes = require('./routes/authRoutes')
const app = express()
const config = require('./utils/config')

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'pug')
// app.set('trust proxy', 1)
app.use(
  session({
    secret: '788a154e2a8d07c4cafdee4a7d6dff2d90ab2586',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({ mongooseConnection: mongoDbConnection })
  })
)
app.use(express.static('public'))
app.use(logger('dev'))
app.use(passport.initialize())
app.use(passport.session())
// { message: {}, formData: {}, errors: {} }

/**
 * Global middleware to make logged in user available to the views
 */

app.use((req, res, next) => {
  res.locals.user = req.isAuthenticated() ? req.user : null
  return next()
})

app.locals.message = {} // used for displaying alerts
app.locals.formData = {} // for prefilling data on form validation
app.locals.errors = {} // form validation errors

app.use('/', authRoutes)

app.get('/', authMiddleware, (req, res) => {
  console.log('User:', req.user)
  return res.render('index')
})

app.get('/homepage', authMiddleware, (req, res) => {
  res.render('dashboard')
})

app.use((req, res, next) => {
  res.status(404).render('404')
})

app.listen(config.port, () => {
  console.log(`Server running at port ${config.port}`)
})

module.exports = app
