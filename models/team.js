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
    underscored: false,

    hooks: {
      async afterSave(team, _options) {
        if (team.state !== 'started') return

        const event = await team.getEvent()
        const teams = await event.getTeams()
        await teams.forEach(async t => {
          if (t.id === team.id) return
          if (t.state !== 'started') return
          return t.update({ state: 'finished'})
        })
      }
    }
  })

  return Team
}
