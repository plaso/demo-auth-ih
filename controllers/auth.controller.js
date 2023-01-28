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

module.exports.login = (req, res, next) => {
  res.render('auth/login')
}

module.exports.doLogin = (req, res, next) => {
  const { email, password } = req.body;

  const renderWithErrors = () => {
    res.render(
      'auth/login',
      {
        user: { email },
        errors: { email: 'Email or password are incorrect' }
      }
    )
  }

  if (!email || !password) {
    renderWithErrors()
  }

  // Comprobar si hay un usuario con este email
  User.findOne({ email }) // dklashdlkjashDFJKSAHFIJSDAHKL - 12345678
    .then(user => {
      if (!user) {
        renderWithErrors()
      } else {
        return user.checkPassword(password)
          .then(match => {
            if (!match) {
              renderWithErrors()
            } else {
              req.session.userId = user.id
              res.redirect('/profile')
            }
          })
        // Comprobamos que la contraseña sea correcta
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports.logout = (req, res, next) => {
  req.session.destroy()
  res.redirect('/login')
}