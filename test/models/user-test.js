'use strict'

const path = require('path')
const { expect } = require('chai')

const { User } = require(path.resolve('models'))

const { clearDatabase } = require(path.resolve('test/helper'))

describe('User', async () => {
  beforeEach(async () => {
    await clearDatabase()
  })

  describe('#accessCode', async () => {
    it('is generated', async() => {
      const user = User.build({ fullName: 'qwe', isAdmin: false })
      await user.save()

      expect(user.id).not.to.eql(null)
      expect(user.accessCode).not.to.eql(null)
    })
  })
})
