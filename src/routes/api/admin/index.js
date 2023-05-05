const express = require('express')
const router = express.Router()
const statistic = require('./statistic')
const user = require('./user')
const game = require('./game')

router.use('/statistic', statistic)
router.use('/user', user)
router.use('/game', game)

module.exports = router