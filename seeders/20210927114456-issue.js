'use strict'

const issues = [
  {
    title: '祈念之樹留言箱',
    description:
      '你相信像樟樹祈念，願望就能成真嗎？有沒有什麼思念，害怕說出來？有沒有什麼秘密，想要坦白卻無法開口？有沒有什麼歉意懊悔，已經來不及表達？如果這棵樟樹此刻在面前，你會許下什麼願望？',
    beginDate: new Date(new Date().getTime() - 86400 * 1000 * 2),
    finishDate: new Date(new Date().getTime() + 86400 * 1000 * 2),
    UserId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: '來場秘境之旅',
    description:
      '解封後，秋天也悄悄到來囉～在這秋高氣爽的季節，能夠漫步在森林步道秘境中，終於能夠吸取滿滿芬多精，浪漫又紓壓，欣賞令人歎為觀止的景色，享受好久不見的大自然～快來分享私藏口袋秘境名單吧！',
    beginDate: new Date(new Date().getTime() - 86400 * 1000 * 1),
    finishDate: new Date(new Date().getTime() + 86400 * 1000 * 3),
    UserId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: '盛夏解暑聖品',
    description:
      '烈日炎炎的夏日，面對大魚大肉都沒什麼食慾，熱到發燙的日子就需要這些清涼微酸，解解夏天的渴！',
    beginDate: new Date(new Date().getTime()),
    finishDate: new Date(new Date().getTime() + 86400 * 1000 * 4),
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
