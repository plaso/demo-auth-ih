const User = require('../models/User.model')
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');

const MAX_AGE = 7;

module.exports.sessionConfig = expressSession({
  secret: 'super-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 3600 * 1000 * MAX_AGE // maxAge: 2023-05-02
  },
  store: new MongoStore({
    mongoUrl: 'mongodb://127.0.0.1:27017/demo-auth-ih',
    // ttl: 24 * 3600 * MAX_AGE
  })
})

module.exports.loggedUser = (req, res, next) => {
  const userId = req.session.userId;

  if (userId) {
    User.findById(userId)
      // .populate('books')
      .populate(
        {
          path: 'books',
          populate: {
            path: 'user'
          }
        }
      )
      .then(user => {
        if (user) {
          req.currentUser = user
          res.locals.currentUser = user // res.locals es el objeto donde se manda informacion a todas las vistas (hbs)
          next()
        } else {
          next()
        }
      })
      .catch(err => next(err));
  } else {
    next()
  }
}

