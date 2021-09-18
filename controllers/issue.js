const db = require('../models')
const { Issue } = db
const { MissingError, GeneralError, NotFound } = require('../middlewares/error')

const issueController = {
  add: async (req, res) => {
    const userId = res.locals.id
    const { title, description, beginTime, finishTime } = req.body
    // description allow null value
    if (!title || !beginTime || !finishTime) throw MissingError
    const issue = await Issue.create({
      title,
      description,
      beginTime,
      finishTime,
      UserId: Number(userId)
    })
    if (!issue) throw new GeneralError('新增失敗')
    res.status(200).json({
      ok: 1,
      message: '新增成功',
      issue
    })
  },

  delete: async (req, res) => {
    const userId = res.locals.id
    const { issueId } = req.params
    const deletedResult = await Issue.update(
      {
        isDeleted: 1
      },
      {
        where: {
          UserId: userId,
          id: Number(issueId),
          isDeleted: 0
        }
      }
    )
    if (!deletedResult[0]) throw new GeneralError('刪除失敗，請再試一次')
    res.status(200).json({
      ok: 1,
      message: '刪除成功'
    })
  },

  patch: async (req, res) => {
    const userId = res.locals.id
    const { title, description, beginTime, finishTime } = req.body
    // description allow null value
    if (!title || !beginTime || !finishTime) throw MissingError
    const { issueId } = req.params
    const updatedResult = await Issue.update(
      {
        title,
        description,
        beginTime,
        finishTime
      },
      {
        where: {
          UserId: userId,
          id: Number(issueId),
          isDeleted: 0
        }
      }
    )
    if (!updatedResult[0]) throw new GeneralError('更新失敗，請再試一次')
    res.status(200).json({
      ok: 1,
      message: '更新成功'
    })
  },

  getAll: async (req, res) => {
    const userId = res.locals.id
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
    const { issueId } = req.params
    const issue = await Issue.findOne({
      where: {
        id: Number(issueId),
        isDeleted: 0
      }
    })
    if (!issue) throw new NotFound('找不到這個提問箱')
    res.status(200).json({
      ok: 1,
      issue
    })
  }
}

module.exports = issueController
