'use strict'

const path = require('path')

const errors = require(path.resolve('lib/errors'))
const auth = require(path.resolve('lib/auth'))
const abilities = require(path.resolve('lib/abilities'))
const { permit } = require(path.resolve('lib/params'))
const { User } = require(path.resolve('models'))
const { UserSerializer } = require(path.resolve('serializers'))

const router = require('express').Router()
router.use(auth.authenticate)

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({})
    users.forEach(user => abilities.authorize('read', user, req.currentUser))

    res.status(200).json(
      UserSerializer.serialize(users)
    )
  } catch (e) {
    errors.handler(req, res, e)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    abilities.authorize('read', user, req.currentUser)

    res.status(200).json(
      UserSerializer.serialize(user)
    )
  } catch (e) {
    errors.handler(req, res, e)
  }
})

router.post('/', async (req, res) => {
  try {
    const attributes = permit(req.body, ['full_name', 'access_code', 'is_admin'])
    const user = await User.build({
      fullName: attributes.full_name,
      accessCode: attributes.access_code,
      isAdmin: !!attributes.is_admin
    })
    abilities.authorize('create', user, req.currentUser)
    await user.save()

    res.status(201).json(
      UserSerializer.serialize(user)
    )
  } catch (e) {
    errors.handler(req, res, e)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const user = await User.find(req.params.id)
    abilities.authorize('update', user, req.currentUser)

    const attributes = permit(req.body, ['full_name', 'access_code', 'is_admin'])
    await user.update({
      fullName: attributes.full_name,
      accessCode: attributes.access_code,
      isAdmin: !!attributes.is_admin
    })

    res.status(200).json(
      UserSerializer.serialize(user)
    )
  } catch (e) {
    errors.handler(req, res, e)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (user) {
      abilities.authorize('delete', user, req.currentUser)
      await user.destroy()
    }

    res.status(204).end()
  } catch (e) {
    errors.handler(req, res, e)
  }
})

module.exports = router
