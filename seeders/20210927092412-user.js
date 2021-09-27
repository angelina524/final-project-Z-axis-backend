'use strict'

const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

const { emailToJwtToken } = require('../middlewares/authority')

const result = dotenv.config()
if (result.error) {
  throw result.error
}

const admins = [
  {
    nickname: 'allen',
    email: 'allen@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nickname: 'angelina',
    email: 'angelina@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nickname: 'benben',
    email: 'benben@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nickname: 'didi',
    email: 'didi@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (const admin of admins) {
      admin.password = await bcrypt.hash(
        process.env[`${admin.nickname}Password`],
        Number(process.env.SALTROUNDS)
      )
      admin.userToken = await emailToJwtToken(admin.email)
    }

    await queryInterface.bulkInsert('Users', admins, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
