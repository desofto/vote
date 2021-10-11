'use strict'

const path = require('path')

const { Model, QueryTypes } = require('sequelize')
const sequelize = require(path.resolve('lib/sequelize'))

class BaseModel extends Model {
  static find(id) {
    return this.findByPk(id)
  }

  static where(where, bind = {}) {
    return sequelize.query(
      `SELECT * FROM ${this.tableName} WHERE ${where}`, {
        bind,
        type: QueryTypes.SELECT,
        model: this,
        mapToModel: true
      }
    )
  }
}

module.exports = BaseModel
