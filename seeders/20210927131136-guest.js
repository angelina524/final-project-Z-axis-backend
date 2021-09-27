'use strict'

const guests = [
  {
    guestToken: 'allen',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    guestToken: 'angelina',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    guestToken: 'benben',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    guestToken: 'didi',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Guests', guests, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Guests', null, {})
  }
}
