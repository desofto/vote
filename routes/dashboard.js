'use strict'

const path = require('path')

const errors = require(path.resolve('lib/errors'))
const auth = require(path.resolve('lib/auth'))
const { Event, Stage, Team, Vote } = require(path.resolve('models'))

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
          title: stage.title,
          votes: await Vote.sum('count', { where: { stageId: stage.id } }) || 0
        },
        team: {
          id: team.id,
          title: team.title,
          votes: await Vote.sum('count', { where: { teamId: team.id } }) || 0
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
        stages: await Promise.all(stages.map(async stage => ({
          id: stage.id,
          title: stage.title,
          votes: await Vote.sum('count', { where: { stageId: stage.id } }) || 0
        }))),
        teams: await Promise.all(teams.map(async team => ({
          id: team.id,
          title: team.title,
          votes: await Vote.sum('count', { where: { teamId: team.id } }) || 0
        })))
      })
    }
  } catch (e) {
    errors.handler(req, res, e)
  }
})

module.exports = router
