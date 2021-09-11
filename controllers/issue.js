const db = require('../models')
const { Issue } = db
const { MissingError, GeneralError, NotFound } = require('../middlewares/error')
const { getUserId } = require('../middlewares/authority')

const issueController = {
  add: async (req, res) => {
    const userId = await getUserId(res)
    const { title, description, beginTime, finishTime } = req.body
    // description allow null value
    if (!title || !beginTime || !finishTime) throw MissingError
    const issue = await Issue.create({
      title,
      description,
      beginTime,
      finishTime,
      userId
    })
    if (!issue) throw new GeneralError('新增失敗')
    res.status(200).json({ ok: 1, message: '新增成功', issue })
  },

  delete: async (req, res) => {
    const userId = await getUserId(res)
    const { id } = req.params
    await Issue.update(
      {
        isDeleted: 1
      },
      {
        where: {
          userId,
          id: Number(id),
          isDeleted: 0
        }
      }
    )
    res.status(200).json({
      ok: 1,
      message: '刪除成功'
    })
  },

  patch: async (req, res) => {
    const userId = await getUserId(res)
    const { title, description, beginTime, finishTime } = req.body
    // description allow null value
    if (!title || !beginTime || !finishTime) throw MissingError
    const { id } = res.params
    const response = await Issue.update(
      {
        title,
        description,
        beginTime,
        finishTime
      },
      {
        where: {
          userId,
          id: Number(id),
          isDeleted: 0
        }
      }
    )
    if (!response) throw new GeneralError('更新失敗')
    res.status(200).json({
      ok: 1,
      message: '更新成功',
      response
    })
  },

  getAll: async (req, res) => {
    const userId = await getUserId(res)
    const issues = await Issue.findAll({
      where: {
        userId,
        isDeleted: 0
      }
    })
    if (!issues) throw new NotFound('您還沒有提問箱喔')
    res.status(200).json({
      ok: 1,
      issues
    })
  },

  getOne: async (req, res) => {
    const userId = await getUserId(res)
    const { id } = req.params
    const issue = await Issue.findOne({
      where: {
        id: Number(id),
        userId,
        isDeleted: 0
      }
    })
    if (!issue) throw new NotFound('找不到這個提問箱')
    res.status(200).json({ ok: 1, issue })
  }
}

module.exports = issueController
