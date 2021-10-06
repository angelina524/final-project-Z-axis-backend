'use strict'

const comments = [
  {
    nickname: '思念之人',
    content:
      '思念親像漂流的船隻，感情親像風中的樹影，寂寞陪孤單逗陣來戲弄，笑我找無愛的人',
    likesNum: 3,
    reply: null,
    replyCreateAt: null,
    issueId: 1,
    guestToken: 'allen',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nickname: 'Anonymous',
    content:
      '如果時光倒流回到從前，你是否聽見我的許願，心和心的距離，其實並不遙遠，等待的那個人，總有一天會出現',
    likesNum: 5,
    reply: null,
    replyCreateAt: null,
    issueId: 1,
    guestToken: 'angelina',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nickname: '秘境遊俠',
    content: '清水斷崖，可以體驗立槳 SUP，享受徜徉在太平洋上的壯闊景色',
    likesNum: 10,
    reply: '上個月剛好有去玩，立槳超好玩，教練很會拍照',
    replyCreateAt: new Date(),
    issueId: 2,
    guestToken: 'didi',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nickname: '夢幻旅人',
    content: '夢幻仙境～翡翠谷，穿過古隧道後，有超美的水簾瀑布，適合拍照打卡',
    likesNum: 10,
    reply: null,
    replyCreateAt: null,
    issueId: 2,
    guestToken: 'angelina',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nickname: '時常爆汗的大俠',
    content: '可以促進血液循環、增加代謝的麥茶～',
    likesNum: 10,
    reply: null,
    replyCreateAt: null,
    issueId: 3,
    guestToken: 'benben',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    nickname: 'Anonymous',
    content: '因為我不喜歡喝水，所以我都喝檸檬水，補充維他命，放些冰塊就超讚！',
    likesNum: 10,
    reply: null,
    replyCreateAt: null,
    issueId: 3,
    guestToken: 'allen',
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
