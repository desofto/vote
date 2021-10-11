'use strict'

process.env.NODE_ENV = 'test'

const path = require('path')

const chai = require('chai')
const { expect } = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const app = require(path.resolve('index'))

const { User } = require(path.resolve('models'))

describe('Users', async () => {
  beforeEach(async () => {
    await User.destroy({
      where: {},
      truncate: true
    })
  })

  describe('GET /', async () => {
    it('fails without authentication', async () => {
      const res = await chai.request(app).get('/users')

      expect(res.status).to.eql(401)
    })

    it('fails for regular use', async () => {
      await User.create({ fullName: 'rty', isAdmin: true })

      const user = await User.create({ fullName: 'qwe', isAdmin: false })
      const { body: { token } } = await await chai.request(app).post('/auth').send({ code: user.accessCode })

      const res = await chai.request(app).get('/users').set('Authorization', `Bearer ${token}`)

      expect(res.status).to.eql(401)
    })

    it('it returns all users', async () => {
      await User.create({ fullName: 'rty', isAdmin: true })

      const user = await User.create({ fullName: 'qwe', isAdmin: true })
      const { body: { token } } = await await chai.request(app).post('/auth').send({ code: user.accessCode })

      const res = await chai.request(app).get('/users').set('Authorization', `Bearer ${token}`)

      expect(res.status).to.eql(200)
    })
  })
})

