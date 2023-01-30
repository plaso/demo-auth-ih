const http = require('./baseService.js');

module.exports.getBootcamps = () => http.get('/bootcamps')
module.exports.getBootcamp = (id) => http.get(`/bootcamps/${id}`)