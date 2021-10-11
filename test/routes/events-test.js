'use strict'

const path = require('path')

const chai = require('chai')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const app = require(path.resolve('index'))

const { Event } = require(path.resolve('models'))

const { clearDatabase, signin } = require(path.resolve('test/helper'))

describe('Events', async () => {
  beforeEach(async () => {
    await clearDatabase()
  })

  describe('GET /', async () => {
    it('returns events', async () => {
      const token = await signin(app, true)

      const event = await Event.create({ title: 'qwe', date: new Date() })
      const res = await chai.request(app).get('/events').set('Authorization', `Bearer ${token}`)

      expect(res.status).to.eql(200)
      expect(res.body.data.length).to.eql(1)
      expect(res.body.data[0].attributes.title).to.eql('qwe')
    })
  })

  describe('GET /:id', async () => {
    it('returns event', async () => {
      const token = await signin(app, true)

      const event = await Event.create({ title: 'qwe', date: new Date() })
      const res = await chai.request(app).get(`/events/${event.id}`).set('Authorization', `Bearer ${token}`)

      expect(res.status).to.eql(200)
      expect(res.body.data.attributes.title).to.eql('qwe')
    })
  })

  describe('POST /', async () => {
    it('creates event', async () => {
      expect(await Event.count()).to.eql(0)

      const token = await signin(app, true)

      const attribnutes = { title: 'qwe', date: new Date() }
      const res = await chai.request(app).post('/events').set('Authorization', `Bearer ${token}`).send(attribnutes)

      expect(res.status).to.eql(201)
      expect(res.body.data.attributes.title).to.eql('qwe')
      expect(await Event.count()).to.eql(1)
    })
  })

  describe('DELETE /:id', async () => {
    it('destroys event', async () => {
      const token = await signin(app, true)

      const event = await Event.create({ title: 'qwe', date: new Date() })
      const res = await chai.request(app).delete(`/events/${event.id}`).set('Authorization', `Bearer ${token}`)

      expect(res.status).to.eql(204)
      expect(await Event.count()).to.eql(0)
    })
  })
})

