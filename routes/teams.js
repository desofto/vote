'use strict'

const path = require('path')

const errors = require(path.resolve('lib/errors'))
const auth = require(path.resolve('lib/auth'))
const abilities = require(path.resolve('lib/abilities'))
const { permit } = require(path.resolve('lib/params'))
const { Event, Stage, Team, Vote } = require(path.resolve('models'))
const { TeamSerializer } = require(path.resolve('serializers'))

const router = require('express').Router({ mergeParams: true })

router.get('/', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.event_id, { include: ['teams'] })
    abilities.authorize('read', event, req.currentUser)
    const teams = event.teams
    teams.forEach(team => abilities.authorize('read', team, req.currentUser))

    res.status(200).json(
      TeamSerializer.serialize(teams)
    )
  } catch (e) {
    errors.handler(req, res, e)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.event_id, { include: ['teams'] })
    abilities.authorize('read', event, req.currentUser)
    const team = await Team.findOne({ where: { id: req.params.id, eventId: event.id }})
    abilities.authorize('read', team, req.currentUser)

    res.status(200).json(
      TeamSerializer.serialize(team)
    )
  } catch (e) {
    errors.handler(req, res, e)
  }
})

router.post('/', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.event_id)
    abilities.authorize('read', event, req.currentUser)

    const attributes = permit(req.body, ['title'])
    const team = await Team.build(attributes)
    team.eventId = event.id
    abilities.authorize('create', team, req.currentUser)
    await team.save()

    res.status(201).json(
      TeamSerializer.serialize(team)
    )
  } catch (e) {
    errors.handler(req, res, e)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.event_id)
    abilities.authorize('read', event, req.currentUser)
    const team = await Team.findOne({ where: { id: req.params.id, eventId: event.id }})
    abilities.authorize('update', team, req.currentUser)

    const attributes = permit(req.body, ['title'])
    await team.update(attributes)

    res.status(200).json(
      TeamSerializer.serialize(team)
    )
  } catch (e) {
    errors.handler(req, res, e)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.event_id)
    abilities.authorize('read', event, req.currentUser)
    const team = await Team.findOne({ where: { id: req.params.id, eventId: event.id }})
    abilities.authorize('delete', team, req.currentUser)

    await team.destroy()

    res.status(204).end()
  } catch (e) {
    errors.handler(req, res, e)
  }
})

module.exports = router
