'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Issues', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      reference: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })
    await queryInterface.addColumn('Comments', 'issueId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      reference: {
        model: 'Issues',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })
    await queryInterface.addColumn('Comments', 'guestToken', {
      type: Sequelize.STRING,
      allowNull: false,
      reference: {
        model: 'Guests',
        key: 'guestToken'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Issues', 'userId')
    await queryInterface.removeColumn('Comments', 'issueId')
    await queryInterface.removeColumn('Comments', 'guestToken')
  }
}
