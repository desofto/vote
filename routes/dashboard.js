'use strict'

const path = require('path')

const errors = require(path.resolve('lib/errors'))
const auth = require(path.resolve('lib/auth'))
const { Event, Stage, Team } = require(path.resolve('models'))

const router = require('express').Router()
router.use(auth.authenticate)

router.get('/', async (req, res) => {
  try {
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    const event = await Event.findOne({ where: { date: today } })
    if (!event) {
      res.status(204).end()
      return
    }

    const stage = (await event.getStages({ where: { state: 'started' } }))[0]
    const team = (await event.getTeams({ where: { state: 'started' } }))[0]

    if (stage && team) {
      res.status(200).json({
        event: {
          id: event.id,
          title: event.title
        },
        stage: {
          id: stage.id,
          title: stage.title
        },
        team: {
          id: team.id,
          title: team.title
        }
      })
    } else {
      const stages = await event.getStages()
      const teams = await event.getTeams()
      res.status(200).json({
        event: {
          id: event.id,
          title: event.title
        },
        stages: stages.map(stage => ({
          id: stage.id,
          title: stage.title
        })),
        teams: teams.map(team => ({
          id: team.id,
          title: team.title
        }))
      })
    }
  } catch (e) {
    errors.handler(req, res, e)
  }
})

module.exports = router
