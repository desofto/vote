const path = require('path')
const chai = require('chai')

const { User, Event, Stage, Team, Vote } = require(path.resolve('models'))

async function clearDatabase() {
  await User.destroy({ where: {} })
  await Event.destroy({ where: {} })
  await Stage.destroy({ where: {} })
  await Team.destroy({ where: {} })
  await Vote.destroy({ where: {} })
}

async function signin(app, isAdmin) {
  const user = await User.create({ fullName: 'admin', isAdmin })
  const { body: { token } } = await await chai.request(app).post('/auth').send({ code: user.accessCode })
  return token
}

module.exports = {
  clearDatabase,
  signin
}
