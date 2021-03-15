const express = require('express')
const router = express.Router()
const { addUser } = require('../modules/users/service/userService')
const { registerSchema } = require('../modules/users/validations/authValidation')
const { joierrorFormatter, mongooseErrorFormatter } = require('../utils/validationFormatter')
const passport = require('passport')
const guestMiddleware = require('../middlewares/guestMiddleware')

/**
 * Shows page for user registration
 */
router.get('/register', guestMiddleware, (req, res) => {
  return res.render('register', { message: {}, formData: {}, errors: {} })
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
      return res.render('register', {
        message: {
          type: 'error',
          body: 'Validation Error'
        },
        errors: joierrorFormatter(validationResult.error),
        formData: req.body
      })
    }
    const user = await addUser(req.body)
    return res.render('register', {
      message: {
        type: 'success',
        body: 'Registration success'
      },
      errors: {},
      formData: req.body
    })
  } catch (e) {
    console.error(e)
    return res.status(400).render('register', {
      message: {
        type: 'error',
        body: 'Validation Error'
      },
      errors: mongooseErrorFormatter(e),
      formData: req.body
    })
  }
})

/**
 * Shows page for user login
 */
router.get('/login', guestMiddleware, (req, res) => {
  return res.render('login', { message: {}, formData: {}, errors: {} })
})

/**
 * Logs in a user
 */
router.post('/login', guestMiddleware, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login-failed'
}),
(req, res) => {
  return res.render('login', {
    message: {
      type: 'success',
      body: 'Login Success'
    },
    formData: {},
    errors: {}
  })
})

module.exports = router
