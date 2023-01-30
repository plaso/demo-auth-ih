const axios = require('axios')

const http = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: false
})

module.exports = http