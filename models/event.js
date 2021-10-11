'use strict'

const path = require('path')

const { Model } = require('sequelize')
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require(path.resolve('lib/sequelize'))

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      this.hasMany(models.Stage, { as: 'stages' })
    }
  }

  Event.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      validate: {
        isUUID: 4
      }
    },

    date: {
      type: Sequelize.DATE
    },

    title: {
      type: Sequelize.STRING
    }
  }, {
    sequelize,
    tableName: 'Events',
    timestamps: true,
    underscored: false
  })

  return Event
}
