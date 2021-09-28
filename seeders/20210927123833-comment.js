'use strict'

const comments = [
  {
    nickname: 'Anonymous',
    content: '今天天氣好熱喔',
    likesNum: 20,
    reply: null,
    replyCreateAt: null,
    issueId: 1,
    guestToken: 'allen',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nickname: '番薯',
    content: '今天天氣好熱喔',
    likesNum: 20,
    reply: null,
    replyCreateAt: null,
    issueId: 1,
    guestToken: 'angelina',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nickname: 'Anonymous',
    content: `今天天氣好熱喔今天天氣好熱喔今天天氣好熱喔今天天氣好熱喔今
    喔今天天氣好熱喔今天天氣好熱喔今天天氣好熱喔今天天氣好熱喔
    熱喔今天天氣好熱喔`,
    likesNum: 0,
    reply: null,
    replyCreateAt: null,
    issueId: 1,
    guestToken: 'benben',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nickname: '番薯',
    content: `今天天氣好熱喔今天天氣好熱喔今天天氣好熱喔今天天氣好熱喔今
    喔今天天氣好熱喔今天天氣好熱喔今天天氣好熱喔今天天氣好熱喔
    熱喔今天天氣好熱喔`,
    likesNum: 100,
    reply: '在家吹冷氣阿',
    replyCreateAt: new Date(),
    issueId: 3,
    guestToken: 'didi',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', comments, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {})
  }
}
