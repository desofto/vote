'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Teams', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        unique: true
      },
      eventId: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'Events',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      order: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'initial'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    await queryInterface.addColumn('Votes', 'teamId', {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: 'Teams',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Votes', 'teamId')
    await queryInterface.dropTable('Team')
  }
}
