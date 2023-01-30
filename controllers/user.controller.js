const Book = require('../models/Book.model')
const axios = require('axios')
const { getCity, getCities } = require('../services/citiesService')
const { getBootcamp } = require('../services/bootcampsService')

module.exports.profile = (req, res, next) => {
  getCity(3)
    .then(res => {
      console.log(res.data)
    })
  getCities()
    .then(res => {
      console.log(res.data)
    })

  getBootcamp(3)
    .then(res => {
      console.log(res.data)
    })
  Book.find({ user: { $ne: req.currentUser.id } })
    .populate('user')
    .then(books => {
      res.render('user/profile', { books })
    })
    // .catch(err => next(err))
    .catch(next)
}