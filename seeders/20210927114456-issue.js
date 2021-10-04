'use strict'

const issues = [
  {
    title: '你所不知道的 hooks',
    description:
      '這是一個呱呱呱呱跟啦啦啦簡介，沒什麼內容，顆顆顆顆，這是一個呱呱’呱呱跟啦啦的簡介，沒什麼內容，顆顆顆顆，這是一個呱呱呱呱啦啦啦的簡介，沒什麼內容顆顆顆顆顆，這是一個呱呱呱跟啦啦啦的簡介，沒什麼容，顆顆',
    beginDate: new Date(),
    finishDate: new Date(),
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: '你所不知道的 hooks',
    description:
      '這是一個呱呱呱呱跟啦啦啦簡介，沒什麼內容，顆顆顆顆，這是一個呱呱’呱呱跟啦啦的簡介，沒什麼內容，顆顆顆顆，這是一個呱呱呱呱啦啦啦的簡介，沒什麼內容顆顆顆顆顆，這是一個呱呱呱跟啦啦啦的簡介，沒什麼容，顆顆',
    beginDate: new Date(),
    finishDate: new Date(),
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: '你所不知道的 hooks',
    description:
      '這是一個呱呱呱呱跟啦啦啦簡介，沒什麼內容，顆顆顆顆，這是一個呱呱’呱呱跟啦啦的簡介，沒什麼內容，顆顆顆顆，這是一個呱呱呱呱啦啦啦的簡介，沒什麼內容顆顆顆顆顆，這是一個呱呱呱跟啦啦啦的簡介，沒什麼容，顆顆',
    beginDate: new Date(),
    finishDate: new Date(),
    UserId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: '你所不知道的 hooks',
    description:
      '這是一個呱呱呱呱跟啦啦啦簡介，沒什麼內容，顆顆顆顆，這是一個呱呱’呱呱跟啦啦的簡介，沒什麼內容，顆顆顆顆，這是一個呱呱呱呱啦啦啦的簡介，沒什麼內容顆顆顆顆顆，這是一個呱呱呱跟啦啦啦的簡介，沒什麼容，顆顆',
    beginDate: new Date(),
    finishDate: new Date(),
    UserId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Issues', issues, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Issues', null, {})
  }
}
