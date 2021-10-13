'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'Teams',
      'order'
    );

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Teams',
      'order',
      Sequelize.INTEGER
    )
  }
}
