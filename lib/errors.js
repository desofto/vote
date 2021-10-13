'use strict'

const Sequelize = require('sequelize')
const logger = require('./logger')
const { TokenExpiredError } = require('jsonwebtoken')
const { ForbiddenError } = require('./abilities')

class NoTokenError extends Error {
  name = 'NoTokenError'
}

module.exports = {
  NoTokenError,

  handler: function(req, res, err) {
    if (err instanceof Sequelize.DatabaseError || err instanceof Sequelize.UniqueConstraintError) {
      logger.error(err.name, err.message)
      res.status(422).json({ title: 'Database Error', class: err.name, message: err.message })
    } else if (err instanceof Sequelize.ValidationError) {
      logger.error(err.name, err.message)
      res.status(422).json({ title: 'Validation Error', class: err.name, message: err.message })
    } else if (err instanceof NoTokenError || err instanceof TokenExpiredError) {
      logger.error(err.name, err.message)
      res.status(401).json({ title: 'Access Denied', class: err.name, message: err.message })
    } else if (err instanceof ForbiddenError) {
      logger.error(err.name, err.message)
      res.status(403).json({ title: 'Access Denied', class: err.name, message: err.message })
    } else {
      logger.error(err.name, err.message)
      res.status(500).json({ title: 'Internal Error', class: err.name, message: err.message })

      if (process.env.NODE_ENV === 'test') {
        console.log(err)
      }
    }
  }
}
