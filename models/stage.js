'use strict'

const path = require('path')

const { Sequelize, Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Stage extends Model {
    static associate(models) {
      this.belongsTo(models.Event, { foreignKey: 'eventId', as: 'event' })
      this.hasMany(models.Vote, { as: 'votes' })
    }
  }

  // state: 'initial', 'started', 'ended'

  Stage.init({
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
    tableName: 'Stages',
    timestamps: true,
    underscored: false,

    hooks: {
      async afterSave(stage, _options) {
        if (stage.state !== 'started') return

        const event = await stage.getEvent()
        const stages = await event.getStages()
        await stages.forEach(async s => {
          if (s.id === stage.id) return
          if (s.state !== 'started') return
          return s.update({ state: 'finished'})
        })
      }
    }
  })

  return Stage
}
