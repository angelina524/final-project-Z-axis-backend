const { NotFound } = require('../middlewares/error')
const { Op } = require('sequelize')
const db = require('../models')
const { GuestsCommentsRelation } = db

const relationController = {
  getRelation: async (req, res) => {
    const { id = '', guestToken = '' } = res.locals
    const { commentId } = req.query

    const relation = await GuestsCommentsRelation.findOne({
      where: {
        [Op.or]: [{ userId: id }, { guestToken }],
        commentId: Number(commentId)
      }
    })
    if (!relation) throw new NotFound('找不到 relation')

    res.status(200).json({
      ok: 1,
      relation,
      message: '取得 relation 成功',
      statusCode: 200
    })
  }
}

module.exports = relationController
