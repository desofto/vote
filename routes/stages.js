'use strict'

const path = require('path')

const errors = require(path.resolve('lib/errors'))
const auth = require(path.resolve('lib/auth'))
const abilities = require(path.resolve('lib/abilities'))
const { permit } = require(path.resolve('lib/params'))
const { Event, Stage, Team, Vote } = require(path.resolve('models'))
const { StageSerializer } = require(path.resolve('serializers'))

const router = require('express').Router({ mergeParams: true })

router.get('/', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.event_id, { include: ['stages'] })
    abilities.authorize('read', event, req.currentUser)
    const stages = event.stages
    stages.forEach(stage => abilities.authorize('read', stage, req.currentUser))

    res.status(200).json(
      StageSerializer.serialize(stages)
    )
  } catch (e) {
    errors.handler(req, res, e)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.event_id, { include: ['stages'] })
    abilities.authorize('read', event, req.currentUser)
    const stage = (await event.getStages({ where: { id: req.params.id }}))[0]
    abilities.authorize('read', stage, req.currentUser)

    res.status(200).json(
      StageSerializer.serialize(stage)
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
    const stage = await Stage.build({ ...attributes, eventId: event.id })
    abilities.authorize('create', stage, req.currentUser)
    await stage.save()

    res.status(201).json(
      StageSerializer.serialize(stage)
    )
  } catch (e) {
    errors.handler(req, res, e)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.event_id)
    abilities.authorize('read', event, req.currentUser)
    const stage = (await event.getStages({ where: { id: req.params.id }}))[0]
    abilities.authorize('update', stage, req.currentUser)

    const attributes = permit(req.body, ['title', 'state'])
    /*
    if (attributes.state === 'started') {
      const stages = await event.getStages()
      await stages.forEach(async stage => {
        if (stage.state === 'started') {
          await stage.update({ state: 'finished'})
        }
      })
    }
    */
    await stage.update(attributes)

    res.status(200).json(
      StageSerializer.serialize(stage)
    )
  } catch (e) {
    errors.handler(req, res, e)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.event_id)
    abilities.authorize('read', event, req.currentUser)
    const stage = (await event.getStages({ where: { id: req.params.id }}))[0]
    abilities.authorize('delete', stage, req.currentUser)

    await stage.destroy()

    res.status(204).end()
  } catch (e) {
    errors.handler(req, res, e)
  }
})

router.post('/:id/vote', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.event_id)
    const stage = await Stage.findOne({ where: { id: req.params.id, eventId: event.id }})
    const team = await Team.findOne({ where: { id: req.body.team_id, eventId: event.id }})

    let vote = await Vote.findOne({ where: { stageId: stage.id, teamId: team.id, userId: req.currentUser.id }})
    if (!vote) {
      vote = await Vote.build({ stageId: stage.id, teamId: team.id, userId: req.currentUser.id, count: 0 })
    }
    vote.count++

    abilities.authorize('create', vote, req.currentUser)
    await vote.save()

    res.status(204).end()
  } catch (e) {
    errors.handler(req, res, e)
  }
})

module.exports = router
