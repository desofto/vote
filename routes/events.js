'use strict'

const path = require('path')

const errors = require(path.resolve('lib/errors'))
const auth = require(path.resolve('lib/auth'))
const abilities = require(path.resolve('lib/abilities'))
const { permit } = require(path.resolve('lib/params'))
const { Event } = require(path.resolve('models'))
const { EventSerializer } = require(path.resolve('serializers'))

const router = require('express').Router()
router.use(auth.authenticate)

router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll({})
    events.forEach(event => abilities.authorize('read', event, req.currentUser))

    res.status(200).json(
      EventSerializer.serialize(events)
    )
  } catch (e) {
    errors.handler(req, res, e)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id)
    abilities.authorize('read', event, req.currentUser)

    res.status(200).json(
      EventSerializer.serialize(event)
    )
  } catch (e) {
    errors.handler(req, res, e)
  }
})

router.post('/', async (req, res) => {
  try {
    const attributes = permit(req.body, ['title', 'date'])
    const event = await Event.build(attributes)
    abilities.authorize('create', event, req.currentUser)
    await event.save()

    res.status(201).json(
      EventSerializer.serialize(event)
    )
  } catch (e) {
    errors.handler(req, res, e)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id)
    abilities.authorize('update', event, req.currentUser)

    const attributes = permit(req.body, ['title', 'date'])
    await event.update(attributes)

    res.status(200).json(
      EventSerializer.serialize(event)
    )
  } catch (e) {
    errors.handler(req, res, e)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id)
    if (event) {
      abilities.authorize('delete', event, req.currentUser)
      await event.destroy()
    }

    res.status(204).end()
  } catch (e) {
    errors.handler(req, res, e)
  }
})

module.exports = router
