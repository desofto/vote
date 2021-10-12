'use strict'

const path = require('path')

const chai = require('chai')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const app = require(path.resolve('index'))

const { User } = require(path.resolve('models'))

const { clearDatabase, signin } = require(path.resolve('test/helper'))

describe('/users', async () => {
  beforeEach(async () => {
    await clearDatabase()
  })

  describe('GET /', async () => {
    it('fails without authentication', async () => {
      const res = await chai.request(app).get('/users')

      expect(res.status).to.eql(401)
    })

    it('fails for regular use', async () => {
      const token = await signin(app, false)

      await User.create({ fullName: 'rty', isAdmin: true })
      const res = await chai.request(app).get('/users').set('Authorization', `Bearer ${token}`)

      expect(res.status).to.eql(401)
    })

    it('it returns all users', async () => {
      const token = await signin(app, true)

      await User.create({ fullName: 'rty', isAdmin: true })
      const res = await chai.request(app).get('/users').set('Authorization', `Bearer ${token}`)

      expect(res.status).to.eql(200)
      expect(res.body.data.length).to.eql(2)
    })
  })

  describe('GET /:id', async () => {
    it('returns user', async () => {
      const token = await signin(app, true)

      const user = await User.create({ fullName: 'qwerty', isAdmin: false })
      const res = await chai.request(app).get(`/users/${user.id}`).set('Authorization', `Bearer ${token}`)

      expect(res.status).to.eql(200)
      expect(res.body.data.attributes.full_name).to.eql('qwerty')
    })
  })

  describe('POST /', async () => {
    it('creates user', async () => {
      expect(await User.count()).to.eql(0)

      const token = await signin(app, true)

      const attribnutes = { full_name: 'qwerty', is_admin: false }
      const res = await chai.request(app).post('/users').set('Authorization', `Bearer ${token}`).send(attribnutes)

      expect(res.status).to.eql(201)
      expect(res.body.data.attributes.full_name).to.eql('qwerty')
      expect(await User.count()).to.eql(2)
    })
  })

  describe('DELETE /:id', async () => {
    it('destroys user', async () => {
      const token = await signin(app, true)

      const user = await User.create({ fullName: 'qwerty', isAdmin: false })
      expect(await User.count()).to.eql(2)
      const res = await chai.request(app).delete(`/users/${user.id}`).set('Authorization', `Bearer ${token}`)

      expect(res.status).to.eql(204)
      expect(await User.count()).to.eql(1)
    })
  })
})

