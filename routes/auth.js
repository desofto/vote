'use strict'

const path = require('path')

const errors = require(path.resolve('lib/errors'))
const auth = require(path.resolve('lib/auth'))
const { User } = require(path.resolve('models'))

const router = require('express').Router()

router.post('/', async (req, res) => {
  try {
    const user = await User.findOne({ where: { accessCode: req.body.code } })
    if (!user) {
      throw new errors.NoTokenError
    }

    res.status(200).json({
      token: auth.create({ id: user.id }),
      id: user.id,
      full_name: user.fullName,
      is_admin: user.isAdmin
    })
  } catch (e) {
    errors.handler(req, res, e)
  }
})

module.exports = router
