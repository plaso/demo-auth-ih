const Book = require('../models/Book.model')

module.exports.profile = (req, res, next) => {
  console.log('process.env.GOOGLE_CLIENT_ID', process.env.GOOGLE_CLIENT_ID)
  Book.find({ user: { $ne: req.user.id } })
    .populate('user')
    .then(books => {
      res.render('user/profile', { books })
    })
    // .catch(err => next(err))
    .catch(next)
}