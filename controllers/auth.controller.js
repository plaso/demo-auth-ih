const createError = require('http-errors');
const { default: mongoose } = require('mongoose');
const User = require('../models/User.model');

module.exports.signup = (req, res, next) => {
  res.render('auth/signup');
}

module.exports.doSignup = (req, res, next) => {
  const renderWithErrors = (errors) => {
    res.render('auth/signup', {
      user: {
        email: req.body.email,
        name: req.body.name
      },
      errors
    })
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        // lo creo
        return User.create(req.body)
          .then(user => {
            res.redirect('/')
          })
      } else {
        renderWithErrors({ email: 'Email already in use' })
      }
    }) // o un usuario || null
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        renderWithErrors(err.errors)
      } else {
        next(err)
      }
    })
}