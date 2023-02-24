const http = require('./baseService.js');

module.exports.getCities = () => http.get('/cities')
module.exports.getCity = (id) => http.get(`/cities/${id}`)
