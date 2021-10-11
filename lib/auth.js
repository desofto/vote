const jwt = require('jsonwebtoken')
const path = require('path')
const errors = require('./errors')
const config = require(path.resolve('config'))

module.exports = {
  create(data) {
    return jwt.sign(
      data,
      config.jwtSecret,
      { expiresIn: '1h' }
    )
  },

  check(req, res, next) {
    if (req.method === 'OPTIONS' ) {
      return next()
    }

    try {
      const token = req.headers.authorization && req.headers.authorization.split(' ')[1]

      if (!token) throw new errors.NoTokenError('No token')

      req.user = jwt.verify(token, config.jwtSecret)

      next()
    } catch (e) {
      errors.handler(req, res, e)
    }
  }
}
