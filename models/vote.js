'use strict'

const path = require('path')

const { Sequelize, Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    static associate(models) {
      this.belongsTo(models.Stage, { foreignKey: 'stageId', as: 'stage' })
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
    }
  }

  Vote.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      validate: {
        isUUID: 4
      }
    },

    stageId: {
      type: DataTypes.UUID
    },

    userId: {
      type: DataTypes.UUID
    },

    count: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'Votes',
    timestamps: true,
    underscored: false
  })

  return Vote
}
