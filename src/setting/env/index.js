const env = process.env.NODE_ENV || 'development'
const envConfig = require(`./${env}`)

module.exports = envConfig
