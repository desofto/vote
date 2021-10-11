'use strict'

const path = require('path')

const chai = require('chai')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const app = require(path.resolve('index'))

const { User } = require(path.resolve('models'))

const { clearDatabase } = require(path.resolve('test/helper'))

describe('Auth', async () => {
  beforeEach(async () => {
    await clearDatabase()
  })

  describe('POST /auth', async () => {
    it('it returns token', async () => {
      const user = await User.create({ fullName: 'qwe', isAdmin: false })
      const res = await chai.request(app).post('/auth').send({ code: user.accessCode })

      expect(res.status).to.eql(200)
      expect(res.body.token).not.to.eql(null)
    })

    it('it fails on wrong access code', async () => {
      const user = await User.create({ fullName: 'qwe', isAdmin: false })
      const res = await chai.request(app).post('/auth').send({ code: 'qwe' })

      expect(res.status).to.eql(401)
      expect(res.body.token).to.eq(undefined)
    })
  })
})

