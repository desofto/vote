'use strict'

const path = require('path')

const { Sequelize, Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      this.belongsTo(models.Event, { foreignKey: 'eventId', as: 'event' })
      this.hasMany(models.Vote, { as: 'votes' })
    }
  }

  // state: 'initial', 'started', 'ended'

  Team.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      validate: {
        isUUID: 4
      }
    },

    title: {
      allowNull: false,
      type: Sequelize.STRING
    },

    order: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0
    },

    eventId: {
      type: DataTypes.UUID
    },

    state: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['initial', 'started', 'finished']]
      },
      defaultValue: 'initial'
    }
  }, {
    sequelize,
    tableName: 'Teams',
    timestamps: true,
    underscored: false
  })

  return Team
}
