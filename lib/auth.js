const jwt = require('jsonwebtoken')
const path = require('path')
const errors = require('./errors')
const config = require(path.resolve('config'))
const { User } = require(path.resolve('models'))

module.exports = {
  create(data) {
    return jwt.sign(
      data,
      config.jwtSecret,
      { expiresIn: '1h' }
    )
  },

  async authenticate(req, res, next) {
    if (req.method === 'OPTIONS' ) {
      return next()
    }

    try {
      const token = req.headers.authorization && req.headers.authorization.split(' ')[1]

      if (!token) throw new errors.NoTokenError('No token')

      req.currentUser = await User.find(jwt.verify(token, config.jwtSecret).id)

      next()
    } catch (e) {
      errors.handler(req, res, e)
    }
  }
}
