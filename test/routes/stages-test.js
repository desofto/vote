'use strict'

const path = require('path')

const chai = require('chai')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const app = require(path.resolve('index'))

const { Event, Stage, Team, Vote } = require(path.resolve('models'))

const { clearDatabase, signin } = require(path.resolve('test/helper'))

describe('/stages', async () => {
  beforeEach(async () => {
    await clearDatabase()
  })

  describe('GET /', async () => {
    it('returns stages', async () => {
      const token = await signin(app, true)

      const event = await Event.create({ title: 'qwerty', date: new Date() })
      const stage = await Stage.create({ title: 'qwe', eventId: event.id })
      const res = await chai.request(app).get(`/events/${event.id}/stages`).set('Authorization', `Bearer ${token}`)

      expect(res.status).to.eql(200)
      expect(res.body.data.length).to.eql(1)
      expect(res.body.data[0].attributes.id).to.eql(stage.id)
      expect(res.body.data[0].attributes.title).to.eql('qwe')
    })
  })

  describe('GET /:id', async () => {
    it('returns stage', async () => {
      const token = await signin(app, true)

      const event = await Event.create({ title: 'qwerty', date: new Date() })
      const stage = await Stage.create({ title: 'qwe', eventId: event.id })
      const res = await chai.request(app).get(`/events/${event.id}/stages/${stage.id}`).set('Authorization', `Bearer ${token}`)

      expect(res.status).to.eql(200)
      expect(res.body.data.attributes.title).to.eql('qwe')
    })
  })

  describe('POST /', async () => {
    it('creates stage', async () => {
      expect(await Stage.count()).to.eql(0)

      const token = await signin(app, true)

      const event = await Event.create({ title: 'qwerty', date: new Date() })
      const attribnutes = { title: 'qwe' }
      const res = await chai.request(app).post(`/events/${event.id}/stages`).set('Authorization', `Bearer ${token}`).send(attribnutes)

      expect(res.status).to.eql(201)
      expect(res.body.data.attributes.title).to.eql('qwe')
      expect(await Stage.count()).to.eql(1)
    })
  })

  describe('DELETE /:id', async () => {
    it('destroys stage', async () => {
      const token = await signin(app, true)

      const event = await Event.create({ title: 'qwe', date: new Date() })
      const stage = await Stage.create({ title: 'qwe', eventId: event.id })
      const res = await chai.request(app).delete(`/events/${event.id}/stages/${stage.id}`).set('Authorization', `Bearer ${token}`)

      expect(res.status).to.eql(204)
      expect(await Stage.count()).to.eql(0)
    })
  })

  describe('POST /vote', async () => {
    it('creates vote', async () => {
      expect(await Vote.count()).to.eql(0)

      const token = await signin(app, false)

      const event = await Event.create({ title: 'qwerty', date: new Date() })
      const stage = await Stage.create({ title: 'qwe', eventId: event.id })
      const team = await Team.create({ title: 'qwe', eventId: event.id })

      {
        const res = await chai.request(app).post(`/events/${event.id}/stages/${stage.id}/vote`).set('Authorization', `Bearer ${token}`).send({ team_id: team.id })

        expect(res.status).to.eql(204)
        expect(await Vote.count()).to.eql(1)

        let vote = await Vote.findOne({})
        expect(vote.count).to.eql(1)
      }

      {
        const res = await chai.request(app).post(`/events/${event.id}/stages/${stage.id}/vote`).set('Authorization', `Bearer ${token}`).send({ team_id: team.id })

        expect(res.status).to.eql(204)
        expect(await Vote.count()).to.eql(1)

        let vote = await Vote.findOne({})
        expect(vote.count).to.eql(2)
      }
    })
  })
})
