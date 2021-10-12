'use strict'

const { User } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await User.create({ fullName: 'Main Admin' })
    console.log('Access code:', user.accessCode)
  },

  down: async (queryInterface, Sequelize) => {
    const user = await User.findOne({ where: { fullName: 'Main Admin' } })
    await user.destroy()
  }
};
