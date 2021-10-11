'use strict'

const path = require('path')

const { Sequelize } = require('sequelize')

const config = require(path.resolve('config'))
const logger = require('./logger')

module.exports = new Sequelize(
  config.db.database, config.db.username, config.db.password, Object.assign({}, config.db, {
    logging: msg => logger.debug(msg),
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })
)
