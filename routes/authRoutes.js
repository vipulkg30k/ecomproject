const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/service/userService')
const { registerSchema } = require('../modules/users/validations/authValidation')
const { joierrorFormatter, mongooseErrorFormatter } = require('../utils/validationFormatter')
const passport = require('passport')
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
const flasherMiddleware = require('../middlewares/flasherMiddleware')

/**
 * Shows page for user registration
 */
router.get('/register', guestMiddleware, flasherMiddleware, (req, res) => {
  return res.render('register')
})

/**
 * Handles user registration
 */
router.post('/register', guestMiddleware, async (req, res) => {
  try {
    const validationResult = registerSchema.validate(req.body, {
      abortEarly: false
    })
    if (validationResult.error) {
      req.session.flashData = {
        message: {
          type: 'error',
          body: 'Validation Error'
        },
        errors: joierrorFormatter(validationResult.error),
        formData: req.body
      }
      return res.redirect('/register')
    }
    await addUser(req.body)
    req.session.flashData = {
      message: {
        type: 'success',
        body: 'Registration success'
      }
    }
    return res.redirect('/register')
  } catch (e) {
    console.error(e)
    req.session.flashData = {
      message: {
        type: 'error',
        body: 'Validation Error'
      },
      errors: mongooseErrorFormatter(e),
      formData: req.body
    }
    return res.redirect('/register')
  }
})

/**
 * Shows page for user login
 */
router.get('/login', guestMiddleware, flasherMiddleware, (req, res) => {
  return res.render('/login')
})

/**
 * Logs in a user
 */
router.post('/login', guestMiddleware, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log('Err:', err)
      req.session.flashData = {
        message: {
          type: 'error',
          body: 'Login Failed'
        }
      }
      return res.redirect('/login')
    }

    if (!user) {
      req.session.flashData = {
        message: {
          type: 'error',
          body: info.error
        }
      }
      return res.redirect('/login')
    }

    req.logIn(user, (err) => {
      if (err) {
        console.log('Err:', err)
        req.session.flashData = {
          message: {
            type: 'error',
            body: 'Login Failed'
          }
        }
      }
      return res.redirect('/homepage')
    })
  })(req, res, next)
})

/**
 * Logs out a user
 */
router.get('/logout', authMiddleware, (req, res) => {
  req.logOut()
  req.session.flashData = {
    message: {
      type: 'success',
      body: 'Login Success'
    }
  }
  return res.redirect('/')
})

module.exports = router
