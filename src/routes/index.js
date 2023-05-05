const express = require('express')
const router = express.Router()
const api = require('./api')
const middleware = require('../middleware')

router.use('/api', middleware.base, api)

module.exports = router