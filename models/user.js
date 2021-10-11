'use strict'

const path = require('path')

const BaseModel = require('./base')
class User extends BaseModel {
}

const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require(path.resolve('lib/sequelize'))
const shortid = require('shortid')

User.init({
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    validate: {
      isUUID: 4
    }
  },

  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  accessCode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  isAdmin: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  tableName: 'Users',
  timestamps: true,
  underscored: false,

  hooks: {
    beforeValidate(obj, _options) {
      if (!obj.accessCode) obj.accessCode = shortid.generate()
    }
  }
})

module.exports = User
